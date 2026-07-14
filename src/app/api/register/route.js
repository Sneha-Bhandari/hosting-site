import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { db } from '@/db';
import { users, companies } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { sendAdminCredentialsEmail } from '@/lib/email';

export async function GET() {
  try {
    const superAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'superadmin'))
      .limit(1);

    return NextResponse.json({
      exists: superAdmin.length > 0,
      email: superAdmin.length > 0 ? superAdmin[0].email : null
    });

  } catch (error) {
    console.error('Error checking super admin:', error);
    return NextResponse.json(
      { error: 'Failed to check super admin status' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, role = 'admin', companyId, firstName, lastName } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (role === 'superadmin') {
      return NextResponse.json(
        { error: 'Cannot create super admin via registration. Use seed script.' },
        { status: 403 }
      );
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists.' },
        { status: 400 }
      );
    }

    if (role === 'admin' && !companyId) {
      return NextResponse.json(
        { error: 'Admin users must be associated with a company.' },
        { status: 400 }
      );
    }

    let companyName = '';
    if (companyId) {
      const company = await db
        .select()
        .from(companies)
        .where(eq(companies.id, companyId))
        .limit(1);
      if (company && company.length > 0) {
        companyName = company[0].name;
      }
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: uuid(),
      email: email.toLowerCase().trim(),
      password: passwordHash,
      role: role || 'admin',
      companyId: companyId || null,
      firstName: firstName || null,
      lastName: lastName || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(users).values(newUser);

    let emailSent = false;
    if (role === 'admin') {
      try {
        const emailResult = await sendAdminCredentialsEmail(
          email,
          firstName || 'Admin',
          lastName || '',
          password,
          companyName || 'Company'
        );
        emailSent = emailResult.success;
        if (!emailSent) {
          console.error('Email sending failed:', emailResult.error);
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { 
        message: 'User registered successfully!', 
        user: userWithoutPassword,
        emailSent: emailSent
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'A user with this email already exists.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}