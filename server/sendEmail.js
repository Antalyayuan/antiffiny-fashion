import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Unified email sending module
export async function sendEmail({ to, subject, html }) {
  const msg = {
    to,
    from: {
      email: process.env.EMAIL_FROM,
      name: process.env.EMAIL_FROM_NAME || "Antiffany Fashion Annie"
    },
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`📧 Email sent to ${to} | Subject: ${subject}`);
  } catch (error) {
    console.error("❌ SendGrid Email Error:", error);
  }
}
