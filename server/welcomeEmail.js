import { FRONTEND_URL } from "./config.js";

export function welcomeEmailTemplate(name) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; padding: 30px; border: 1px solid #e5e5e5;">
      
      <h1 style="text-align: center; color: #0abab5; font-size: 24px; margin-bottom: 10px;">
        Tiffany Fashion Annie
      </h1>

      <h2 style="text-align: center; color: #333; margin-bottom: 20px;">
        🎉 Welcome, ${name}!
      </h2>

      <p style="font-size: 15px; color: #444;">
        We're delighted to have you join our fashion family.  
        As a warm welcome, here’s an exclusive <b>10% OFF coupon</b> for your first order:
      </p>

      <div style="margin: 20px auto; width: 160px; background: #f0fbfb; padding: 12px; text-align: center; border-left: 4px solid #0abab5; border-radius: 6px;">
        <strong style="font-size: 18px; color: #0abab5;">WELCOME10</strong>
      </div>

      <p style="font-size: 14px; color: #555; text-align: center;">
        Use it at checkout on any item in our store.
      </p>

      <div style="margin-top: 30px; text-align: center;">
        <a 
          href="${FRONTEND_URL}/#/products"
          style="
            background-color: #0abab5;
            color: white;
            padding: 14px 26px;
            text-decoration: none;
            border-radius: 30px;
            font-size: 15px;
            display: inline-block;
          "
        >
          Shop New Arrivals
        </a>
      </div>

      <p style="margin-top: 30px; font-size: 13px; color: #777; text-align: center;">
        We hope you enjoy your shopping experience with Tiffany Fashion Annie!
        <br/>
        If you need help, just reply to this email — we’re here for you 💕
      </p>

    </div>

    <p style="text-align: center; font-size: 11px; color: #aaa; margin-top: 15px;">
      © ${new Date().getFullYear()} Tiffany Fashion Annie. All rights reserved.
    </p>
  </div>
`;
}
