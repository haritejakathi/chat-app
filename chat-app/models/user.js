const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database(':memory:');

// Initialize user table
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        email TEXT
    )`);
});

// Register user
const registerUser = (username, password, email, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
        [username, hashedPassword, email],
        function (err) {
            callback(err, this.lastID);
        });
};

// Authenticate user
const authenticateUser = (username, password, callback) => {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) return callback(err);
        if (user && bcrypt.compareSync(password, user.password)) {
            callback(null, user);
        } else {
            callback(new Error('Invalid username or password'));
        }
    });
};

module.exports = {
    registerUser,
    authenticateUser
};

