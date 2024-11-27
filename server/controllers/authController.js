const bcrypt = require("bcryptjs");
const { db } = require("../config/db");
const { generateToken } = require("../config/auth");

// Реєстрація користувача
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    console.log("Request Data for Registration:", { username, password, email }); // Виведення даних, які приходять у запиті

    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Hashed Password:", hashedPassword); // Виведення хешованого пароля

        const query = `INSERT INTO Users (username, password, email) VALUES (?, ?, ?)`;

        db.run(query, [username, hashedPassword, email], function (err) {
            if (err) {
                console.error("Error during user registration:", err.message); // Виведення помилки в консоль
                return res.status(500).json({ message: "Error registering user", error: err.message });
            }
            console.log("User Registered with ID:", this.lastID); // Виведення ID нового користувача
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error("Error hashing password:", err.message); // Виведення помилки хешування пароля
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Логін користувача
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    console.log("Request Data for Login:", { username, password }); // Виведення даних, які приходять у запиті

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const query = `SELECT id, password FROM Users WHERE username = ?`;

        db.get(query, [username], async (err, row) => {
            if (err) {
                console.error("Error during login:", err.message); // Виведення помилки в консоль
                return res.status(500).json({ message: "Error logging in", error: err.message });
            }

            if (!row) {
                console.log("User not found:", username); // Виведення повідомлення, якщо користувача не знайдено
                return res.status(404).json({ message: "User not found" });
            }

            console.log("User found:", row); // Виведення знайденого користувача

            const isPasswordValid = await bcrypt.compare(password, row.password);
            if (!isPasswordValid) {
                console.log("Invalid credentials for user:", username); // Виведення повідомлення, якщо пароль неправильний
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = generateToken(row.id);
            res.status(200).json({ token });
        });
    } catch (err) {
        console.error("Error comparing passwords:", err.message); // Виведення помилки при порівнянні паролів
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};

module.exports = { registerUser, loginUser };
