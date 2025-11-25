import { FRONTEND_URL } from "./config.js";

export function abandonedEmailTemplate(checkoutUrl, items) {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;"> 
          <strong style="font-size: 14px; color: #333;">${item.name}</strong>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align:center;">
          <span style="font-size: 12px; color: #777;">Qty: ${item.quantity}</span>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align:right;">
          <strong style="font-size: 14px; color: #333;">${item.price}</strong>
        </td>
      </tr>
    `
    )
    .join("");

  return `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; padding: 30px; border: 1px solid #e5e5e5;">
      
      <h1 style="text-align: center; color: #0abab5; font-size: 24px; margin-bottom: 10px;">
        Tiffany Fashion Annie
      </h1>

      <h2 style="text-align: center; color: #333; margin-top: 0;">
        🛍️ Your Items Are Waiting
      </h2>

      <p style="font-size: 15px; color: #444;">
        You added these beautiful items to your cart, but haven’t completed your purchase yet:
      </p>

      <table width="100%" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
        ${itemsHtml}
      </table>

      <div style="margin-top: 20px; padding: 15px; background: #f0fbfb; border-left: 4px solid #0abab5;">
        <strong style="color: #0abab5;">Exclusive Offer:</strong><br>
        Complete your checkout today and enjoy an additional <b>5% OFF</b> your order.
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a 
          href="${checkoutUrl}"
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
          Complete My Order
        </a>
      </div>

      <p style="margin-top: 30px; font-size: 13px; color: #777; text-align: center;">
        If you have questions, feel free to reply to this email.
        <br/>
        We're here to help you anytime.
      </p>

    </div>

    <p style="text-align: center; font-size: 11px; color: #aaa; margin-top: 15px;">
      © ${new Date().getFullYear()} Tiffany Fashion Annie. All rights reserved.
    </p>
  </div>
`;
}
