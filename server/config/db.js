const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Шлях до бази даних SQLite
const dbPath = path.resolve(__dirname, "database.sqlite");

// Підключення до бази даних SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Створення таблиць, якщо вони ще не існують
db.serialize(() => {
    // Створення таблиці Users, якщо її ще немає
    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating Users table:", err.message);
        } else {
            console.log("Users table is ready.");
        }
    });

    // Створення таблиці Notes, якщо її ще немає
    db.run(`
        CREATE TABLE IF NOT EXISTS Notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            title TEXT NOT NULL,
            content TEXT,
            FOREIGN KEY(userId) REFERENCES Users(id)
        )
    `, (err) => {
        if (err) {
            console.error("Error creating Notes table:", err.message);
        } else {
            console.log("Notes table is ready.");
        }
    });
});

module.exports = { db };
