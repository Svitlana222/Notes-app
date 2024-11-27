require("dotenv").config();
const express = require("express");
const cors = require("cors");
 
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Роутинг
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/test", testRoutes);
// Глобальний обробник помилок
app.use(errorHandler);

module.exports = app;
