# دليل النشر — Nada Negm Website

## متطلبات النشر

- Node.js 20.9+
- حساب MongoDB Atlas
- حساب Cloudinary
- حساب Vercel (للنشر السريع)

---

## 1. إعداد قاعدة البيانات (MongoDB Atlas)

1. اذهب إلى [mongodb.com/atlas](https://mongodb.com/atlas) وأنشئ حساباً مجانياً
2. أنشئ Cluster جديد (M0 Free Tier يكفي للبداية)
3. في "Database Access" أنشئ مستخدماً بصلاحيات read/write
4. في "Network Access" أضف `0.0.0.0/0` للسماح بجميع الاتصالات
5. انسخ رابط الاتصال: `mongodb+srv://user:pass@cluster.mongodb.net/nada-negm`

---

## 2. إعداد Cloudinary

1. اذهب إلى [cloudinary.com](https://cloudinary.com) وأنشئ حساباً مجانياً
2. من Dashboard انسخ:
   - Cloud Name
   - API Key
   - API Secret

---

## 3. النشر على Vercel (الطريقة الأسهل)

```bash
# 1. رفع الكود على GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/nada-negm.git
git push -u origin main

# 2. اذهب إلى vercel.com وربط المستودع
# 3. أضف متغيرات البيئة في لوحة Vercel
```

### متغيرات البيئة على Vercel:
```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<32-char-random-string>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_EMAIL=nada@admin.com
ADMIN_PASSWORD=<na2026#>
```

لتوليد NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## 4. النشر على Hostinger VPS

```bash
# 1. تثبيت Node.js على السيرفر
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. تثبيت PM2
npm install -g pm2

# 3. نسخ الملفات للسيرفر
# استخدم Git أو FTP

# 4. تثبيت المتطلبات وبناء المشروع
npm install
npm run build

# 5. تشغيل مع PM2
pm2 start npm --name "nada-negm" -- start
pm2 startup
pm2 save

# 6. إعداد Nginx Reverse Proxy
sudo apt install nginx
```

Nginx config (`/etc/nginx/sites-available/nadanegm`):
```nginx
server {
    listen 80;
    server_name nadanegm.com www.nadanegm.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Video upload size
    client_max_body_size 500M;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/nadanegm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL مع Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d nadanegm.com -d www.nadanegm.com
```

---

## 5. إنشاء حساب المدير (أول مرة فقط)

بعد النشر، شغّل هذا الطلب مرة واحدة فقط:
```bash
curl -X POST https://yourdomain.com/api/setup
```

ثم سجّل الدخول على: `https://yourdomain.com/login`

---

## 6. تحديث الموقع

```bash
git pull origin main
npm install
npm run build
pm2 restart nada-negm
```

---

## أمان إضافي

- احذف أو عطّل نقطة `/api/setup` بعد الاستخدام
- فعّل 2FA على حسابات MongoDB Atlas وCloudinary
- راجع متغيرات البيئة ولا تشاركها مع أحد
