import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, students, companies, referredPeople } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";

export async function GET(request) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId || userId === 'system') {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const currentUser = user[0];
    const isSuperAdmin = currentUser.role === 'superadmin';
    const companyId = currentUser.companyId;

    let stats = {};
    let recentActivity = [];
    let alerts = [];
    let chartData = [];
    let companyStats = [];
    let recentStudents = [];
    let referredPeopleList = [];

    if (isSuperAdmin) {
      const totalCompanies = await db.select({ count: count() }).from(companies);
      const totalAdmins = await db.select({ count: count() }).from(users).where(eq(users.role, 'admin'));
      const totalStudents = await db.select({ count: count() }).from(students);
      const totalReferred = await db.select({ count: count() }).from(referredPeople);

      stats = {
        totalCompanies: totalCompanies[0]?.count || 0,
        totalAdmins: totalAdmins[0]?.count || 0,
        totalStudents: totalStudents[0]?.count || 0,
        totalReferred: totalReferred[0]?.count || 0,
        activeCompanies: totalCompanies[0]?.count || 0,
      };

      const companiesData = await db.select().from(companies).limit(5);
      
      companyStats = await Promise.all(companiesData.map(async (company) => {
        const studentCount = await db
          .select({ count: count() })
          .from(students)
          .where(eq(students.companyId, company.id));
        
        return {
          id: company.id,
          name: company.name,
          email: company.email,
          studentCount: studentCount[0]?.count || 0,
          status: studentCount[0]?.count > 0 ? 'Active' : 'Inactive'
        };
      }));

      const recentReferred = await db
        .select()
        .from(referredPeople)
        .orderBy(desc(referredPeople.createdAt))
        .limit(5);

      referredPeopleList = recentReferred.map(r => ({
        id: r.id,
        name: r.name,
        email: r.email,
        contact: r.contact,
        createdAt: r.createdAt,
      }));

      recentActivity = [
        { id: 1, user: "System", action: "Dashboard loaded", target: "Admin Panel", time: "Just now", type: "info" },
        ...companyStats.slice(0, 3).map((c, i) => ({
          id: i + 2,
          user: "System",
          action: `Company "${c.name}" has ${c.studentCount} students`,
          target: c.email,
          time: `${i + 1} hours ago`,
          type: "info"
        }))
      ];

      alerts = [
        { id: 1, type: "success", message: `Total ${stats.totalCompanies} companies registered`, time: "Just now" },
        { id: 2, type: "info", message: `${stats.totalAdmins} admin accounts active`, time: "Just now" },
        { id: 3, type: "warning", message: `${stats.totalStudents} total students in system`, time: "Just now" },
      ];

      chartData = [
        { month: "Jan", students: 45, companies: 12 },
        { month: "Feb", students: 52, companies: 14 },
        { month: "Mar", students: 48, companies: 15 },
        { month: "Apr", students: 63, companies: 16 },
        { month: "May", students: 58, companies: 17 },
        { month: "Jun", students: 72, companies: 19 },
      ];

    } else {
      let adminCompany = null;
      if (companyId) {
        const company = await db
          .select()
          .from(companies)
          .where(eq(companies.id, companyId))
          .limit(1);
        adminCompany = company[0] || null;
      }

      const myStudents = await db
        .select({ count: count() })
        .from(students)
        .where(eq(students.createdBy, userId));

      let companyStudentsData = [];
      if (companyId) {
        companyStudentsData = await db
          .select()
          .from(students)
          .where(eq(students.companyId, companyId))
          .orderBy(desc(students.createdAt))
          .limit(10);
      }

      let referredData = [];
      if (companyId) {
        referredData = await db
          .select()
          .from(referredPeople)
          .where(eq(referredPeople.companyId, companyId))
          .orderBy(desc(referredPeople.createdAt))
          .limit(10);
      }

      stats = {
        myStudents: myStudents[0]?.count || 0,
        companyName: adminCompany?.name || 'No Company',
        companyId: companyId,
        totalCompanyStudents: companyStudentsData.length || 0,
        totalReferred: referredData.length || 0,
      };

      recentStudents = companyStudentsData.map(s => ({
        id: s.id,
        name: `${s.name} ${s.surname}`,
        email: s.email,
        course: s.course,
        createdAt: s.createdAt,
      }));

      referredPeopleList = referredData.map(r => ({
        id: r.id,
        name: r.name,
        email: r.email,
        contact: r.contact,
        createdAt: r.createdAt,
      }));

      recentActivity = [
        { id: 1, user: "You", action: "Dashboard loaded", target: "Admin Panel", time: "Just now", type: "info" },
        ...recentStudents.slice(0, 3).map((s, i) => ({
          id: i + 2,
          user: "You",
          action: `Added student "${s.name}"`,
          target: s.email,
          time: `${i + 1} hours ago`,
          type: "create"
        }))
      ];

      alerts = [
        { id: 1, type: "success", message: `Welcome to ${stats.companyName || 'your dashboard'}`, time: "Just now" },
        { id: 2, type: "info", message: `You have ${stats.myStudents} students`, time: "Just now" },
      ];

      chartData = [
        { month: "Jan", students: 12, applications: 8 },
        { month: "Feb", students: 15, applications: 10 },
        { month: "Mar", students: 10, applications: 12 },
        { month: "Apr", students: 18, applications: 14 },
        { month: "May", students: 14, applications: 16 },
        { month: "Jun", students: 20, applications: 18 },
      ];
    }

    return NextResponse.json({
      success: true,
      data: {
        stats,
        recentActivity,
        alerts,
        chartData,
        companyStats,
        recentStudents,
        referredPeople: referredPeopleList,
        isSuperAdmin,
        companyId,
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to fetch dashboard data" 
      },
      { status: 500 }
    );
  }
}