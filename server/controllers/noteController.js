const { db } = require("../config/db");

// Отримати всі нотатки користувача
const getNotes = async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `SELECT * FROM Notes WHERE userId = ?`;

        db.all(query, [userId], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching notes", error: err.message });
            }
            res.status(200).json(rows);
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes", error: err.message });
    }
};

// Створити нову нотатку
const createNote = async (req, res) => {
    const userId = req.user.id;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    try {
        const query = `INSERT INTO Notes (userId, title, content) VALUES (?, ?, ?)`;

        db.run(query, [userId, title, content], function (err) {
            if (err) {
                return res.status(500).json({ message: "Error creating note", error: err.message });
            }
            res.status(201).json({ message: "Note created successfully" });
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating note", error: err.message });
    }
};

const updateNote = async (req, res) => {
    const userId = req.user.id; // Ідентифікатор користувача
    const { id, title, content } = req.body; // Отримуємо id, title і content з тіла запиту

    // Перевірка, чи є всі необхідні параметри
    if (!id || !title || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const query = `UPDATE Notes SET title = ?, content = ? WHERE id = ? AND userId = ?`;

        db.run(query, [title, content, id, userId], function (err) {
            if (err) {
                return res.status(500).json({ message: "Error updating note", error: err.message });
            }
            res.status(200).json({ message: "Note updated successfully" });
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating note", error: err.message });
    }
};


// Видалити нотатку
const deleteNote = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const query = `DELETE FROM Notes WHERE id = ? AND userId = ?`;

        db.run(query, [id, userId], function (err) {
            if (err) {
                return res.status(500).json({ message: "Error deleting note", error: err.message });
            }
            res.status(200).json({ message: "Note deleted successfully" });
        });
    } catch (err) {
        res.status(500).json({ message: "Error deleting note", error: err.message });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
