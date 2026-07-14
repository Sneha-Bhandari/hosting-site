import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, companies } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request) {
  try {
    const userId = request.headers.get('x-user-id');
    
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user || user.length === 0 || user[0].role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const admins = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        companyId: users.companyId,
        isActive: users.isActive,
        createdAt: users.createdAt,
        companyName: companies.name,
      })
      .from(users)
      .leftJoin(companies, eq(users.companyId, companies.id))
      .where(eq(users.role, 'admin'))
      .orderBy(users.createdAt);

    return NextResponse.json({
      success: true,
      data: admins,
    });

  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { adminId, isActive } = body;
    const userId = request.headers.get('x-user-id');

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user || user.length === 0 || user[0].role !== 'superadmin') {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const admin = await db
      .select()
      .from(users)
      .where(and(eq(users.id, adminId), eq(users.role, 'admin')))
      .limit(1);

    if (!admin || admin.length === 0) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    await db.update(users)
      .set({ 
        isActive: isActive,
        updatedAt: new Date()
      })
      .where(eq(users.id, adminId));

    return NextResponse.json({
      success: true,
      message: isActive ? "Admin activated successfully" : "Admin deactivated successfully",
      data: {
        id: adminId,
        isActive: isActive,
      }
    });

  } catch (error) {
    console.error('Error updating admin status:', error);
    return NextResponse.json(
      { success: false, message: "Failed to update admin status" },
      { status: 500 }
    );
  }
}