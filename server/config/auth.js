const jwt = require("jsonwebtoken");

// Генерація токену
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET; // Беремо секретний ключ з .env
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in .env file");
    }
    return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
};

// Перевірка токену
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET; // Беремо секретний ключ з .env
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in .env file");
    }
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
