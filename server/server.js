import { app } from "./app.js";
import { PORT, FRONTEND_URL, CRON_SECRET } from "./config.js";
import fetch from "node-fetch";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend origin: ${FRONTEND_URL}`);

  // 🕒 Simple Scheduler: Run Abandoned Cart Check every 5 minutes
  console.log("⏰ Scheduler started: Checking for abandoned carts every 5 minutes...");
  setInterval(async () => {
    try {
      // 1. Check Abandoned Carts
      const resAbandoned = await fetch(`http://localhost:${PORT}/cron/abandoned-orders`, {
        headers: { "x-cron-secret": CRON_SECRET },
      });
      const dataAbandoned = await resAbandoned.json();
      if (dataAbandoned.count > 0) {
        console.log(`📧 Sent ${dataAbandoned.count} abandoned cart emails.`);
      }

      // 2. Cleanup Old Unpaid Orders
      const resCleanup = await fetch(`http://localhost:${PORT}/cron/cleanup-unpaid`, {
        headers: { "x-cron-secret": CRON_SECRET },
      });
      const dataCleanup = await resCleanup.json();
      if (dataCleanup.deleted > 0) {
        console.log(`🧹 Cleaned up ${dataCleanup.deleted} old unpaid orders.`);
      }

    } catch (err) {
      console.error("❌ Scheduler Error:", err.message);
    }
  }, 5 * 60 * 1000); // 5 minutes
});
