const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Function to detect and clean circular references
function cleanCircularReferences(obj) {
    const seenObjects = new WeakSet();

    function detectAndClean(obj) {
        if (obj && typeof obj === 'object') {
            if (seenObjects.has(obj)) {
                return '[Circular]';
            }
            seenObjects.add(obj);
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] = detectAndClean(obj[key]);
                }
            }
        }
        return obj;
    }

    return detectAndClean(obj);
}

router.post('/orderData', async (req, res) => {
    console.log("Received request to /orderData with body:", req.body);

    let data = req.body.order_data;
    if (!data || !req.body.email || !req.body.order_date) {
        console.log("Invalid request data:", req.body);
        return res.status(400).send({ error: "Email, order data, and order date are required" });
    }

    data = cleanCircularReferences(data);

    try {
        let eID = await Order.findOne({ 'email': req.body.email });
        console.log("eID found:", eID);

        if (eID == null) {
            try {
                await Order.create({
                    email: req.body.email,
                    order_data: [data],
                    order_date: req.body.order_date // Ensure order_date is stored
                });
                console.log("Order created successfully for email:", req.body.email);
                return res.json({ success: true });
            } catch (error) {
                console.log("Error creating order:", error.message);
                return res.status(500).send({ error: "Server error: " + error.message });
            }
        } else {
            try {
                await Order.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data }, $set: { order_date: req.body.order_date } }
                );
                console.log("Order updated successfully for email:", req.body.email);
                return res.json({ success: true });
            } catch (error) {
                console.log("Error updating order:", error.message);
                return res.status(500).send({ error: "Server error: " + error.message });
            }
        }
    } catch (error) {
        console.log("Unexpected server error:", error.message);
        return res.status(500).send({ error: "Server error: " + error.message });
    }
});

module.exports = router;
