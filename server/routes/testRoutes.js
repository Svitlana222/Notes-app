const express = require("express");
const router = express.Router();

// Тестовий маршрут
router.get("/", (req, res) => {
    res.status(200).json({ message: "Test connection successful!" });
});

module.exports = router;
