const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const generateRoutes = require("./routes/generate");
const translateRoutes = require("./routes/translate");
const audioRoutes = require("./routes/audio");

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/generate", generateRoutes);
app.use("/translate", translateRoutes);
app.use("/audio", audioRoutes);

module.exports = app;
