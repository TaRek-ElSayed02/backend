const db = require('../../config/database');

class TimesService {
  // Create a new time availability
  async createTime(timeData) {
    const sql = `INSERT INTO times 
                (time_available, day_available, subdomain, active) 
                VALUES (?, ?, ?, ?)`;
    const values = [
      timeData.time_available,
      timeData.day_available,
      timeData.subdomain,
      timeData.active || 'yes' // Default to 'yes' if not provided
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all time availabilities
  async getAllTimes() {
    const sql = `SELECT * FROM times`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get times by subdomain
  async getTimesBySubdomain(subdomain) {
    const sql = `SELECT * FROM times WHERE subdomain = ? AND active = 'yes'`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Update time availability by ID (partial update)
  async updateTime(id, timeData) {
    let sql = `UPDATE times SET `;
    const updates = [];
    const values = [];

    // Build dynamic query based on provided fields
    if (timeData.time_available !== undefined) {
      updates.push('time_available = ?');
      values.push(timeData.time_available);
    }
    if (timeData.day_available !== undefined) {
      updates.push('day_available = ?');
      values.push(timeData.day_available);
    }
    if (timeData.subdomain !== undefined) {
      updates.push('subdomain = ?');
      values.push(timeData.subdomain);
    }
    if (timeData.active !== undefined) {
      updates.push('active = ?');
      values.push(timeData.active);
    }

    if (updates.length === 0) {
      throw new Error('No fields to update');
    }

    sql += updates.join(', ');
    sql += ' WHERE id = ?';
    values.push(id);

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Delete time availability by ID
  async deleteTime(id) {
    const sql = `DELETE FROM times WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new TimesService();