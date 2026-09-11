const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport or Ethereal test account
const createTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback to Nodemailer Ethereal test account if no credentials supplied
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (err) {
    console.warn('Could not create Nodemailer test account, using JSON console log fallback');
    return {
      sendMail: async (mailOptions) => {
        console.log('--- [NODEMAILER MOCK EMAIL SENT] ---');
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Body:\n${mailOptions.text}`);
        return { messageId: `mock_${Date.now()}` };
      }
    };
  }
};

const sendVerificationOTP = async (email, otp) => {
  const transporter = await createTransporter();
  const fromAddress = process.env.SMTP_FROM || '"Tanabana Fabrics Luxury" <no-reply@tanabana.com>';

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #FAF8F5; padding: 30px; color: #1E293B;">
      <div style="max-width: 550px; margin: 0 auto; background: #ffffff; border: 1px solid #EAE6DF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #0F382C; padding: 25px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-family: 'Times New Roman', serif; font-size: 24px; letter-spacing: 2px; color: #D4AF37;">TANABANA FABRICS</h1>
          <p style="margin: 5px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #EAE6DF;">Luxury Pakistani Unstitched Suits</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #0F382C; margin-top: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Account Email Verification</h2>
          <p style="font-size: 14px; color: #475569; line-height: 1.6;">
            Thank you for creating an account with Tanabana Fabrics. Please use the 6-digit verification code below to verify your email address:
          </p>

          <!-- OTP Box -->
          <div style="background: #FAF8F5; border: 2px dashed #D4AF37; display: inline-block; padding: 15px 35px; margin: 20px 0; border-radius: 6px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #0F382C;">${otp}</span>
          </div>

          <p style="font-size: 12px; color: #64748B; margin-bottom: 25px;">
            This verification code is valid for <strong>10 minutes</strong>. If you did not request this code, please ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #F1EFEA; padding: 15px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #EAE6DF;">
          &copy; ${new Date().getFullYear()} Tanabana Fabrics Atelier. All rights reserved.<br/>
          Nationwide PKR Delivery • Cash on Delivery Available
        </div>

      </div>
    </div>
  `;

  const info = await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: `🔑 ${otp} is your Tanabana Fabrics Verification Code`,
    text: `Your Tanabana Fabrics registration code is ${otp}. Valid for 10 minutes.`,
    html: htmlTemplate,
  });

  if (info.messageId && nodemailer.getTestMessageUrl) {
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`✉️ Nodemailer Ethereal Email Preview URL: ${previewUrl}`);
    }
  }

  return info;
};

module.exports = {
  sendVerificationOTP,
};
