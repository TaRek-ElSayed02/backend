const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/database');

exports.login = async (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM admins WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) return reject(err);
      if (results.length === 0) return reject(new Error('Invalid email or password'));

      const admin = results[0];
      const isMatch = await bcrypt.compare(password, admin.password.replace('$2y$', '$2b$'));
      if (!isMatch) return reject(new Error('Invalid email or password'));

      const token = jwt.sign({ adminId: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      resolve({
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email
        }
      });
    });
  });
};
