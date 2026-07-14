import nodemailer from 'nodemailer';
import { studentEmailTemplates } from './emailTemplates';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Get admin info from database
const getAdminInfo = async (userId) => {
  try {
    // If no userId or it's 'system', return null (don't send email)
    if (!userId || userId === 'system') {
      return null;
    }
    
    const { db } = await import('@/db');
    const { users } = await import('@/db/schema');
    const { eq } = await import('drizzle-orm');
    
    const admin = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (admin && admin.length > 0 && admin[0].email) {
      return {
        name: `${admin[0].firstName || ''} ${admin[0].lastName || ''}`.trim() || 'Admin',
        email: admin[0].email,
        id: admin[0].id
      };
    }
    
    // Return null if admin not found (don't send email)
    return null;
  } catch (error) {
    console.error('Error fetching admin info:', error);
    return null;
  }
};

// Send student created email to the logged-in admin
export async function sendStudentCreatedEmail(student, adminId) {
  try {
    const admin = await getAdminInfo(adminId);
    
    // Skip email if admin not found or no email
    if (!admin || !admin.email) {
      console.log('Skipping email - admin not found or no email');
      return { success: true, skipped: true };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: admin.email,
      subject: `New Student Added - ${student.name} ${student.surname}`,
      html: studentEmailTemplates.studentCreated(student, admin.name, admin.email),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending student created email:', error);
    return { success: false, error: error.message };
  }
}

// Send student updated email to the logged-in admin
export async function sendStudentUpdatedEmail(student, oldData, changes, adminId) {
  try {
    const admin = await getAdminInfo(adminId);
    
    // Skip email if admin not found or no email
    if (!admin || !admin.email) {
      console.log('Skipping email - admin not found or no email');
      return { success: true, skipped: true };
    }
    
    // Format changes for email
    const changeList = changes.map(change => ({
      field: change.field,
      oldValue: change.oldValue || 'N/A',
      newValue: change.newValue || 'N/A'
    }));

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: admin.email,
      subject: `Student Updated - ${student.name} ${student.surname}`,
      html: studentEmailTemplates.studentUpdated(student, changeList, admin.name, admin.email),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending student updated email:', error);
    return { success: false, error: error.message };
  }
}

// Send student deleted email to the logged-in admin
export async function sendStudentDeletedEmail(student, adminId) {
  try {
    const admin = await getAdminInfo(adminId);
    
    // Skip email if admin not found or no email
    if (!admin || !admin.email) {
      console.log('Skipping email - admin not found or no email');
      return { success: true, skipped: true };
    }
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: admin.email,
      subject: `Student Deleted - ${student.name} ${student.surname}`,
      html: studentEmailTemplates.studentDeleted(student, admin.name, admin.email),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending student deleted email:', error);
    return { success: false, error: error.message };
  }
}

// Optional: Send notification to multiple admins if needed
export async function sendStudentCreatedEmailToAdmins(student, adminId, additionalEmails = []) {
  try {
    const admin = await getAdminInfo(adminId);
    
    // Combine admin email with additional emails
    const recipients = [admin?.email, ...additionalEmails].filter(Boolean);
    
    if (recipients.length === 0) {
      console.log('Skipping email - no recipients');
      return { success: true, skipped: true };
    }
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipients.join(','),
      subject: `New Student Added - ${student.name} ${student.surname}`,
      html: studentEmailTemplates.studentCreated(student, admin?.name || 'Admin', admin?.email || ''),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending student created email:', error);
    return { success: false, error: error.message };
  }
}