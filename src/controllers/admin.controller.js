

// const adminService = require('../services/admin.service');
// const jwt = require('jsonwebtoken');

// exports.loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const { token, admin } = await adminService.login(email, password);

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: false, // true in production
//       sameSite: 'lax',
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.json({ message: 'تم تسجيل الدخول بنجاح', admin });
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// };

// exports.checkAuth = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ error: 'غير مصرح' });

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     res.status(200).json({ message: 'مصرح' });
//   } catch {
//     res.status(401).json({ error: 'توكين غير صالح' });
//   }
// };
// exports.logoutAdmin = (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: false, // should be true in production if using HTTPS
//     sameSite: 'lax',
//     domain : '.localhost'
//   });
//   res.json({ message: 'تم تسجيل الخروج بنجاح' });
// };

// const adminService = require('../services/admin.service');
// const jwt = require('jsonwebtoken');

// // Environment check

// exports.loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const { token, admin } = await adminService.login(email, password);

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: true, // true in production
//       // sameSite: 'none', //prod
//       sameSite: 'lax', //dev
//       domain: 'localhost',
//       // domain: 'most3lm.online',
//       maxAge: 24 * 60 * 60 * 1000,
//       path: '/admin/login'
//     });

//     res.json({ message: 'تم تسجيل الدخول بنجاح', admin });
//   } catch (err) {
//     res.status(401).json({ error: err.message });
//   }
// };

// exports.checkAuth = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ error: 'غير مصرح' });

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     res.status(200).json({ message: 'مصرح' });
//   } catch {
//     res.status(401).json({ error: 'توكين غير صالح' });
//   }
// };

// exports.logoutAdmin = (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'lax', //dev
//     // sameSite: 'none', //prod
//     domain: 'localhost',
//     // domain: 'most3lm.online',
//     path: '/admin/login'
//   });
//   res.json({ message: 'تم تسجيل الخروج بنجاح' });
// };

const adminService = require('../services/admin.service');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { token, admin } = await adminService.login(email, password);
    // const isProduction = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: isProduction ? 'most3lm.online' : undefined,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ message: 'تم تسجيل الدخول بنجاح', admin });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.checkAuth = (req, res) => {
  // ... (لا يحتاج تعديل)
};

exports.logoutAdmin = (req, res) => {
  // const isProduction = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    domain: isProduction ? 'most3lm.online' : undefined,
    path: '/',
  });
  
  res.json({ message: 'تم تسجيل الخروج بنجاح' });
};