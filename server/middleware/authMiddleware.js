const { verifyToken } = require("../config/auth");

const authMiddleware = (req, res, next) => {
    console.log("Incoming Request:");
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);

    const token = req.headers.authorization?.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
        console.error("Authorization token is missing.");
        return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        const decoded = verifyToken(token);
        console.log("Decoded Token Payload:", decoded);

        req.user = decoded; // Зберігаємо дані користувача у запит
        next(); // Передаємо обробку далі
    } catch (err) {
        console.error("Token verification failed:", err.message);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
