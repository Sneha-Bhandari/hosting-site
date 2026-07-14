import { NextResponse } from 'next/server';
import { db } from '@/db';
import { companies } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request, { params }) {
  try {
    const { id: companyId } = params;

    const company = await db
      .select()
      .from(companies)
      .where(eq(companies.id, companyId));

    if (!company || company.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        countries: company[0].grantedCountries || [],
        universities: company[0].grantedUniversities || [],
        studyAreas: company[0].grantedStudyAreas || [],
      }
    });

  } catch (error) {
    console.error('Error fetching access grants:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch access grants' },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id: companyId } = params;
    const body = await request.json();
    const { countries, universities, studyAreas } = body;

    const company = await db
      .select()
      .from(companies)
      .where(eq(companies.id, companyId));

    if (!company || company.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Access granted successfully',
      data: {
        countries: countries || [],
        universities: universities || [],
        studyAreas: studyAreas || [],
      }
    });

  } catch (error) {
    console.error('Error granting access:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to grant access' },
      { status: 500 }
    );
  }
}