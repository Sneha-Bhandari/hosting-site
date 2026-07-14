import { db } from '@/db';
import { companies, users } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const getAdmins = searchParams.get("getAdmins");

    if (id && getAdmins === 'true') {
      const admins = await db
        .select({
          id: users.id,
          email: users.email,
          role: users.role,
          firstName: users.firstName,
          lastName: users.lastName,
          companyId: users.companyId,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(
          and(
            eq(users.companyId, id),
            eq(users.role, 'admin')
          )
        );

      return Response.json({
        success: true,
        data: admins,
      });
    }

    if (id) {
      const company = await db
        .select()
        .from(companies)
        .where(eq(companies.id, id));

      if (!company || company.length === 0) {
        return Response.json(
          {
            success: false,
            message: "Company not found",
          },
          {
            status: 404,
          }
        );
      }

      return Response.json({
        success: true,
        data: company[0],
      });
    }

    const allCompanies = await db
      .select()
      .from(companies)
      .orderBy(desc(companies.createdAt));

    return Response.json({
      success: true,
      data: allCompanies,
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const existingCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.email, body.email.toLowerCase().trim()));

    if (existingCompany && existingCompany.length > 0) {
      return Response.json(
        {
          success: false,
          message: "Company with this email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const companyData = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email.toLowerCase().trim(),
      contactNumber: body.contactNumber,
      financialContact: body.financialContact || null,
      address1: body.address1,
      address2: body.address2 || null,
      city: body.city,
      country: body.country,
      state: body.state,
      zipCode: body.zipCode,
      website: body.website || null,
      regionalIncharge: body.regionalIncharge || null,
      status: body.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(companies).values(companyData);

    const createdCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.id, companyData.id));

    return Response.json({
      success: true,
      message: "Company created successfully",
      data: createdCompany[0],
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Company ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const existingCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id));

    if (!existingCompany || existingCompany.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    if (body.email) {
      const emailExists = await db
        .select()
        .from(companies)
        .where(eq(companies.email, body.email.toLowerCase().trim()));

      if (emailExists && emailExists.length > 0 && emailExists[0].id !== id) {
        return Response.json(
          {
            success: false,
            message: "Email already in use by another company",
          },
          {
            status: 400,
          }
        );
      }
    }

    const updateData = {
      name: body.name,
      email: body.email ? body.email.toLowerCase().trim() : undefined,
      contactNumber: body.contactNumber,
      financialContact: body.financialContact,
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      country: body.country,
      state: body.state,
      zipCode: body.zipCode,
      website: body.website,
      regionalIncharge: body.regionalIncharge,
      status: body.status,
      updatedAt: new Date(),
    };

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    await db
      .update(companies)
      .set(updateData)
      .where(eq(companies.id, id));

    const updatedCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id));

    return Response.json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany[0],
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Company ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const existingCompany = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id));

    if (!existingCompany || existingCompany.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    await db
      .delete(companies)
      .where(eq(companies.id, id));

    return Response.json({
      success: true,
      message: "Company deleted successfully",
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}