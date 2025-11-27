import dotenv from "dotenv";
import mysql from "mysql2/promise";
import fetch from "node-fetch";

// Load secrets from .env.local
dotenv.config({ path: ".env.local" });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, CRON_SECRET, PORT } = process.env;

async function runTest() {
    console.log("🚀 Starting Abandoned Cart Verification...");

    if (!CRON_SECRET) {
        console.error("❌ CRON_SECRET is missing in .env.local");
        process.exit(1);
    }

    // 1. Connect to DB
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });

    let orderId;

    try {
        // 2. Insert Test Order (10 mins ago)
        const testEmail = "test_abandoned@example.com";

        console.log("📝 Inserting test abandoned order...");
        const [result] = await connection.execute(
            `INSERT INTO orders (order_id, amount, currency, customer_email, user_email, status, items, created_at, email_sent)
       VALUES (?, ?, ?, ?, ?, ?, ?, DATE_SUB(NOW(), INTERVAL 10 MINUTE), 0)`,
            [
                "test_cron_" + Date.now(),
                100,
                "GBP",
                testEmail,
                testEmail,
                "unpaid",
                JSON.stringify([{ name: "Test Item", price: "£100", quantity: 1, image: "/test.jpg" }]),
            ]
        );
        orderId = result.insertId;
        console.log(`✅ Test order inserted. ID: ${orderId}`);

        // 3. Call Cron Endpoint
        const cronUrl = `http://localhost:${PORT || 4242}/cron/abandoned-orders`;
        console.log(`Testing Cron URL: ${cronUrl}`);

        const response = await fetch(cronUrl, {
            headers: { "x-cron-secret": CRON_SECRET },
        });

        if (!response.ok) {
            throw new Error(`Cron request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Cron Response:", data);

        // 4. Verify DB Update
        const [rows] = await connection.execute("SELECT email_sent FROM orders WHERE id = ?", [orderId]);
        if (rows[0].email_sent === 1) {
            console.log("✅ SUCCESS: Order marked as email sent!");
        } else {
            console.error("❌ FAILURE: Order email_sent flag was NOT updated.");
        }

    } catch (err) {
        console.error("❌ Test Failed:", err);
    } finally {
        if (orderId) {
            await connection.execute("DELETE FROM orders WHERE id = ?", [orderId]);
            console.log("🧹 Test order cleaned up.");
        }
        await connection.end();
    }
}

runTest();
