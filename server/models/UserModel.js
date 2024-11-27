const { db } = require("../config/db");

// Функція для створення нового користувача
const createUser = (username, password, email, callback) => {
    const query = `
        INSERT INTO Users (username, password, email)
        VALUES (?, ?, ?)
    `;
    db.run(query, [username, password, email], function (err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { id: this.lastID });
        }
    });
};

// Функція для пошуку користувача за іменем
const findUserByUsername = (username, callback) => {
    const query = `
        SELECT * FROM Users
        WHERE username = ?
    `;
    db.get(query, [username], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};

// Функція для пошуку користувача за ID
const findUserById = (id, callback) => {
    const query = `
        SELECT * FROM Users
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

module.exports = {
    createUser,
    findUserByUsername,
    findUserById,
};
