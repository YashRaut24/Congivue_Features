const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");
const topicRoutes = require("./routes/topicRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const activityRoutes = require("./routes/activityRoutes");

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
app.use("/api/topics", topicRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/activities", activityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});