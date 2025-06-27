require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/", healthRoutes);
app.use("/auth", authRoutes);

app.use("/user",authMiddleware, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
