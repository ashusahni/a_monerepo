import express from "express";
import db from "@repo/db/client";
import { z } from "zod";

const app = express();
app.use(express.json());

const paymentSchema = z.object({
    token: z.string().or(z.number().transform((num) => num.toString())),  // Ensure token is a string
    user_identifier: z.coerce.number(),
    amount: z.coerce.number().positive()
});



app.post("/hdfcWebhook", async (req, res) => {
    // Validate request body
    const parseResult = paymentSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid request payload" });
    }

    const { token, user_identifier: userId, amount } = parseResult.data;

    try {
        await db.$transaction([
            db.balance.update({
                where: { userId },
                data: { amount: { increment: amount } }
            }),
            db.onRampTransaction.update({
                where: { token },
                data: { status: "Success" }
            })
        ]);

        res.json({ message: "Captured" });
    } catch (e) {
        console.error("Webhook processing error:", e);
        res.status(500).json({ message: "Error while processing webhook" });
    }
});

app.listen(3003, () => console.log("Server running on port 3003"));
