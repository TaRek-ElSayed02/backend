const db = require('../../config/database');

class SocialMediaService {
  // Create a new social media link
  async createSocialMedia(socialMediaData) {
    const sql = `INSERT INTO social_media 
                (platform_name, link, subdomain, icon) 
                VALUES (?, ?, ?, ?)`;
    const values = [
      socialMediaData.platform_name,
      socialMediaData.link,
      socialMediaData.subdomain,
      socialMediaData.icon || null // Default to null if not provided
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all social media links
  async getAllSocialMedia() {
    const sql = `SELECT * FROM social_media`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get social media by subdomain
  async getSocialMediaBySubdomain(subdomain) {
    const sql = `SELECT * FROM social_media WHERE subdomain = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Update social media by ID (partial update)
  async updateSocialMedia(id, socialMediaData) {
    let sql = `UPDATE social_media SET `;
    const updates = [];
    const values = [];

    // Build dynamic query based on provided fields
    if (socialMediaData.platform_name !== undefined) {
      updates.push('platform_name = ?');
      values.push(socialMediaData.platform_name);
    }
    if (socialMediaData.link !== undefined) {
      updates.push('link = ?');
      values.push(socialMediaData.link);
    }
    if (socialMediaData.subdomain !== undefined) {
      updates.push('subdomain = ?');
      values.push(socialMediaData.subdomain);
    }
    if (socialMediaData.icon !== undefined) {
      updates.push('icon = ?');
      values.push(socialMediaData.icon);
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

  // Delete social media by ID
  async deleteSocialMedia(id) {
    const sql = `DELETE FROM social_media WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new SocialMediaService();