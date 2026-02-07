# Tabel Risiko Keamanan Informasi
## Proyek: Sistem Informasi Tesso Nilo (tessonilov3)

| No | Aset | Ancaman | Kerentanan | Dampak | Level Risiko | Rencana Mitigasi |
|----|------|---------|------------|--------|--------------|------------------|
| 1 | Database User (Data Pribadi) | Akses tidak sah oleh hacker | Kelemahan pada autentikasi atau SQL Injection | Kebocoran data privasi | High | Implementasi Prepared Statements (PDO/MySQLi), Hashing BCrypt, dan Pengaturan Hak Akses Database |
| 2 | Sistem Aplikasi (Web) | Serangan Brute Force pada Login | Belum ada Limit Attempt atau CAPTCHA | Akun admin/user diambil alih | Medium | Penambahan mitigasi delay (usleep) dan implementasi kebijakan password kuat |
| 3 | Data Reservasi (Tiket) | Manipulasi Data Pembayaran | Kurangnya validasi sisi server pada proses update status | Kerugian finansial (tiket gratis) | High | Validasi bukti pembayaran secara manual oleh admin dan integrasi API Payment Gateway resmi |
| 4 | Infrastruktur Server | Serangan DDoS | Server tidak memiliki perlindungan Rate Limiting | Layanan tidak dapat diakses (Down) | Medium | Implementasi Rate Limiting via Web Server (Cloudflare/Nginx) dan monitoring server |
| 5 | Akun Admin | Phishing / Social Engineering | Kelalaian manusia dalam menjaga kredensial | Kontrol penuh sistem jatuh ke pihak luar | High | Pelatihan kesadaran keamanan bagi admin dan implementasi Multi-Factor Authentication (MFA) |
| 6 | File Upload (Payment Proof) | Unggahan file jahat (Web Shell) | Kurangnya validasi ekstensi file pada folder uploads | Remote Code Execution (RCE) | High | Validasi tipe file (MIME type) dan rename file secara otomatis saat diunggah |

### Penilaian Level Risiko:
- **Low**: Dampak minimal, kemungkinan kecil.
- **Medium**: Dampak moderat, kemungkinan sedang.
- **High**: Dampak besar pada operasional dan reputasi, kemungkinan terjadi.
