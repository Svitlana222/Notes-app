const { db } = require("../config/db");

// Функція для створення нової нотатки
const createNote = (userId, title, content, callback) => {
    const query = `
        INSERT INTO Notes (userId, title, content)
        VALUES (?, ?, ?)
    `;
    db.run(query, [userId, title, content], function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { id: this.lastID });
        }
    });
};

// Функція для отримання нотаток користувача
const getNotesByUserId = (userId, callback) => {
    const query = `
        SELECT * FROM Notes
        WHERE userId = ?
    `;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Функція для отримання нотатки за її ID
const getNoteById = (id, callback) => {
    const query = `
        SELECT * FROM Notes
        WHERE id = ?
    `;
    db.get(query, [id], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};

// Функція для оновлення нотатки
const updateNote = (id, title, content, callback) => {
    const query = `
        UPDATE Notes
        SET title = ?, content = ?
        WHERE id = ?
    `;
    db.run(query, [title, content, id], function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { changes: this.changes });
        }
    });
};

// Функція для видалення нотатки
const deleteNote = (id, callback) => {
    const query = `
        DELETE FROM Notes
        WHERE id = ?
    `;
    db.run(query, [id], function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { changes: this.changes });
        }
    });
};

module.exports = {
    createNote,
    getNotesByUserId,
    getNoteById,
    updateNote,
    deleteNote,
};
