

const db = require('../../config/database');

class ArticleService {
  async createArticle(articleData) {
    const sql = `INSERT INTO article 
                (article_title, article_content, subdomain, scema, img_article, img_article_mime_type) 
                VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      articleData.article_title,
      articleData.article_content,
      articleData.subdomain,
      articleData.scema || '{}',
      articleData.img_article || null,
      articleData.img_article_mime_type || null
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async getAllArticles() {
    const sql = `SELECT * FROM article`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async getArticlesBySubdomain(subdomain) {
    const sql = `SELECT * FROM article WHERE subdomain = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [subdomain], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  async updateArticle(id, articleData) {
    let sql = `UPDATE article SET `;
    const updates = [];
    const values = [];

    if (articleData.article_title !== undefined) {
      updates.push('article_title = ?');
      values.push(articleData.article_title);
    }
    if (articleData.article_content !== undefined) {
      updates.push('article_content = ?');
      values.push(articleData.article_content);
    }
    if (articleData.subdomain !== undefined) {
      updates.push('subdomain = ?');
      values.push(articleData.subdomain);
    }
    if (articleData.scema !== undefined) {
      updates.push('scema = ?');
      values.push(articleData.scema);
    }
    if (articleData.img_article !== undefined) {
      updates.push('img_article = ?');
      values.push(articleData.img_article);
    }
    if (articleData.img_article_mime_type !== undefined) {
      updates.push('img_article_mime_type = ?');
      values.push(articleData.img_article_mime_type);
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

  async deleteArticle(id) {
    const sql = `DELETE FROM article WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async getArticleById(id) {
    const sql = `SELECT * FROM article WHERE id = ? LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      });
    });
  }
  
}





module.exports = new ArticleService();
