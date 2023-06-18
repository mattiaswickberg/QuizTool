const bcrypt = require('bcrypt');
const mariadb = require('mariadb');
const pool = require('../database/database');

class User {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }

  async save() {
    try {
      // Hash password before storing in database
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      let conn = await pool.getConnection();
      const res = await conn.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [this.username, this.password, this.role]
      );

      await conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  }

  static async findByUsername(username) {
    try {
      let conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      await conn.end();
      if (rows.length > 0) {
        return new User(rows[0].username, rows[0].password, rows[0].role);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
