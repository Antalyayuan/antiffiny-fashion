import { SENDGRID_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME } from "../config.js";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(SENDGRID_API_KEY);

export async function sendEmail({ to, subject, html }) {
  const msg = {
    to,
    from: { email: EMAIL_FROM, name: EMAIL_FROM_NAME },
    subject,
    html,
  };
  await sgMail.send(msg);
}
