const db = require('../../config/database');

class CommentsService {
  // Create a new comment
  async createComment(commentData) {
    const sql = `INSERT INTO comments 
                (comment, rate, subdomain, status) 
                VALUES (?, ?, ?, ?)`;
    const values = [
      commentData.comment,
      commentData.rate,
      commentData.subdomain,
      commentData.status || 'yes' // Default to 'yes' if not provided
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // Get all comments
  async getAllComments() {
    const sql = `SELECT * FROM comments`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Get comments by subdomain
  async getCommentsBySubdomain(subdomain) {
    const sql = `SELECT * FROM comments WHERE subdomain = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Update comment by ID (partial update)
  async updateComment(id, commentData) {
    let sql = `UPDATE comments SET `;
    const updates = [];
    const values = [];

    // Build dynamic query based on provided fields
    if (commentData.comment !== undefined) {
      updates.push('comment = ?');
      values.push(commentData.comment);
    }
    if (commentData.rate !== undefined) {
      updates.push('rate = ?');
      values.push(commentData.rate);
    }
    if (commentData.subdomain !== undefined) {
      updates.push('subdomain = ?');
      values.push(commentData.subdomain);
    }
    if (commentData.status !== undefined) {
      updates.push('status = ?');
      values.push(commentData.status);
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

  // Delete comment by ID
  async deleteComment(id) {
    const sql = `DELETE FROM comments WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = new CommentsService();