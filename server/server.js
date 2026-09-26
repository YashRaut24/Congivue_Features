const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});