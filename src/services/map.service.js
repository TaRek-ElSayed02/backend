const db = require('../../config/database');

class MapService {
  // Create a new map
  async createMap(mapData) {
    const sql = `INSERT INTO maps 
                (title, link, subdomain, active) 
                VALUES (?, ?, ?, ?)`;
    const values = [
      mapData.title,
      mapData.link,
      mapData.subdomain,
      mapData.active || 'yes' // Default to 'yes' if not provided
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all maps
  async getAllMaps() {
    const sql = `SELECT * FROM maps`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get maps by subdomain
  async getMapsBySubdomain(subdomain) {
    const sql = `SELECT * FROM maps WHERE subdomain = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Update map by ID (partial update)
  async updateMap(id, mapData) {
    let sql = `UPDATE maps SET `;
    const updates = [];
    const values = [];

    // Build dynamic query based on provided fields
    if (mapData.title !== undefined) {
      updates.push('title = ?');
      values.push(mapData.title);
    }
    if (mapData.link !== undefined) {
      updates.push('link = ?');
      values.push(mapData.link);
    }
    if (mapData.subdomain !== undefined) {
      updates.push('subdomain = ?');
      values.push(mapData.subdomain);
    }
    if (mapData.active !== undefined) {
      updates.push('active = ?');
      values.push(mapData.active);
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

  // Delete map by ID
  async deleteMap(id) {
    const sql = `DELETE FROM maps WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new MapService();