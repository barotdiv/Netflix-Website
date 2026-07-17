const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connection Successful");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});