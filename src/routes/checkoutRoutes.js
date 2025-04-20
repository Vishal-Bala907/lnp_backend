const express = require("express");
const router = express.Router();
const Checkout = require("../models/Checkout");

// POST /checkout — Save data
router.post("/add", async (req, res) => {
  try {
    const checkout = new Checkout(req.body);
    await checkout.save();
    res.status(201).json({ success: true, data: checkout });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /checkout/today — Get today’s checkouts
router.get("/today", async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    const todayData = await Checkout.find({
      createdAt: { $gte: start, $lte: end },
    });
    res.json({ success: true, data: todayData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /checkout?page=1&limit=10 — Paginated data
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Checkout.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Checkout.countDocuments(),
    ]);
    res.json({
      success: true,
      data,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
