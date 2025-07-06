const db = require('../../config/database');

class MenuService {
  // Create a new menu item
  async createMenuItem(menuData) {
    const sql = `INSERT INTO menu 
                (name, description, type, price, active, subdomain) 
                VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      menuData.name,
      menuData.description,
      menuData.type,
      menuData.price,
      menuData.active || 'yes', // Default to 'yes' if not provided
      menuData.subdomain
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all menu items
  async getAllMenuItems() {
    const sql = `SELECT * FROM menu`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get menu items by subdomain
  async getMenuItemsBySubdomain(subdomain) {
    const sql = `SELECT * FROM menu WHERE subdomain = ? AND active = 'yes'`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Update menu item by ID (partial update)
  async updateMenuItem(id, menuData) {
    let sql = `UPDATE menu SET `;
    const updates = [];
    const values = [];

    // Build dynamic query based on provided fields
    if (menuData.name !== undefined) {
      updates.push('name = ?');
      values.push(menuData.name);
    }
    if (menuData.description !== undefined) {
      updates.push('description = ?');
      values.push(menuData.description);
    }
    if (menuData.type !== undefined) {
      updates.push('type = ?');
      values.push(menuData.type);
    }
    if (menuData.price !== undefined) {
      updates.push('price = ?');
      values.push(menuData.price);
    }
    if (menuData.active !== undefined) {
      updates.push('active = ?');
      values.push(menuData.active);
    }
    if (menuData.subdomain !== undefined) {
      updates.push('subdomain = ?');
      values.push(menuData.subdomain);
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

  // Delete menu item by ID
  async deleteMenuItem(id) {
    const sql = `DELETE FROM menu WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new MenuService();