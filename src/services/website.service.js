const db = require('../../config/database'); // assuming your connection file is in config/database.js

class WebsiteService {
  // Create a new website
  async createWebsite(websiteData) {
    const sql = `INSERT INTO website (subdomain, web_title, img_hero, img_hero_mime_type, desc_hero, whats_phone, content, scema, country, specialist) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      websiteData.subdomain,
      websiteData.web_title,
      websiteData.img_hero || null,
      websiteData.img_hero_mime_type || null,
      websiteData.desc_hero,
      websiteData.whats_phone,
      websiteData.content,
      websiteData.scema || null,
      websiteData.country,
      websiteData.specialist
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all websites
  async getAllWebsites() {
    const sql = `SELECT * FROM website`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get website by subdomain
  async getWebsiteBySubdomain(subdomain) {
    const sql = `SELECT * FROM website WHERE subdomain = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  // Update website by subdomain
  async updateWebsite(subdomain, websiteData) {
    // بناء الاستعلام ديناميكياً بناءً على الحقول المرسلة فقط
    let sql = 'UPDATE website SET ';
    const updates = [];
    const values = [];
  
    // إضافة الحقول المرسلة فقط
    if (websiteData.web_title !== undefined) {
      updates.push('web_title = ?');
      values.push(websiteData.web_title);
    }
    if (websiteData.img_hero !== undefined) {
      updates.push('img_hero = ?');
      values.push(websiteData.img_hero);
    }
    if (websiteData.img_hero_mime_type !== undefined) {
      updates.push('img_hero_mime_type = ?');
      values.push(websiteData.img_hero_mime_type);
    }
    if (websiteData.desc_hero !== undefined) {
      updates.push('desc_hero = ?');
      values.push(websiteData.desc_hero);
    }
    if (websiteData.whats_phone !== undefined) {
      updates.push('whats_phone = ?');
      values.push(websiteData.whats_phone);
    }
    if (websiteData.content !== undefined) {
      updates.push('content = ?');
      values.push(websiteData.content);
    }
    if (websiteData.scema !== undefined) {
      updates.push('scema = ?');
      values.push(websiteData.scema);
    }
    if (websiteData.country !== undefined) {
      updates.push('country = ?');
      values.push(websiteData.country);
    }
    if (websiteData.specialist !== undefined) {
      updates.push('specialist = ?');
      values.push(websiteData.specialist);
    }
  
    // إذا لم يتم إرسال أي حقول للتحديث
    if (updates.length === 0) {
      throw new Error('No fields to update');
    }
  
    sql += updates.join(', ');
    sql += ' WHERE subdomain = ?';
    values.push(subdomain);
  
    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  // Delete website by subdomain
  async deleteWebsite(subdomain) {
    const sql = `DELETE FROM website WHERE subdomain = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new WebsiteService();