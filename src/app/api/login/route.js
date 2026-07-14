import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { db } from '@/db'; 
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    if (user.isActive === false) {
      return NextResponse.json(
        { error: 'Your account has been deactivated. Please contact your administrator.' },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const fullName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user.firstName || user.lastName || user.email;

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role || 'admin',
        companyId: user.companyId || null,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      { 
        message: 'Login successful!',
        token: token,
        user: { 
          id: user.id, 
          email: user.email,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          name: fullName,
          role: user.role || 'admin',
          companyId: user.companyId || null,
          isActive: user.isActive, 
        }
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}