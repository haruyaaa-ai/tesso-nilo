# Statement of Applicability (SoA) - ISO/IEC 27001:2022
## Proyek: Sistem Informasi Tesso Nilo

| Kode Kontrol | Nama Kontrol | Status | Justifikasi | Bukti Implementasi |
|--------------|--------------|--------|--------------|-------------------|
| A.5.15 | Access Control | Implemented | Memastikan hanya user yang sah yang dapat mengakses fitur tertentu | Script `api/auth/login.php` dengan pengecekan role |
| A.8.24 | Cryptography | Implemented | Melindungi data kredensial user agar tidak terbaca jika DB bocor | Penggunaan `password_hash()` dan `password_verify()` (BCrypt) |
| A.8.20 | Network Security | Not Implemented | Saat ini masih menggunakan default web server port | Direncanakan menggunakan SSL/HTTPS dan Firewall |
| A.5.7 | Threat Intelligence | Implemented | Pemantauan log login untuk mendeteksi anomali | File `api/auth/debug_login.log` |
| A.8.1 | User Endpoint Devices| Implemented | Penggunaan browser modern dengan kebijakan keamanan session | Pengaturan `session_start()` dan cookie secure |
| A.8.12 | Data Leakage Prevention | Implemented | Membatasi error message agar tidak menampilkan info teknis | `ini_set('display_errors', 0)` di production files |
| A.8.28 | Secure Coding | Implemented | Melakukan validasi input dan penggunaan Prepared Statements | Implementasi `$stmt->prepare()` pada query database |
| A.5.24 | Info Sec Incident Mgmt | Implemented | Prosedur pelaporan masalah keamanan melalui menu admin | Dashboard reservasi untuk memantau aktivitas mencurigakan |
| A.8.10 | Information Deletion | Implemented | Memberikan fitur hapus data (soft/hard delete) bagi admin | Menu manajemen data di dashboard |
| A.8.3 | Information Access Restriction | Implemented | Filter akses API berdasarkan session role | Pengecekan `$_SESSION['role'] === 'admin'` pada dashboard |
