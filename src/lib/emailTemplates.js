export const studentEmailTemplates = {
  // Student Created Template
  studentCreated: (student, adminName, adminEmail) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 0 auto; background: #ffffff; padding: 40px 30px; }
        .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; color: #111827; font-weight: 600; }
        .header p { margin: 5px 0 0 0; color: #6b7280; font-size: 14px; }
        .content { color: #111827; }
        .admin-info { background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px 20px; margin: 20px 0; border-radius: 6px; }
        .admin-info p { margin: 0; color: #374151; font-size: 14px; }
        .table-container { overflow-x: auto; margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 6px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { background: #f9fafb; color: #374151; font-weight: 600; padding: 12px 15px; text-align: left; border-bottom: 2px solid #e5e7eb; }
        td { padding: 10px 15px; border-bottom: 1px solid #f3f4f6; color: #111827; }
        tr:last-child td { border-bottom: none; }
        .badge { display: inline-block; padding: 4px 12px; background: #10b981; color: #ffffff; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .footer { border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 13px; }
        .footer p { margin: 5px 0; }
        .message { background: #f9fafb; border-left: 4px solid #10b981; padding: 15px 20px; margin: 20px 0; border-radius: 4px; }
        .message p { margin: 0; color: #374151; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Student Added</h1>
          <p>A new student has been registered in the system</p>
        </div>
        <div class="content">
          <div class="admin-info">
            <p><strong>Added by:</strong> ${adminName} (${adminEmail})</p>
          </div>
          
          <div class="message">
            <p><strong>✅ Student has been successfully added to the system.</strong></p>
          </div>

          <h3 style="color: #111827; margin: 20px 0 15px 0;">Student Details</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Full Name</strong></td><td>${student.name} ${student.surname}</td></tr>
                <tr><td><strong>Email</strong></td><td>${student.email}</td></tr>
                <tr><td><strong>Course Title</strong></td><td>${student.course || 'N/A'}</td></tr>
                <tr><td><strong>Academic Year</strong></td><td>${student.academicYear || 'N/A'}</td></tr>
                <tr><td><strong>Nationality</strong></td><td>${student.nationality || 'N/A'}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${student.phone || 'N/A'}</td></tr>
                <tr><td><strong>Mobile</strong></td><td>${student.mobile || 'N/A'}</td></tr>
                <tr><td><strong>Country</strong></td><td>${student.country || 'N/A'}</td></tr>
                <tr><td><strong>Country of Residence</strong></td><td>${student.countryOfResidence || 'N/A'}</td></tr>
                <tr><td><strong>Full Address</strong></td><td>${student.fullAddress || 'N/A'}</td></tr>
                <tr><td><strong>Date of Birth</strong></td><td>${student.dateOfBirth || 'N/A'}</td></tr>
                <tr><td><strong>Gender</strong></td><td>${student.gender || 'N/A'}</td></tr>
                <tr><td><strong>Marital Status</strong></td><td>${student.maritalStatus || 'N/A'}</td></tr>
                <tr><td><strong>Passport/ID Number</strong></td><td>${student.passportNumber || 'N/A'}</td></tr>
                <tr><td><strong>Issue Place</strong></td><td>${student.issuePlace || 'N/A'}</td></tr>
                <tr><td><strong>Issue Country</strong></td><td>${student.issueCountry || 'N/A'}</td></tr>
                <tr><td><strong>Issue Date</strong></td><td>${student.issueDate || 'N/A'}</td></tr>
                <tr><td><strong>Expiry Date</strong></td><td>${student.expiryDate || 'N/A'}</td></tr>
                <tr><td><strong>Contact Name</strong></td><td>${student.contactName || 'N/A'}</td></tr>
                <tr><td><strong>Contact Address</strong></td><td>${student.contactAddress || 'N/A'}</td></tr>
                <tr><td><strong>Contact Phone</strong></td><td>${student.contactPhone || 'N/A'}</td></tr>
                <tr><td><strong>Contact Email</strong></td><td>${student.contactEmail || 'N/A'}</td></tr>
                <tr><td><strong>Relationship</strong></td><td>${student.relationship || 'N/A'}</td></tr>
                <tr><td><strong>Agency Name</strong></td><td>${student.agencyName || 'N/A'}</td></tr>
                <tr><td><strong>Agency Email</strong></td><td>${student.agencyEmail || 'N/A'}</td></tr>
                <tr><td><strong>Status</strong></td><td><span class="badge">Active</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from the Student Management System</p>
          <p>&copy; ${new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Student Updated Template
  studentUpdated: (student, changes, adminName, adminEmail) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 0 auto; background: #ffffff; padding: 40px 30px; }
        .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; color: #111827; font-weight: 600; }
        .header p { margin: 5px 0 0 0; color: #6b7280; font-size: 14px; }
        .content { color: #111827; }
        .admin-info { background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px 20px; margin: 20px 0; border-radius: 6px; }
        .admin-info p { margin: 0; color: #374151; font-size: 14px; }
        .table-container { overflow-x: auto; margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 6px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { background: #f9fafb; color: #374151; font-weight: 600; padding: 12px 15px; text-align: left; border-bottom: 2px solid #e5e7eb; }
        td { padding: 10px 15px; border-bottom: 1px solid #f3f4f6; color: #111827; }
        tr:last-child td { border-bottom: none; }
        .badge-updated { display: inline-block; padding: 4px 12px; background: #f59e0b; color: #ffffff; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .footer { border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 13px; }
        .footer p { margin: 5px 0; }
        .message { background: #f9fafb; border-left: 4px solid #f59e0b; padding: 15px 20px; margin: 20px 0; border-radius: 4px; }
        .message p { margin: 0; color: #374151; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Student Record Updated</h1>
          <p>Student information has been updated in the system</p>
        </div>
        <div class="content">
          <div class="admin-info">
            <p><strong>Updated by:</strong> ${adminName} (${adminEmail})</p>
          </div>
          
          <div class="message">
            <p><strong>📝 Student record has been successfully updated.</strong></p>
          </div>

          <h3 style="color: #111827; margin: 20px 0 15px 0;">Updated Student Details</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Full Name</strong></td><td>${student.name} ${student.surname}</td></tr>
                <tr><td><strong>Email</strong></td><td>${student.email}</td></tr>
                <tr><td><strong>Course Title</strong></td><td>${student.course || 'N/A'}</td></tr>
                <tr><td><strong>Academic Year</strong></td><td>${student.academicYear || 'N/A'}</td></tr>
                <tr><td><strong>Nationality</strong></td><td>${student.nationality || 'N/A'}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${student.phone || 'N/A'}</td></tr>
                <tr><td><strong>Mobile</strong></td><td>${student.mobile || 'N/A'}</td></tr>
                <tr><td><strong>Country</strong></td><td>${student.country || 'N/A'}</td></tr>
                <tr><td><strong>Country of Residence</strong></td><td>${student.countryOfResidence || 'N/A'}</td></tr>
                <tr><td><strong>Full Address</strong></td><td>${student.fullAddress || 'N/A'}</td></tr>
                <tr><td><strong>Date of Birth</strong></td><td>${student.dateOfBirth || 'N/A'}</td></tr>
                <tr><td><strong>Gender</strong></td><td>${student.gender || 'N/A'}</td></tr>
                <tr><td><strong>Marital Status</strong></td><td>${student.maritalStatus || 'N/A'}</td></tr>
                <tr><td><strong>Passport/ID Number</strong></td><td>${student.passportNumber || 'N/A'}</td></tr>
                <tr><td><strong>Issue Place</strong></td><td>${student.issuePlace || 'N/A'}</td></tr>
                <tr><td><strong>Issue Country</strong></td><td>${student.issueCountry || 'N/A'}</td></tr>
                <tr><td><strong>Issue Date</strong></td><td>${student.issueDate || 'N/A'}</td></tr>
                <tr><td><strong>Expiry Date</strong></td><td>${student.expiryDate || 'N/A'}</td></tr>
                <tr><td><strong>Contact Name</strong></td><td>${student.contactName || 'N/A'}</td></tr>
                <tr><td><strong>Contact Address</strong></td><td>${student.contactAddress || 'N/A'}</td></tr>
                <tr><td><strong>Contact Phone</strong></td><td>${student.contactPhone || 'N/A'}</td></tr>
                <tr><td><strong>Contact Email</strong></td><td>${student.contactEmail || 'N/A'}</td></tr>
                <tr><td><strong>Relationship</strong></td><td>${student.relationship || 'N/A'}</td></tr>
                <tr><td><strong>Agency Name</strong></td><td>${student.agencyName || 'N/A'}</td></tr>
                <tr><td><strong>Agency Email</strong></td><td>${student.agencyEmail || 'N/A'}</td></tr>
                <tr><td><strong>Status</strong></td><td><span class="badge-updated">Updated</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from the Student Management System</p>
          <p>&copy; ${new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Student Deleted Template
  studentDeleted: (student, adminName, adminEmail) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 0 auto; background: #ffffff; padding: 40px 30px; }
        .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 24px; color: #111827; font-weight: 600; }
        .header p { margin: 5px 0 0 0; color: #6b7280; font-size: 14px; }
        .content { color: #111827; }
        .admin-info { background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px 20px; margin: 20px 0; border-radius: 6px; }
        .admin-info p { margin: 0; color: #374151; font-size: 14px; }
        .table-container { overflow-x: auto; margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 6px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { background: #f9fafb; color: #374151; font-weight: 600; padding: 12px 15px; text-align: left; border-bottom: 2px solid #e5e7eb; }
        td { padding: 10px 15px; border-bottom: 1px solid #f3f4f6; color: #111827; }
        tr:last-child td { border-bottom: none; }
        .badge-deleted { display: inline-block; padding: 4px 12px; background: #ef4444; color: #ffffff; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .footer { border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; color: #6b7280; font-size: 13px; }
        .footer p { margin: 5px 0; }
        .message { background: #f9fafb; border-left: 4px solid #ef4444; padding: 15px 20px; margin: 20px 0; border-radius: 4px; }
        .message p { margin: 0; color: #374151; font-size: 14px; }
        .warning-text { color: #dc2626; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Student Record Deleted</h1>
          <p>A student record has been removed from the system</p>
        </div>
        <div class="content">
          <div class="admin-info">
            <p><strong>Deleted by:</strong> ${adminName} (${adminEmail})</p>
          </div>
          
          <div class="message">
            <p><span class="warning-text">⚠️</span> <strong>Student record has been permanently deleted from the system.</strong></p>
          </div>

          <h3 style="color: #111827; margin: 20px 0 15px 0;">Deleted Student Details</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Full Name</strong></td><td>${student.name} ${student.surname}</td></tr>
                <tr><td><strong>Email</strong></td><td>${student.email}</td></tr>
                <tr><td><strong>Course Title</strong></td><td>${student.course || 'N/A'}</td></tr>
                <tr><td><strong>Academic Year</strong></td><td>${student.academicYear || 'N/A'}</td></tr>
                <tr><td><strong>Nationality</strong></td><td>${student.nationality || 'N/A'}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${student.phone || 'N/A'}</td></tr>
                <tr><td><strong>Mobile</strong></td><td>${student.mobile || 'N/A'}</td></tr>
                <tr><td><strong>Country</strong></td><td>${student.country || 'N/A'}</td></tr>
                <tr><td><strong>Country of Residence</strong></td><td>${student.countryOfResidence || 'N/A'}</td></tr>
                <tr><td><strong>Full Address</strong></td><td>${student.fullAddress || 'N/A'}</td></tr>
                <tr><td><strong>Date of Birth</strong></td><td>${student.dateOfBirth || 'N/A'}</td></tr>
                <tr><td><strong>Gender</strong></td><td>${student.gender || 'N/A'}</td></tr>
                <tr><td><strong>Marital Status</strong></td><td>${student.maritalStatus || 'N/A'}</td></tr>
                <tr><td><strong>Passport/ID Number</strong></td><td>${student.passportNumber || 'N/A'}</td></tr>
                <tr><td><strong>Issue Place</strong></td><td>${student.issuePlace || 'N/A'}</td></tr>
                <tr><td><strong>Issue Country</strong></td><td>${student.issueCountry || 'N/A'}</td></tr>
                <tr><td><strong>Issue Date</strong></td><td>${student.issueDate || 'N/A'}</td></tr>
                <tr><td><strong>Expiry Date</strong></td><td>${student.expiryDate || 'N/A'}</td></tr>
                <tr><td><strong>Contact Name</strong></td><td>${student.contactName || 'N/A'}</td></tr>
                <tr><td><strong>Contact Address</strong></td><td>${student.contactAddress || 'N/A'}</td></tr>
                <tr><td><strong>Contact Phone</strong></td><td>${student.contactPhone || 'N/A'}</td></tr>
                <tr><td><strong>Contact Email</strong></td><td>${student.contactEmail || 'N/A'}</td></tr>
                <tr><td><strong>Relationship</strong></td><td>${student.relationship || 'N/A'}</td></tr>
                <tr><td><strong>Agency Name</strong></td><td>${student.agencyName || 'N/A'}</td></tr>
                <tr><td><strong>Agency Email</strong></td><td>${student.agencyEmail || 'N/A'}</td></tr>
                <tr><td><strong>Status</strong></td><td><span class="badge-deleted">Deleted</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from the Student Management System</p>
          <p>&copy; ${new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </body>
    </html>
  `
};