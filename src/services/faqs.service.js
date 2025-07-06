const db = require('../../config/database');

class FaqsService {
  // Create a new FAQ
  async createFaq(faqData) {
    const sql = `INSERT INTO faqs 
                (question, answer, subdomain, active) 
                VALUES (?, ?, ?, ?)`;
    const values = [
      faqData.question,
      faqData.answer,
      faqData.subdomain,
      faqData.active || 'yes' // Default to 'yes' if not provided
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all FAQs
  async getAllFaqs() {
    const sql = `SELECT * FROM faqs`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get FAQs by subdomain
  async getFaqsBySubdomain(subdomain) {
    const sql = `SELECT * FROM faqs WHERE subdomain = ? AND active = 'yes'`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Update FAQ by ID (partial update)
  async updateFaq(id, faqData) {
    let sql = `UPDATE faqs SET `;
    const updates = [];
    const values = [];

    // Build dynamic query based on provided fields
    if (faqData.question !== undefined) {
      updates.push('question = ?');
      values.push(faqData.question);
    }
    if (faqData.answer !== undefined) {
      updates.push('answer = ?');
      values.push(faqData.answer);
    }
    if (faqData.subdomain !== undefined) {
      updates.push('subdomain = ?');
      values.push(faqData.subdomain);
    }
    if (faqData.active !== undefined) {
      updates.push('active = ?');
      values.push(faqData.active);
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

  // Delete FAQ by ID
  async deleteFaq(id) {
    const sql = `DELETE FROM faqs WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new FaqsService();