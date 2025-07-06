const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');


const adminRoutes = require('./src/routes/admin.route');
const websiteRoutes = require('./src/routes/website.route');
const articleRoutes = require('./src/routes/article.route');
const mapRoutes = require('./src/routes/map.route');
const commentRoutes = require('./src/routes/comments.route');
const faqsRoutes = require('./src/routes/faqs.route');
const menuRoutes = require('./src/routes/menu.route');
const timesRoutes = require('./src/routes/times.route');
const socialMediaRoutes = require('./src/routes/social_media.route');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: [/\.localhost:3000$/, 'http://localhost:3001' ,'http://localhost:3000' ,'https://most3lm.online' ,' https://e78b-156-197-214-175.ngrok-free.app', 'https://mst3lm.vercel.app','https://mst3lm-7lzh4u6fx-tarek-elsayeds-projects-2ec3f1c7.vercel.app' ],
  credentials: true,
}));
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://most3lm.online' ],
//   credentials: true,
// }));
app.use(cookieParser());
app.use(express.json());
// app.use(fileUpload());  
app.use(fileUpload({
  useTempFiles: false, // لا نستخدم ملفات مؤقتة
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB كحد أقصى
  abortOnLimit: true // إلغاء الطلب إذا تجاوز الحد
}));

// Routes العامة
app.use('/api/admins', adminRoutes);
app.use('/api/websites', websiteRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/times', timesRoutes);
app.use('/api/social_media', socialMediaRoutes);



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
});