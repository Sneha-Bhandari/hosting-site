import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { db } from "@/db";
import { files } from "@/db/schema";
import { eq } from "drizzle-orm";

const uploadDir = path.join(process.cwd(), "public/uploads");

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No file uploaded"
                },
                { status: 400 }
            );
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid file type. Only JPG, JPEG, PNG, and PDF are allowed."
                },
                { status: 400 }
            );
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                {
                    success: false,
                    message: "File size must be less than 5MB"
                },
                { status: 400 }
            );
        }

        await fs.mkdir(uploadDir, { recursive: true });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileId = uuid();
        const fileExtension = path.extname(file.name);
        const storedName = `${fileId}${fileExtension}`;

        await fs.writeFile(
            path.join(uploadDir, storedName),
            buffer
        );

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

        await db.insert(files).values({
            id: fileId, // This is the clean UUID
            fileName: file.name,
            fileUrl: `${baseUrl}/uploads/${storedName}`,
            fileType: file.type,
            mimeType: file.type,
            createdAt: new Date(),
        });

        return NextResponse.json(
            {
                success: true,
                message: "File uploaded successfully",
                data: {
                    id: fileId, 
                    name: file.name,
                    url: `${baseUrl}/uploads/${storedName}`,
                    size: file.size,
                    type: file.type
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to upload file"
            },
            { status: 500 }
        );
    }
}

// GET files
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

        if (id) {
            const file = await db
                .select()
                .from(files)
                .where(eq(files.id, id))
                .limit(1);

            if (!file || file.length === 0) {
                return NextResponse.json(
                    { success: false, message: "File not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                success: true,
                data: file[0]
            });
        }

        const allFiles = await db.select().from(files);

        return NextResponse.json({
            success: true,
            data: allFiles
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, message: "File id required" },
                { status: 400 }
            );
        }

        const file = await db
            .select()
            .from(files)
            .where(eq(files.id, id))
            .limit(1);

        if (!file || file.length === 0) {
            return NextResponse.json(
                { success: false, message: "File not found" },
                { status: 404 }
            );
        }

        const filePath = path.join(uploadDir, path.basename(file[0].fileUrl));
        await fs.unlink(filePath).catch(() => {});

        await db.delete(files).where(eq(files.id, id));

        return NextResponse.json({
            success: true,
            message: "File deleted successfully"
        });

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to delete file"
            },
            { status: 500 }
        );
    }
}