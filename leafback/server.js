const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connection");

const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/detectDiseaseRoute"));
app.use("/api", require("./routes/otherRoutes"));

const PORT = process.env.PORT || 5000;

// 🔥 Proper startup flow
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();