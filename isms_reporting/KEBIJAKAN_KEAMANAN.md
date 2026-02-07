# Dokumen Kebijakan Keamanan Informasi
## Sistem Informasi Tesso Nilo

### 1. Kebijakan Kontrol Akses (Access Control Policy)
- Setiap pengguna wajib memiliki akun unik berbasis email/username.
- Password minimal 8 karakter dengan kombinasi alfanumerik.
- Akses ke area Administrator dibatasi hanya untuk staf resmi yang terdaftar.
- Sesi pengguna akan berakhir secara otomatis setelah 24 jam tidak aktif.

### 2. Kebijakan Kriptografi (Cryptography Policy)
- Segala bentuk password di database wajib menggunakan algoritma hashing standar industri (BCrypt).
- Data sensitif seperti bukti pembayaran tidak boleh disimpan dalam format teks polos.
- Akses ke server database wajib menggunakan koneksi terenkripsi.

### 3. Kebijakan Keamanan Jaringan (Network Security Policy)
- Server harus menggunakan sertifikat SSL (HTTPS) untuk enkripsi lalu lintas data.
- Port yang tidak digunakan pada server wajib ditutup.
- IP monitoring harus diterapkan untuk mencegah akses berulang dari bot.

### 4. Kebijakan Manajemen Insiden (Incident Management Policy)
- Segala bentuk kegagalan sistem atau anomali (login gagal berulang) wajib dicatat dalam log.
- Pengguna dapat melaporkan kerentanan melalui kanal yang disediakan.
- Tim teknis wajib merespons laporan insiden maksimal dalam 2x24 jam.

### 5. Kebijakan Perlindungan Data (Data Protection Policy)
- Data pribadi pengguna tidak boleh dibagikan kepada pihak ketiga tanpa izin.
- Pencadangan (backup) database dilakukan secara berkala (mingguan/bulanan).
- Pemusnahan data lama dilakukan jika sudah tidak relevan dengan kebutuhan sistem.

---
**Ditetapkan pada:** 2 Feb 2026
**Oleh:** Tim Keamanan Informasi Tesso Nilo
