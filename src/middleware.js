import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = ['/', '/api/login', '/api/register'];
  const isPublicPath = publicPaths.some(p => path === p || path.startsWith(p));
  
  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    if (path === '/') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role;

    if (userRole === 'superadmin') {
      return NextResponse.next();
    }

    if (userRole === 'admin') {
      const superAdminRoutes = ['/api/admin', '/dashboard/admin-management'];
      if (superAdminRoutes.some(route => path.startsWith(route))) {
        return NextResponse.json(
          { error: 'Access denied. Super admin only.' },
          { status: 403 }
        );
      }
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', request.url));

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|public|uploads).*)',
  ],
};