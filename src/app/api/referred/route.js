import { db } from '@/db';
import { referredPeople } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");

    let query = db
      .select()
      .from(referredPeople)
      .orderBy(desc(referredPeople.createdAt));

    if (companyId) {
      query = query.where(eq(referredPeople.companyId, companyId));
    }

    const referredPeopleList = await query;

    return Response.json({
      success: true,
      data: referredPeopleList,
    });

  } catch (error) {
    console.error('Error fetching referred people:', error);
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to fetch referred people',
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.companyId || !body.name || !body.email || !body.contact) {
      return Response.json(
        {
          success: false,
          message: 'Company ID, name, email, and contact are required',
        },
        { status: 400 }
      );
    }

    const existingReferred = await db
      .select()
      .from(referredPeople)
      .where(eq(referredPeople.email, body.email.toLowerCase().trim()));

    if (existingReferred && existingReferred.length > 0) {
      return Response.json(
        {
          success: false,
          message: 'A referred person with this email already exists',
        },
        { status: 400 }
      );
    }

    const referredData = {
      id: crypto.randomUUID(),
      companyId: body.companyId,
      name: body.name,
      email: body.email.toLowerCase().trim(),
      contact: body.contact,
      createdAt: new Date(),
    };

    await db.insert(referredPeople).values(referredData);

    const createdReferred = await db
      .select()
      .from(referredPeople)
      .where(eq(referredPeople.id, referredData.id));

    return Response.json({
      success: true,
      message: "Referred person created successfully",
      data: createdReferred[0],
    });

  } catch (error) {
    console.error('Error creating referred person:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return Response.json(
        {
          success: false,
          message: 'A referred person with this email already exists',
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to create referred person',
      },
      { status: 500 }
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
          message: 'Referred person ID is required',
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existingReferred = await db
      .select()
      .from(referredPeople)
      .where(eq(referredPeople.id, id));

    if (!existingReferred || existingReferred.length === 0) {
      return Response.json(
        {
          success: false,
          message: 'Referred person not found',
        },
        { status: 404 }
      );
    }

    const updateData = {
      name: body.name,
      email: body.email ? body.email.toLowerCase().trim() : undefined,
      contact: body.contact,
    };

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    await db
      .update(referredPeople)
      .set(updateData)
      .where(eq(referredPeople.id, id));

    const updatedReferred = await db
      .select()
      .from(referredPeople)
      .where(eq(referredPeople.id, id));

    return Response.json({
      success: true,
      message: "Referred person updated successfully",
      data: updatedReferred[0],
    });

  } catch (error) {
    console.error('Error updating referred person:', error);
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to update referred person',
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
      return Response.json(
        {
          success: false,
          message: 'Referred person ID is required',
        },
        { status: 400 }
      );
    }

    const existingReferred = await db
      .select()
      .from(referredPeople)
      .where(eq(referredPeople.id, id));

    if (!existingReferred || existingReferred.length === 0) {
      return Response.json(
        {
          success: false,
          message: 'Referred person not found',
        },
        { status: 404 }
      );
    }

    await db
      .delete(referredPeople)
      .where(eq(referredPeople.id, id));

    return Response.json({
      success: true,
      message: "Referred person deleted successfully",
    });

  } catch (error) {
    console.error('Error deleting referred person:', error);
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to delete referred person',
      },
      { status: 500 }
    );
  }
}