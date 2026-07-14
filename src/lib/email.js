import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendAdminCredentialsEmail(email, firstName, lastName, password, companyName) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Welcome to ${companyName} - Your Admin Account Credentials`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: #ffffff;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              padding: 40px 30px;
            }
            .header {
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              color: #111827;
              font-weight: 600;
            }
            .header p {
              margin: 5px 0 0 0;
              color: #6b7280;
              font-size: 14px;
            }
            .content {
              color: #111827;
            }
            .greeting {
              font-size: 16px;
              color: #111827;
              margin-bottom: 15px;
            }
            .greeting strong {
              color: #111827;
            }
            .message {
              color: #374151;
              line-height: 1.7;
              margin-bottom: 25px;
              font-size: 14px;
            }
            .credentials {
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 20px 25px;
              margin: 20px 0;
            }
            .credentials-title {
              font-size: 16px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 15px;
            }
            .credential-item {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .credential-item:last-child {
              border-bottom: none;
            }
            .label {
              color: #6b7280;
              font-weight: 500;
            }
            .value {
              color: #111827;
              font-weight: 600;
              word-break: break-all;
            }
            .value.password {
              font-family: 'Courier New', monospace;
              background: #f9fafb;
              padding: 2px 10px;
              border-radius: 4px;
              letter-spacing: 1px;
            }
            .button-container {
              text-align: center;
              margin: 25px 0 20px;
            }
            .button {
              display: inline-block;
              background: #111827;
              color: #ffffff;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              font-size: 14px;
              transition: background 0.3s ease;
            }
            .button:hover {
              background: #1f2937;
            }
            .footer {
              border-top: 2px solid #e5e7eb;
              padding-top: 20px;
              margin-top: 30px;
              text-align: center;
              color: #6b7280;
              font-size: 13px;
            }
            .footer p {
              margin: 5px 0;
            }
            .footer .company-name {
              color: #111827;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${companyName}</h1>
              <p>Your admin account has been created successfully</p>
            </div>
            <div class="content">
              <div class="greeting">
                Hello <strong>${firstName} ${lastName}</strong>,
              </div>
              <p class="message">
                Your admin account for <strong>${companyName}</strong> has been successfully created. 
                You can now log in to the admin portal using the credentials below.
              </p>

              <div class="credentials">
                <div class="credentials-title">Your Login Credentials</div>
                <div class="credential-item">
                  <span class="label">Email</span>
                  <span class="value">${email}</span>
                </div>
                <div class="credential-item">
                  <span class="label">Password</span>
                  <span class="value password">${password}</span>
                </div>
              </div>

              <div class="button-container">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" class="button">
                  Go to Login Portal
                </a>
              </div>

              <p style="color: #374151; line-height: 1.7; font-size: 14px;">
                If you have any questions or need assistance, please contact your system administrator.
              </p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
              <p>&copy; ${new Date().getFullYear()} <span class="company-name">${companyName}</span>. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}