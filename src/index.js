const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const checkoutRoutes = require("./routes/checkoutRoutes");

const app = express();
// const cors = require("cors");

app.use(
  cors({
    origin: "https://lnp-landing-page.vercel.app", // exact origin
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.options("*", cors()); // 👈 Add this line
app.use(express.json());

app.use("/checkout", checkoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Mongo error:", err));
