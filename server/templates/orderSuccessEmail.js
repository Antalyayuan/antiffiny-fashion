import { FRONTEND_URL } from "../config.js";

function resolveImageUrl(imagePath) {
  if (!imagePath) return "";

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  imagePath = imagePath.replace(/^\.?\/*public\//, "/");
  imagePath = imagePath.replace(/^\.?\/*/, "/");

  return `${FRONTEND_URL}${imagePath}`;
}

export function orderSuccessEmailTemplate(order, items) {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;"> 
          <img src="${resolveImageUrl(item.image)}"
               alt="${item.name}"
               style="width: 90px; height: 90px; border-radius: 8px; object-fit: cover;" />
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
          <strong style="font-size: 14px; color: #333;">${item.name}</strong><br/>
          <span style="font-size: 12px; color: #777;">Qty: ${item.quantity}</span>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">
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
        Antiffany Fashion Annie
      </h1>

      <h2 style="text-align: center; color: #333; margin-top: 0;">
        💎 Order Confirmation
      </h2>

      <p style="font-size: 15px; color: #444;">
        Thank you for your purchase! Your order has been successfully processed.
      </p>

      <div style="margin: 20px 0; padding: 15px; background: #f0fbfb; border-left: 4px solid #0abab5;">
        <strong style="color: #0abab5;">Order ID:</strong> ${order.order_id} <br/>
        <strong style="color: #0abab5;">Status:</strong> Paid <br/>
        <strong style="color: #0abab5;">Total Amount:</strong> £${Number(order.amount).toLocaleString()}
      </div>

      <h3 style="margin-top: 25px; color: #333;">🛍️ Order Items</h3>

      <table width="100%" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
        ${itemsHtml}
      </table>

      <div style="margin-top: 30px; text-align: center;">
        <a 
          href='${FRONTEND_URL}/#/orders'
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
          View My Order
        </a>
      </div>

      <p style="margin-top: 30px; font-size: 13px; color: #777; text-align: center;">
        If you have any questions, feel free to reply to this email.
        <br/>
        Thank you for shopping with Antiffany Fashion Annie.
      </p>

    </div>

    <p style="text-align: center; font-size: 11px; color: #aaa; margin-top: 15px;">
      © ${new Date().getFullYear()} Antiffany Fashion Annie. All rights reserved.
    </p>
  </div>
`;
}

