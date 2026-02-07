# 🌿 Taman Nasional Tesso Nilo - Sistem Manajemen Tiket & Berita

<div align="center">

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](#)
[![Version](https://img.shields.io/badge/Version-1.1.0-blue)](#)
[![PHP](https://img.shields.io/badge/PHP-7.4+-purple)](#)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-orange)](#)

**Sistem informasi lengkap untuk pengelolaan tiket wisata dan berita Taman Nasional Tesso Nilo**

🔗 **Live Demo**: [**http://tessoniloproject.my.id/**](http://tessoniloproject.my.id/)

</div>

---

## 📋 Deskripsi Proyek

Sistem Manajemen Taman Nasional Tesso Nilo adalah aplikasi web full-stack yang menyediakan:
- **Portal Informasi Publik** - Informasi tentang taman nasional, flora, fauna, dan berita terkini
- **Sistem Pemesanan Tiket Online** - Memungkinkan pengunjung memesan tiket secara mandiri
- **Dashboard Admin** - Pengelolaan berita, reservasi, dan laporan untuk administrator
- **Integrasi Payment Gateway** - Mendukung pembayaran online via Midtrans

Proyek ini dikembangkan sebagai bagian dari tugas akademik Program Studi Teknik Informatika.

---

## 🌐 Akses Live Demo

| Halaman | URL | Keterangan |
|---------|-----|------------|
| 🏠 **Homepage** | [tessoniloproject.my.id](http://tessoniloproject.my.id/) | Halaman utama website |
| 🔐 **Login** | [tessoniloproject.my.id/login.html](http://tessoniloproject.my.id/login.html) | Login admin/customer |
| 📝 **Register** | [tessoniloproject.my.id/register.html](http://tessoniloproject.my.id/register.html) | Daftar akun baru |
| 🎫 **Booking** | [tessoniloproject.my.id/booking.html](http://tessoniloproject.my.id/booking.html) | Pemesanan tiket |
| 📊 **Dashboard** | [tessoniloproject.my.id/dashboard.html](http://tessoniloproject.my.id/dashboard.html) | Panel admin |
| 📰 **Berita** | [tessoniloproject.my.id/berita.html](http://tessoniloproject.my.id/berita.html) | Daftar berita |
| ℹ️ **About** | [tessoniloproject.my.id/about.html](http://tessoniloproject.my.id/about.html) | Tentang taman nasional |
| 🐘 **Spesies** | [tessoniloproject.my.id/spesies.html](http://tessoniloproject.my.id/spesies.html) | Informasi flora & fauna |

### 🔑 Kredensial Demo

| Role | Username | Password | Akses |
|------|----------|----------|-------|
| **Admin** | `admin` | `admin123` | Dashboard, CRUD Berita, Kelola Reservasi, Export Laporan |
| **Customer** | *(Daftar sendiri)* | - | Booking tiket, Lihat riwayat pemesanan |

---

## 🛠️ Technology Stack

### Frontend
| Teknologi | Kegunaan |
|-----------|----------|
| HTML5 | Struktur halaman |
| CSS3 + Tailwind CSS | Styling & responsiveness |
| JavaScript (Vanilla) | Interaktivitas & API calls |
| Chart.js | Visualisasi data dashboard |
| Lucide Icons | Ikon UI |

### Backend
| Teknologi | Kegunaan |
|-----------|----------|
| PHP 7.4+ | Server-side logic |
| MySQL 5.7+ | Database management |
| RESTful API | Komunikasi frontend-backend |
| Session Management | Autentikasi pengguna |

### Infrastruktur
| Komponen | Detail |
|----------|--------|
| Web Server | Apache (XAMPP/Production) |
| Domain | tessoniloproject.my.id |
| SSL | HTTPS enabled |
| Payment Gateway | Midtrans Integration |

---

## 🚀 Quick Start

### Opsi 1: Akses Live (Recommended)
Langsung akses website yang sudah live di:
```
🔗 http://tessoniloproject.my.id/
```

### Opsi 2: Setup Lokal (Development)

#### Prerequisite
- XAMPP (Apache + MySQL + PHP 7.4+)
- Browser modern (Chrome, Firefox, Edge)

#### Langkah Instalasi
```bash
# 1. Clone/Extract ke folder htdocs
C:\xampp\htdocs\tessonilov3\

# 2. Start XAMPP (Apache & MySQL)

# 3. Inisialisasi Database
http://localhost/tessonilov3/api/init_db.php

# 4. Login Admin
http://localhost/tessonilov3/login.html
Username: admin
Password: admin123
```

---

## ✨ Fitur Utama

### Admin Dashboard
- 📊 **Statistics**: Total users, reservasi, revenue, news
- 📰 **Berita Management**: CRUD berita/laporan
- 🎫 **Reservasi Management**: Manage customer bookings
- 📊 **Reports**: Export CSV/JSON
- 👤 **Profile**: View admin info

### Customer Booking
- ✍️ **Easy Booking**: Simple form untuk pesan tiket
- 📅 **Date Selection**: Pilih tanggal kunjungan
- 🎟️ **Flexible Quantity**: Sesuaikan jumlah tiket
- ✅ **Confirmation**: Review sebelum submit
- 📋 **History**: Lihat riwayat pemesanan

### Security
- 🔐 **Authentication**: Secure login dengan session management
- 🔒 **Authorization**: Role-based access control
- 🛡️ **Input Validation**: Protection against injection attacks
- ⏱️ **Session Timeout**: 1 hour auto-logout
- 🍪 **Secure Cookies**: HttpOnly flag enabled

---

## 📁 Folder Structure

```
tessonilov3/
├── api/                    # Backend REST API
│   ├── auth/              # Login, Register, Session
│   ├── berita/            # News CRUD
│   ├── reservasi/         # Booking CRUD
│   ├── dashboard/         # Admin statistics
│   ├── report/            # Export functionality
│   └── init_db.php        # Database initialization
├── config/
│   └── database.php       # DB config & helpers
├── dashboard.html         # Admin panel
├── booking.html           # Customer booking page
├── login.html            # Login page
├── register.html         # Registration page
├── index.html            # Home page
├── berita.html           # News list
├── about.html            # About page
├── fauna.html            # Wildlife page
├── style.css             # Styling
├── script.js             # Frontend logic
├── DOKUMENTASI.md        # Full documentation
└── README.md             # This file
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login.php` - User login
- `POST /api/auth/register.php` - User registration
- `GET /api/auth/check_session.php` - Verify session
- `GET /api/auth/logout.php` - Logout

### Berita (News)
- `POST /api/berita/create.php` - Create news (admin)
- `GET /api/berita/read.php` - Get news list
- `GET /api/berita/read.php?id=1` - Get single news
- `PUT /api/berita/update.php` - Update news (admin)
- `DELETE /api/berita/delete.php` - Delete news (admin)

### Reservasi (Booking)
- `POST /api/reservasi/create.php` - Create booking
- `GET /api/reservasi/read.php` - Get bookings
- `GET /api/reservasi/read.php?id=1` - Get single booking
- `PUT /api/reservasi/update.php` - Update booking
- `DELETE /api/reservasi/delete.php` - Delete booking

### Dashboard & Reports
- `GET /api/dashboard/statistics.php` - Get statistics (admin)
- `GET /api/report/export.php?type=X&format=Y` - Export data (admin)

---

## 📊 Default Credentials

### Admin Account
- **Username**: admin
- **Password**: admin123
- **Email**: admin@tessonilo.com
- **Role**: Administrator

*Note: Ganti password admin setelah login pertama*

---

## 🔐 Default Ticket Prices

| Type | Price | Description |
|------|-------|-------------|
| Dewasa | Rp 150.000 | Untuk wisatawan dewasa |
| Anak-anak | Rp 100.000 | Untuk anak usia 5-12 tahun |
| Pelajar | Rp 125.000 | Dengan kartu pelajar valid |
| Rombongan | Rp 125.000 | Minimal 10 orang |

---

## 🧪 Testing Checklist

### User Registration
- [ ] Register dengan data valid
- [ ] Register dengan username duplicate (error)
- [ ] Register dengan email duplicate (error)
- [ ] Verify data tersimpan di database

### User Login
- [ ] Login admin berhasil
- [ ] Login customer berhasil
- [ ] Login dengan password salah (error)
- [ ] Session created & cookie set

### Admin Functions
- [ ] Create berita ✓
- [ ] Edit berita ✓
- [ ] Delete berita ✓
- [ ] View reservasi ✓
- [ ] Update reservasi status ✓
- [ ] Export CSV ✓
- [ ] Export JSON ✓
- [ ] View statistics ✓

### Customer Functions
- [ ] Create reservasi ✓
- [ ] View own reservasi ✓
- [ ] See booking history ✓
- [ ] Cannot edit others' reservasi ✓

### Security
- [ ] Session timeout after 1 hour
- [ ] Logout clears session
- [ ] Cannot access admin panel without login
- [ ] Cannot access booking without login
- [ ] CORS enabled for API

---

## ⚙️ Configuration

### Database Settings
File: `config/database.php`

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'tesso_nilo_db');
```

### Session Timeout
Default: 3600 detik (1 jam)
File: `config/database.php` line 16

### API Base URL
Frontend: `/tessonilov3/api`
Update di masing-masing HTML file jika berubah path

---

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

Menggunakan Tailwind CSS untuk responsive utilities

---

## 🌐 Browser Support

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📦 Dependencies

### Frontend
- Tailwind CSS (CDN)
- Lucide Icons (CDN)
- Chart.js (untuk dashboard charts)
- Vanilla JavaScript (no framework)

### Backend
- PHP 7.4+ (built-in)
- MySQL 5.7+ (with mysqli)

### Server
- Apache (XAMPP included)
- CORS enabled
- Prepared statements (security)

---

## 🔧 Maintenance

### Regular Tasks
- [ ] Check session logs monthly
- [ ] Backup database weekly
- [ ] Monitor API performance
- [ ] Update password policies
- [ ] Review access logs

### Database Optimization
```sql
-- Check database size
SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.tables
WHERE table_schema = 'tesso_nilo_db';

-- Optimize tables
OPTIMIZE TABLE users, berita, reservasi, ticket_pricing;
```

---

## 🐛 Known Issues & Solutions

| Issue | Solution |
|-------|----------|
| Database not initializing | Verify MySQL running + phpMyAdmin accessible |
| Session expired too fast | Check server time + PHP session.gc_maxlifetime |
| Images not loading | CDN might be blocked, use local images |
| Charts not showing | Ensure Chart.js CDN accessible |
| API CORS error | Check browser console, verify CORS headers |

---

## 📚 Documentation

Dokumentasi lengkap tersedia di: [`DOKUMENTASI.md`](./DOKUMENTASI.md)

Sections:
- Architecture & Design
- Complete API Reference
- User Guide (Admin & Customer)
- Database Schema
- Security Implementation
- Troubleshooting Guide

---

## 📸 Screenshots

### Homepage
Tampilan utama website dengan informasi Taman Nasional Tesso Nilo, fitur unggulan, dan navigasi ke berbagai halaman.

### Dashboard Admin
Panel administrasi dengan statistik real-time, grafik pendapatan, dan manajemen data.

### Halaman Booking
Form pemesanan tiket dengan kalkulasi harga otomatis dan konfirmasi pembayaran.

### Halaman Berita
Daftar berita dan informasi terkini tentang kegiatan konservasi.

> 💡 **Tip**: Kunjungi [tessoniloproject.my.id](http://tessoniloproject.my.id/) untuk melihat tampilan live!

---

## 🚀 Deployment

### Production Server
Website ini sudah di-deploy dan dapat diakses di:
- **URL**: [http://tessoniloproject.my.id/](http://tessoniloproject.my.id/)
- **Hosting**: ArenHost Indonesia
- **Database**: MySQL Remote
- **SSL**: Tersedia

### Local Development
Untuk pengembangan lokal, gunakan XAMPP dengan konfigurasi standar.

---

## 🎯 Fitur yang Sudah Diimplementasikan

- [x] ✅ Payment gateway integration (Midtrans)
- [x] ✅ Backend & Frontend terintegrasi
- [x] ✅ Dashboard Admin lengkap
- [x] ✅ CRUD Berita & Reservasi
- [x] ✅ Session Management
- [x] ✅ Role-based Access Control
- [x] ✅ Export CSV/JSON/PDF
- [x] ✅ Responsive Design
- [ ] 🔄 Email notification system
- [ ] 🔄 SMS alerts
- [ ] 🔄 Mobile app

---

## 📝 License & Credits

<div align="center">

### Informasi Proyek

| Keterangan | Detail |
|------------|--------|
| **Nama Proyek** | Sistem Manajemen Taman Nasional Tesso Nilo |
| **Versi** | 1.1.0 |
| **Tanggal Rilis** | 7 Februari 2026 |
| **Author** | Damar Satriatama Putra |
| **NIM** | 23552011300 |
| **Program Studi** | Teknik Informatika |
| **Kelas** | RP 23 CNS A |
| **Live URL** | [tessoniloproject.my.id](http://tessoniloproject.my.id/) |

</div>

---

## 📞 Support & Contact

Untuk bantuan atau pertanyaan:

| Kontak | Detail |
|--------|--------|
| 🌐 **Website** | [tessoniloproject.my.id](http://tessoniloproject.my.id/) |
| 📧 **Email** | admin@tessonilo.com |
| 📞 **Phone** | +62-761-2345678 |
| 📍 **Lokasi** | Taman Nasional Tesso Nilo, Riau, Indonesia |

---

## 📚 Dokumentasi Lengkap

| Dokumen | Deskripsi |
|---------|-----------|
| [DOKUMENTASI.md](./DOKUMENTASI.md) | Dokumentasi teknis lengkap |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Ringkasan proyek |
| [REQUIREMENT_CHECKLIST.md](./REQUIREMENT_CHECKLIST.md) | Checklist requirement |
| [TESTING_GUIDE.md](./TESTING_GUIDE.md) | Panduan testing |
| [SETUP_LOGIN_GUIDE.md](./SETUP_LOGIN_GUIDE.md) | Panduan setup & login |
| [CUSTOMER_FLOW_GUIDE.md](./CUSTOMER_FLOW_GUIDE.md) | Alur customer |

---

<div align="center">

### 🌿 Taman Nasional Tesso Nilo 🐘

*Konservasi Alam untuk Generasi Mendatang*

**[🔗 Kunjungi Website](http://tessoniloproject.my.id/)**

---

⭐ **Jika proyek ini bermanfaat, silakan berikan ⭐ Star!**

Made with ❤️ by Damar Satriatama Putra

</div>

