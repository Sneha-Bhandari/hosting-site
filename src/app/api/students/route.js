import { NextResponse } from "next/server";
import { db } from "@/db";
import { students, files, users } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { sendStudentCreatedEmail, sendStudentUpdatedEmail, sendStudentDeletedEmail } from "@/lib/studentEmail";

const getUserInfo = async (userId) => {
    try {
        if (!userId || userId === 'system') {
            return null;
        }
        
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);
        
        if (user && user.length > 0) {
            return user[0];
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};

const getStudentById = async (id) => {
    const result = await db
        .select()
        .from(students)
        .where(eq(students.id, id));
    return result[0];
};

const detectChanges = (oldData, newData) => {
    const changes = [];
    const excludeFields = ['id', 'createdAt', 'updatedAt', 'passportFileId', 'educationalFileId', 'otherFileId', 'createdBy', 'companyId'];
    
    for (const key in newData) {
        if (excludeFields.includes(key)) continue;
        if (oldData[key] !== newData[key]) {
            changes.push({
                field: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
                oldValue: oldData[key] || '',
                newValue: newData[key] || ''
            });
        }
    }
    return changes;
};

export async function GET(request) {
    try {
        const userId = request.headers.get('x-user-id') || 'system';
        const user = await getUserInfo(userId);
        
        let query = db.select().from(students);
        let conditions = [];

        if (user) {
            if (user.role === 'superadmin') {
            } else if (user.role === 'admin' && user.companyId) {
                conditions.push(eq(students.companyId, user.companyId));
            } else {
                conditions.push(eq(students.createdBy, userId));
            }
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }

        query = query.orderBy(desc(students.createdAt));

        const data = await query;
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.json(
            {
                message: "Failed to fetch students",
                error: error.message
            },
            {
                status: 500
            }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const adminId = request.headers.get('x-user-id') || 'system';
        
        // Get user info
        const user = await getUserInfo(adminId);
        console.log('user found:', user ? { id: user.id, role: user.role, companyId: user.companyId } : 'null');
        
        // Validate file IDs
        if (body.passportFileId) {
            const fileExists = await db
                .select()
                .from(files)
                .where(eq(files.id, body.passportFileId));
            
            if (!fileExists || fileExists.length === 0) {
                return NextResponse.json(
                    { 
                        success: false, 
                        message: `Passport file with ID ${body.passportFileId} not found` 
                    },
                    { status: 400 }
                );
            }
        }

        if (body.educationalFileId) {
            const fileExists = await db
                .select()
                .from(files)
                .where(eq(files.id, body.educationalFileId));
            
            if (!fileExists || fileExists.length === 0) {
                return NextResponse.json(
                    { 
                        success: false, 
                        message: `Educational file with ID ${body.educationalFileId} not found` 
                    },
                    { status: 400 }
                );
            }
        }

        if (body.otherFileId) {
            const fileExists = await db
                .select()
                .from(files)
                .where(eq(files.id, body.otherFileId));
            
            if (!fileExists || fileExists.length === 0) {
                return NextResponse.json(
                    { 
                        success: false, 
                        message: `Other file with ID ${body.otherFileId} not found` 
                    },
                    { status: 400 }
                );
            }
        }

        let companyId = null;
        
        if (user) {
            if (user.role === 'superadmin') {
                if (body.companyId && body.companyId.trim() !== '' && body.companyId !== 'null') {
                    companyId = body.companyId;
                } else {
                    companyId = null;
                }
            } else if (user.role === 'admin' && user.companyId) {
                companyId = user.companyId;
            }
        } else {
            console.warn('User not found for adminId:', adminId);
            
            const userEmail = request.headers.get('x-user-email');
            if (userEmail) {
                const userByEmail = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, userEmail))
                    .limit(1);
                if (userByEmail && userByEmail.length > 0) {
                    const foundUser = userByEmail[0];
                    if (foundUser.role === 'superadmin') {
                        companyId = null;
                    } else if (foundUser.role === 'admin' && foundUser.companyId) {
                        companyId = foundUser.companyId;
                    }
                }
            }
        }

        // ✅ Ensure companyId is null
        if (companyId === '' || companyId === undefined || companyId === null || companyId === 'null') {
            companyId = null;
        }

        console.log('Final companyId before insert:', companyId, 'Type:', typeof companyId);

        // ✅ Check for duplicate email BEFORE inserting
        const existingStudent = await db
            .select()
            .from(students)
            .where(eq(students.email, body.email))
            .limit(1);

        if (existingStudent && existingStudent.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `A student with email '${body.email}' already exists.`
                },
                { status: 409 }
            );
        }

        const newStudent = {
            id: uuid(),
            name: body.name,
            surname: body.surname,
            email: body.email,
            course: body.course,
            nationality: body.nationality,
            academicYear: body.academicYear,
            phone: body.phone,
            mobile: body.mobile,
            country: body.country,
            countryOfResidence: body.countryOfResidence,
            fullAddress: body.fullAddress,
            dateOfBirth: body.dateOfBirth,
            gender: body.gender,
            maritalStatus: body.maritalStatus,
            passportNumber: body.passportNumber,
            issuePlace: body.issuePlace,
            issueCountry: body.issueCountry,
            issueDate: body.issueDate,
            expiryDate: body.expiryDate,
            contactName: body.contactName,
            contactAddress: body.contactAddress,
            contactPhone: body.contactPhone,
            contactEmail: body.contactEmail,
            relationship: body.relationship,
            agencyName: body.agencyName,
            agencyEmail: body.agencyEmail,
            acceptPrivacy: body.acceptPrivacy,
            passportFileId: body.passportFileId || null,
            educationalFileId: body.educationalFileId || null,
            otherFileId: body.otherFileId || null,
            createdBy: adminId,
            companyId: companyId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        console.log('Creating student with companyId:', companyId);

        // ✅ Insert the student
        await db.insert(students).values(newStudent);

        // ✅ Try to send email but don't let it fail
        try {
            const emailResult = await sendStudentCreatedEmail(newStudent, adminId);
            console.log('Email sending result:', emailResult);
        } catch (emailError) {
            console.error('Failed to send creation email (non-critical):', emailError);
        }

        return NextResponse.json(
            {
                success: true,
                message: "Student created successfully",
                student: newStudent
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error creating student:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to create student"
            },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const adminId = request.headers.get('x-user-id') || 'system';

        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Student ID is required" },
                { status: 400 }
            );
        }

        const oldStudent = await getStudentById(id);

        if (!oldStudent) {
            return NextResponse.json(
                { success: false, message: "Student not found" },
                { status: 404 }
            );
        }

        const user = await getUserInfo(adminId);
        if (user && user.role !== 'superadmin' && oldStudent.createdBy !== adminId) {
            return NextResponse.json(
                { success: false, message: "You don't have permission to update this student" },
                { status: 403 }
            );
        }

        const updatePayload = { ...updateData };
        if (updatePayload.passportFileId === undefined || updatePayload.passportFileId === null) {
            delete updatePayload.passportFileId;
        }
        if (updatePayload.educationalFileId === undefined || updatePayload.educationalFileId === null) {
            delete updatePayload.educationalFileId;
        }
        if (updatePayload.otherFileId === undefined || updatePayload.otherFileId === null) {
            delete updatePayload.otherFileId;
        }

        updatePayload.updatedAt = new Date();

        await db.update(students)
            .set(updatePayload)
            .where(eq(students.id, id));

        const updatedStudent = await getStudentById(id);

        const changes = detectChanges(oldStudent, updatedStudent);

        if (changes.length > 0) {
            try {
                await sendStudentUpdatedEmail(updatedStudent, oldStudent, changes, adminId);
            } catch (emailError) {
                console.error('Failed to send update email:', emailError);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Student updated successfully",
            student: updatedStudent,
            changes: changes
        });

    } catch (error) {
        console.error('Error updating student:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to update student"
            },
            {
                status: 500
            }
        );
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const adminId = request.headers.get('x-user-id') || 'system';

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Student ID is required"
                },
                { status: 400 }
            );
        }

        const student = await getStudentById(id);

        if (!student) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Student not found"
                },
                { status: 404 }
            );
        }

        const user = await getUserInfo(adminId);
        if (user && user.role !== 'superadmin' && student.createdBy !== adminId) {
            return NextResponse.json(
                { success: false, message: "You don't have permission to delete this student" },
                { status: 403 }
            );
        }

        await db.delete(students)
            .where(eq(students.id, id));

        try {
            await sendStudentDeletedEmail(student, adminId);
        } catch (emailError) {
            console.error('Failed to send deletion email:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        console.error('Error deleting student:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to delete student"
            },
            {
                status: 500
            }
        );
    }
}