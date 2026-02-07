# LAPORAN PENERAPAN MANAJEMEN KEAMANAN INFORMASI (ISMS) 
## BERBASIS ISO/IEC 27001:2022

**Judul Laporan:** Penerapan ISMS pada Sistem Informasi Ekowisata Tesso Nilo  
**Nama Mahasiswa:** [NAMA MAHASISWA]  
**NIM:** [NIM]  
**Program Studi:** Teknik Informatika / Sistem Informasi  
**Mata Kuliah:** Keamanan Informasi  
**Tahun Akademik:** 2023/2024 (Semester Ganjil)

---

### ABSTRAK
Proyek ini membahas penerapan Sistem Manajemen Keamanan Informasi (ISMS) berbasis standar internasional ISO/IEC 27001:2022 pada aplikasi web "Tesso Nilo". Latar belakang proyek ini didasari oleh meningkatnya ancaman siber terhadap data pengguna dan transaksi reservasi online. Tujuan utama penerapan ISMS adalah untuk menjaga kerahasiaan (Confidentiality), integritas (Integrity), dan ketersediaan (Availability) aset informasi. Metode yang digunakan mencakup identifikasi aset, analisis risiko, serta pemetaan kontrol keamanan melalui Statement of Applicability (SoA). Hasil penelitian menunjukkan bahwa implementasi kontrol teknis seperti hashing BCrypt, Prepared Statements, dan kontrol akses berbasis peran (RBAC) mampu menurunkan level risiko dari High ke Medium/Low. Kesimpulannya, kepatuhan terhadap standar ISO 27001 meningkatkan kepercayaan pengguna dan keamanan operasional sistem secara keseluruhan.

---

### DAFTAR ISI
1. BAB I - PENDAHULUAN
2. BAB II - PENETAPAN RUANG LINGKUP ISMS
3. BAB III - IDENTIFIKASI DAN KLASIFIKASI ASET
4. BAB IV - ANALISIS RISIKO KEAMANAN INFORMASI
5. BAB V - PEMETAAN KONTROL ISO/IEC 27001:2022
6. BAB VI - STATEMENT OF APPLICABILITY (SoA)
7. BAB VII - IMPLEMENTASI KONTROL KEAMANAN
8. BAB VIII - HASIL AUDIT INTERNAL ISMS
9. BAB IX - HASIL AUDIT EKSTERNAL ISMS
10. BAB X - KETERKAITAN DENGAN MODUL TEKNIS LAIN
11. BAB XI - ANALISIS DAN EVALUASI
12. BAB XII - KESIMPULAN DAN REKOMENDASI

---

### BAB I – PENDAHULUAN
#### 1.1 Latar Belakang
Sistem Informasi Tesso Nilo mengelola data sensitif termasuk identitas pengguna dan data transaksi reservasi. Kebocoran data ini dapat berakibat buruk bagi reputasi organisasi dan kerugian finansial bagi pengguna. Oleh karena itu, diperlukan standar manajemen keamanan yang sistematis.

#### 1.2 Tujuan Pembuatan ISMS
- Melindungi aset informasi dari ancaman internal dan eksternal.
- Memastikan keberlanjutan layanan sistem.
- Memenuhi standar akademik untuk mata kuliah Keamanan Informasi.

#### 1.3 Metodologi Umum Penerapan ISMS
Menggunakan siklus PDCA (Plan-Do-Check-Act):
- **Plan**: Penetapan ruang lingkup dan analisis risiko.
- **Do**: Implementasi kontrol keamanan.
- **Check**: Audit internal dan evaluasi.
- **Act**: Perbaikan berkelanjutan.

#### 1.4 Keterbatasan Studi
Cakupan pengerjaan dilakukan dari tanggal 15 Januari 2026 hingga 2 Februari 2026, berfokus pada sisi Teknis Web Backend dan Dokumen Kebijakan mendasar.

---

### BAB II – PENETAPAN RUANG LINGKUP ISMS
#### 2.1 Deskripsi Proyek Sistem
- **Jenis Sistem**: Web Application (Fullstack PHP/MySQL).
- **Arsitektur**: Client-Server Architecture. Frontend berinteraksi dengan API Backend melalui HTTP Requests.

#### 2.2 Cakupan ISMS
- **Aplikasi**: Seluruh modul login, registrasi, reservasi, dan dashboard admin.
- **Data**: Database MySQL `tesso_nilo_db`.
- **Jaringan**: Akses melalui lingkungan XAMPP (Local/Development).

#### 2.3 Identifikasi Pihak Terkait (Stakeholders)
- Administrator (Pengelola sistem)
- Pengunjung/Customer (Pengguna layanan)
- Developer (Pihak yang mengembangkan sistem)

---

### BAB III – IDENTIFIKASI DAN KLASIFIKASI ASET
#### 3.1 Identifikasi Aset
1. **Data Pengguna**: Username, Password (Hash), Email.
2. **Sistem Aplikasi**: Source code PHP, JavaScript, dan HTML.
3. **Infrastruktur Jaringan**: Localhost/Server hosting.
4. **Akun dan Hak Akses**: Session ID dan Role.

#### 3.2 Klasifikasi Aset Berdasarkan CIA
| Aset | Confidentiality | Integrity | Availability |
|------|-----------------|-----------|--------------|
| Password User | High | High | Medium |
| Bukti Pembayaran | High | Medium | Low |
| Konten Berita | Low | High | High |

#### 3.3 Nilai Kepentingan Aset
Aset yang paling krusial adalah **Database User** dan **Logika Autentikasi**, karena kegagalan pada bagian ini akan meruntuhkan seluruh sistem keamanan.

---

### BAB IV – ANALISIS RISIKO KEAMANAN INFORMASI

#### 4.1 Identifikasi Ancaman (Threat Identification)
Ancaman adalah potensi kejadian yang dapat menyebabkan kerugian pada aset informasi. Berdasarkan analisis pada sistem Tesso Nilo, ancaman utama didefinisikan sebagai berikut:
- **Serangan Siber (Cyber Attacks)**: SQL Injection, Cross-Site Scripting (XSS), dan Brute Force pada halaman login.
- **Kegagalan Teknis**: Kerusakan database atau kegagalan server hosting.
- **Kesalahan Manusia (Human Error)**: Penghapusan data secara tidak sengaja oleh admin atau kelalaian dalam menjaga kerahasiaan password.
- **Pihak Luar**: Manipulasi bukti pembayaran oleh oknum pengunjung untuk mendapatkan tiket secara ilegal.

#### 4.2 Identifikasi Kerentanan (Vulnerability Identification)
Kerentanan adalah kelemahan sistem yang dapat dimanfaatkan oleh ancaman:
- **Input Validation**: Kurangnya sanitasi pada beberapa field input yang dapat dieksploitasi.
- **Authentication**: Belum adanya fitur pembatasan percobaan login (Rate Limiting) yang memudahkan serangan Brute Force.
- **Upload Security**: Kerentanan pada modul upload file jika tidak divalidasi dengan ketat (potensi Web Shell).
- **Physical/Network**: Penggunaan protokol HTTP yang tidak terenkripsi pada lingkungan pengembangan lokal.

#### 4.3 Analisis Dampak Risiko
Dampak risiko dinilai berdasarkan kerugian yang ditimbulkan pada tiga aspek utama (CIA):
- **Kerahasiaan (Confidentiality)**: Bocornya data pribadi pengguna ke publik.
- **Integritas (Integrity)**: Perubahan data reservasi atau konten berita tanpa izin.
- **Ketersediaan (Availability)**: Sistem tidak dapat diakses (down) sehingga mengganggu transaksi pengunjung.

#### 4.4 Penilaian Level Risiko
Level risiko ditentukan berdasarkan matriks Probabilitas (likelihood) dan Dampak (impact):
- **Low**: Dampak kecil, risiko dapat diterima dengan pemantauan berkala.
- **Medium**: Dampak moderat, memerlukan tindakan mitigasi dalam jangka waktu tertentu.
- **High**: Dampak kritis, memerlukan penanganan segera karena mengancam operasional sistem.

#### 4.5 Tabel Risiko Keamanan Informasi

| No | Aset | Ancaman | Kerentanan | Dampak | Level Risiko | Rencana Mitigasi |
|----|------|---------|------------|--------|--------------|------------------|
| 1 | Database User | Akses tidak sah | Kelemahan autentikasi | Kebocoran privasi | **High** | Prepared Statements & BCrypt Hashing |
| 2 | Sistem Aplikasi | Brute Force | Belum ada Limit Attempt | Akun diambil alih | **Medium** | Penambahan delay & Password Policy |
| 3 | Data Reservasi | Manipulasi Bayar | Validasi sisi server lemah | Kerugian finansial | **High** | Validasi manual & Payment API |
| 4 | Server | Serangan DDoS | No Rate Limiting | Layanan Down | **Medium** | Implementasi Cloudflare/Firewall |
| 5 | Akun Admin | Phishing | Kelalaian manusia | Kontrol Full bocor | **High** | Edukasi Keamanan & MFA |
| 6 | File Upload | Web Shell | Validasi ekstensi lemah | RCE / Takeover | **High** | Validasi MIME type & Auto-rename |

---

### BAB V – PEMETAAN KONTROL ISO/IEC 27001:2022 (ANNEX A)
#### 5.1 Pendekatan Pemilihan Kontrol
Pemilihan kontrol difokuskan pada **Technical Controls** (Annex A.8) untuk memberikan perlindungan langsung pada kode program.

#### 5.2 Daftar Kontrol yang Digunakan
- **A.5.15 Access Control**: Mengatur siapa yang bisa melihat dashboard.
- **A.8.24 Cryptography**: Mengamankan password.
- **A.8.28 Secure Coding**: Mencegah SQL Injection.
- **A.8.20 Network Security**: Mengatur session security.

#### 5.3 Alasan Pemilihan Kontrol
Kontrol ini dipilih karena paling relevan dengan kerentanan umum pada aplikasi berbasis PHP/MySQL.

---

### BAB VI – STATEMENT OF APPLICABILITY (SoA)

#### 6.1 Konsep Statement of Applicability (SoA)
Statement of Applicability (SoA) adalah dokumen fundamental dalam ISO/IEC 27001:2022 yang merinci kontrol keamanan mana yang relevan dan diterapkan dalam organisasi. Dokumen ini berfungsi sebagai jembatan antara penilaian risiko dan implementasi kontrol. Manfaat utama SoA meliputi:
- Identifikasi kontrol yang dipilih dari Annex A ISO/IEC 27001:2022.
- Memberikan alasan (justifikasi) mengapa suatu kontrol dipilih atau tidak dipilih.
- Menjelaskan status implementasi saat ini dari setiap kontrol tersebut.
- Memberikan bukti nyata (Evidence) atas implementasi kontrol teknis maupun administratif.

#### 6.2 Tabel SoA Annex A (ISO/IEC 27001:2022)

| Kode Kontrol | Nama Kontrol | Status | Alasan Justifikasi | Bukti Implementasi |
|--------------|--------------|--------|-------------------|-------------------|
| **A.5.15** | Control of Access | **Implemented** | Membatasi akses sistem hanya untuk pengguna sah berdasarkan peran mereka (RBAC). | Pengecekan `$_SESSION['role']` pada file `api/auth/login.php` dan filter dashboard. |
| **A.8.24** | Use of Cryptography | **Implemented** | Mengamankan data sensitif (password) agar tidak berbentuk clear-text di database. | Implementasi fungsi `password_hash()` dan `password_verify()` (BCrypt). |
| **A.8.28** | Secure Coding | **Implemented** | Mencegah eksploitasi kode seperti SQL Injection pada aplikasi web. | Penggunaan MySQLi Prepared Statements (`$stmt->prepare()`) di seluruh query database. |
| **A.5.7** | Threat Intelligence | **Implemented** | Memantau upaya akses ilegal atau anomali pada aktivitas login. | Logging aktivitas pada file `api/auth/debug_login.log` untuk audit record. |
| **A.8.12** | Data Leakage Prevention | **Implemented** | Menghindari kebocoran informasi teknis aplikasi melalui pesan error. | Konfigurasi `ini_set('display_errors', 0)` pada file produksi (`login.php`). |
| **A.8.3** | Info Access Restriction | **Implemented** | Memastikan modul administratif tidak dapat diakses oleh level pengguna biasa. | Middleware pengecekan session pada backend API dan redirection frontend. |
| **A.8.10** | Information Deletion | **Implemented** | Memberikan kemampuan untuk menghapus data yang sudah tidak diperlukan sesuai regulasi. | Fitur hapus data pada manajemen reservasi dan akun di dashboard admin. |
| **A.8.20** | Network Security | **Not Implemented** | Belum adanya sertifikat SSL/HTTPS yang terpasang secara komersial. | Direncanakan migrasi dari HTTP ke HTTPS dan penggunaan Web Application Firewall (WAF). |
| **A.8.1** | User Endpoint Devices | **Implemented** | Mengelola keamanan sisi klien melalui kebijakan session dan cookie yang aman. | Pengaturan session lifetime dan atribut cookie di sisi server PHP. |
| **A.5.24** | Info Sec Incident Mgmt | **Implemented** | Prosedur untuk mendeteksi dan merespons kegagalan atau gangguan keamanan. | Pantauan status reservasi (pending/confirmed) untuk mendeteksi aktivitas mencurigakan. |

---

### BAB VII – IMPLEMENTASI KONTROL KEAMANAN
#### 7.1 Implementasi Kontrol Akses
Implementasi dilakukan pada file `api/auth/login.php` yang memverifikasi kredensial dan peran pengguna (role-based access) sebelum memberikan akses ke dashboard admin. Hal ini memastikan prinsip *least privilege* terpenuhi.

#### 7.2 Implementasi Kriptografi
Sistem mengamankan integritas password menggunakan algoritma hashing standar industri.
*Bukti Kode:* `password_hash($password, PASSWORD_BCRYPT)` pada modul registrasi dan `password_verify()` pada modul login.

#### 7.3 Implementasi Keamanan Jaringan
Penggunaan *Session Security* dan pembatasan akses API. Setiap request ke data sensitif wajib menyertakan session cookie yang valid dan telah terverifikasi di sisi server.

#### 7.4 Implementasi Proteksi Data
Mencegah serangan SQL Injection dengan menggunakan *Prepared Statements* pada seluruh kueri database yang melibatkan input dari pengguna.
*Bukti Kode:* `$stmt = $conn->prepare("SELECT ... WHERE username = ?")`.

#### 7.5 Implementasi Manajemen Insiden (Incident Management)
Implementasi ini mencakup prosedur deteksi, pelaporan, dan respons terhadap anomali keamanan. Bukti implementasi pada sistem Tesso Nilo meliputi:

- **Dashboard Monitoring (Admin Panel):**
  Admin dapat memantau status seluruh transaksi dan reservasi secara real-time. Jika ditemukan transaksi dengan status "Pending" yang tidak wajar atau jumlah tiket yang mencurigakan, admin dapat melakukan pembatalan (*Cancelled*) atau verifikasi manual.
  *Bukti: Screenshot menu "Kelola Reservasi" pada Dashboard Admin yang menampilkan status filter.*

- **Sistem Logging (Audit Trail):**
  Sistem secara otomatis mencatat setiap aktivitas login, baik yang berhasil maupun yang gagal, ke dalam file log server. Hal ini memungkinkan tim teknis untuk melakukan audit jika terjadi percobaan serangan Brute Force.
  *Bukti: File `api/auth/debug_login.log` yang mencatat timestamp dan status akses.*

- **Middleware Security:**
  Penerapan pengecekan sesi pada setiap endpoint API backend (misal: `check_session.php`) untuk memastikan bahwa akses ilegal tanpa login langsung ditolak oleh sistem.
  *Bukti: Potongan kode pengecekan session di setiap file API.*

- **Pelaporan Pengguna:**
  Kanal komunikasi (Contact Info) pada halaman utama memungkinkan pengguna melaporkan jika menemui kegagalan sistem atau masalah akun.

---

### BAB VIII – HASIL AUDIT INTERNAL ISMS

#### 8.1 Tujuan dan Ruang Lingkup Audit Internal
Tujuan dari audit internal ini adalah untuk memverifikasi tingkat kepatuhan implementasi sistem terhadap kontrol keamanan informasi yang telah ditetapkan dalam SoA berbasis ISO/IEC 27001:2022. Ruang lingkup audit mencakup seluruh modul aplikasi web Tesso Nilo, database user, dan prosedur pengelolaan data reservasi.

#### 8.2 Metodologi Audit Internal
Audit dilakukan dengan pendekatan sistematis menggunakan metode berikut:
- **Kriteria Audit**: Mengacu pada standar kontrol ISO/IEC 27001:2022 (Annex A).
- **Teknik Audit**:
  - **Review Dokumen**: Memeriksa file kebijakan (`KEBIJAKAN_KEAMANAN.md`) dan ketersediaan log.
  - **Observasi**: Mengamati jalannya proses login dan manajemen dashboard admin.
  - **Teknis (Walkthrough)**: Peninjauan langsung terhadap potongan kode (*source code*) pada file API.

#### 8.3 Temuan Audit
Berikut adalah hasil temuan audit internal yang dilakukan pada sistem Tesso Nilo:

| No | Klausul / Kontrol ISO | Area yang Diaudit | Kriteria Audit | Temuan Audit | Kategori Temuan | Bukti Audit | Dampak Risiko | Rekomendasi Perbaikan |
|----|-----------------------|-------------------|----------------|--------------|-----------------|-------------|---------------|-----------------------|
| 1 | A.5.15 | Access Control | Hak akses harus berbasis peran (RBAC) | Role 'admin' dan 'customer' sudah terpisah secara fungsional. | **Conformity** | Script `login.php` & Dashboard | Low | Pertahankan dan rutin audit user |
| 2 | A.8.24 | Cryptography | Data sensitif wajib dienkripsi/hash | Password pengguna telah menggunakan hash BCrypt. | **Conformity** | Cuplikan kode `password_hash()` | Low | Pertahankan penggunaan salt kuat |
| 3 | A.8.20 | Network Security | Keamanan transmisi data | Sistem masih berjalan di protokol HTTP, belum menggunakan HTTPS. | **Nonconformity** | URL Browser (Localhost) | High | Segera implementasikan SSL/TLS |
| 4 | A.5.7 | Threat Intel / Log | Pencatatan aktivitas akses | Log login tersedia namun belum mencatat alamat IP secara detail. | **OFI** | File `debug_login.log` | Medium | Tambahkan IP tracking pada sistem log |
| 5 | A.8.28 | Secure Coding | Pencegahan SQL Injection | Seluruh query krusial sudah menggunakan Prepared Statements. | **Conformity** | Source code `$stmt->prepare()` | Low | Pertahankan prosedur coding aman |

**Kategori Temuan Audit:**
| Kategori | Definisi |
|----------|----------|
| **Conformity** | Kontrol diterapkan secara efektif dan sesuai dengan standar ISO/IEC 27001:2022. |
| **Nonconformity** | Kontrol tidak diterapkan atau terdapat penyimpangan fatal dari standar yang ditetapkan. |
| **OFI (Opportunity for Improvement)** | Kontrol sudah diterapkan namun masih terdapat ruang untuk peningkatan efektivitas. |

#### 8.4 Analisis Ketidaksesuaian
- **Akar Penyebab (Root Cause)**: Belum adanya sertifikat SSL pada server dikarenakan lingkungan pengembangan masih berbasis lokal (XAMPP).
- **Dampak terhadap Keamanan Informasi**: Transmisi data antara klien dan server rentan terhadap serangan *Man-in-the-Middle* (MitM) yang bisa mencuri session cookie admin.

#### 8.5 Bukti Audit
Bukti-bukti yang dikumpulkan selama proses audit meliputi:
- **Screenshot Konfigurasi**: Tampilan pengaturan hak akses pada database MySQL.
- **Log Sistem**: Isi file `debug_login.log` yang menunjukkan aktivitas login.
- **Dokumen Kebijakan**: Referensi pada file `KEBIJAKAN_KEAMANAN.md`.
- **Potongan Konfigurasi Teknis**: Cuplikan kode dari `api/auth/login.php` yang menunjukkan verifikasi role.

---

### BAB IX – HASIL AUDIT EKSTERNAL ISMS

#### 9.1 Temuan Audit
Audit eksternal dilakukan untuk memvalidasi efektivitas ISMS oleh pihak independen (simulasi). Berikut adalah tabel temuan audit eksternal:

| No | Klausul / Kontrol ISO | Area yang Diaudit | Kriteria Audit | Temuan Audit | Kategori Temuan | Bukti Audit | Dampak Risiko | Rekomendasi Perbaikan |
|----|-----------------------|-------------------|----------------|--------------|-----------------|-------------|---------------|-----------------------|
| 1 | A.5.15 | Access Control | Hak akses harus berbasis peran (RBAC). | RBAC sudah diimplementasikan dengan pemisahan admin dan customer. | **Conformity** | Screenshot user management | Low | Pertahankan prosedur verifikasi role. |
| 2 | A.8.24 | Cryptography | Data sensitif wajib dienkripsi. | Password pengguna telah menggunakan hash BCrypt (Blowfish). | **Conformity** | Cuplikan kode hashing di `register.php` | Low | Gunakan parameter cost yang lebih tinggi jika hardware memungkinkan. |
| 3 | A.8.20 | Network Security | Keamanan jaringan & transmisi. | Protokol masih menggunakan HTTP polos; sertifikat SSL belum terbit. | **Nonconformity** | Browser Address Bar | High | Implementasi HTTPS/SSL segera. |
| 4 | A.8.28 | Secure Coding | Praktik pengembangan aman. | Penggunaan Prepared Statements sudah konsisten di API reservasi. | **Conformity** | Review kode pada `api/reservasi/read.php` | Low | Lakukan code review berkala. |
| 5 | A.5.1 | Policies for Info Sec | Ketersediaan dokumen kebijakan. | Dokumen kebijakan sudah ada (`KEBIJAKAN_KEAMANAN.md`) namun belum ditandatangani manajemen. | **OFI** | Review dokumen digital | Medium | Lakukan pengesahan formal dokumen kebijakan. |

**Kategori Temuan Audit Eksternal:**
| Kategori | Definisi |
|----------|----------|
| **Conformity** | Kontrol diterapkan secara efektif dan memenuhi standar ISO/IEC 27001:2022. |
| **Nonconformity** | Kontrol tidak diterapkan atau gagal memenuhi persyaratan standar. |
| **OFI** | Kontrol sudah diterapkan namun dapat ditingkatkan lebih lanjut (Opportunity for Improvement). |

#### 9.2 Bukti Audit
Bukti-bukti audit eksternal yang diverifikasi meliputi:
- **Screenshot Konfigurasi**: Verifikasi setting environment XAMPP dan database.
- **Log Sistem**: Observasi log pada `debug_login.log` untuk mendeteksi rekam jejak akses.
- **Dokumen Kebijakan dan Prosedur**: Peninjauan file `KEBIJAKAN_KEAMANAN.md` dan `SOA_TABLE.md`.
- **Potongan Konfigurasi Teknis**: Analisis koding pada backend API untuk memastikan validasi input dan keamanan session.

---

### BAB X – KETERKAITAN DENGAN MODUL TEKNIS LAIN
ISMS ini terintegrasi erat dengan:
- **Backend**: Melalui sanitasi input.
- **Database**: Melalui hashing dan enkripsi fields.
- **Dashboard**: Melalui logging aktivitas admin.

---

### BAB XI – ANALISIS DAN EVALUASI

#### 11.1 Evaluasi Efektivitas Kontrol Keamanan
Berdasarkan hasil audit internal dan eksternal, efektivitas kontrol keamanan pada sistem Tesso Nilo dapat dievaluasi sebagai berikut:
- **Kontrol Kriptografi (A.8.24)**: Sangat Efektif. Penggunaan BCrypt memastikan bahwa meskipun database bocor, password pengguna tetap terjaga kerahasiaannya.
- **Kontrol Akses (A.5.15)**: Efektif. Pemisahan peran admin dan customer melalui session-based RBAC telah berhasil membatasi akses ke fitur-fitur administratif.
- **Secure Coding (A.8.28)**: Efektif. Implementasi Prepared Statements secara konsisten telah memitigasi risiko serangan SQL Injection secara signifikan.
- **Keamanan Jaringan (A.8.20)**: Kurang Efektif. Ketiadaan enkripsi SSL/TLS pada jalur transmisi data (HTTP) merupakan celah keamanan utama yang harus segera diperbaiki.

#### 11.2 Kelebihan dan Kelemahan Implementasi
**Kelebihan:**
- Implementasi kontrol teknis (Coding Level) sudah mengikuti *Best Practices* keamanan web modern.
- Struktur data dan database dirancang dengan memperhatikan integritas referensial.
- Dokumentasi kebijakan ISMS sudah tersedia dalam format digital yang mudah diakses.

**Kelemahan:**
- Ketergantungan pada lingkungan pengembangan lokal membuat fitur keamanan jaringan (SSL/Firewall) belum optimal.
- Belum adanya fitur autentikasi dua faktor (2FA) untuk akun administrator.
- Pencatatan log sistem masih bersifat dasar dan belum mencakup pelacakan IP address secara detail.

---

### BAB XII – KESIMPULAN DAN REKOMENDASI

#### 12.1 Kesimpulan
Penerapan ISMS berbasis ISO/IEC 27001:2022 pada sistem Tesso Nilo telah memberikan fondasi keamanan yang kuat, terutama pada lapisan aplikasi dan data. Meskipun masih terdapat beberapa ketidaksesuaian (*Nonconformity*) pada aspek jaringan, secara keseluruhan sistem telah berhasil menurunkan level risiko dari "High" menjadi "Medium/Low" pada aset-aset informasi kritikal.

#### 12.2 Rekomendasi Perbaikan ISMS
- **Pembaruan Protokol**: Segera melakukan migrasi dari HTTP ke HTTPS dengan memasang sertifikat SSL (misal: Let's Encrypt).
- **Peningkatan Logging**: Memperbarui skrip login agar mencatat alamat IP dan *User-Agent* setiap upaya akses guna mempermudah audit investigasi.
- **Formalisasi Kebijakan**: Melakukan tanda tangan digital atau fisik pada dokumen kebijakan keamanan oleh pimpinan organisasi.

#### 12.3 Rencana Pengembangan Keamanan Selanjutnya
- Implementasi Multi-Factor Authentication (MFA/2FA) untuk akses dashboard admin.
- Integrasi *Automated Vulnerability Scanner* untuk mendeteksi celah keamanan secara mandiri tiap kali ada pembaruan kode.
- Pelatihan kesadaran keamanan informasi (*Security Awareness*) bagi seluruh pengelola sistem.

---

### DAFTAR PUSTAKA

- **ISO/IEC 27001:2022**. *Information security, cybersecurity and privacy protection — Information security management systems — Requirements*. International Organization for Standardization.
- **ISO/IEC 27002:2022**. *Information security, cybersecurity and privacy protection — Information security controls*. International Organization for Standardization.
- **OWASP Foundation (2021)**. *OWASP Top 10:2021 - The Ten Most Critical Web Application Security Risks*. [Online]. Tersedia di: https://owasp.org/www-project-top-ten/.
- **Stallings, W. (2017)**. *Computer Security: Principles and Practice*. 4th Edition. Pearson.
- **PHP Documentation Group**. *Password Hashing - Safe Password Hashing in PHP*. [Online]. Tersedia di: https://www.php.net/manual/en/faq.passwords.php.
- **NIST Special Publication 800-53**. *Security and Privacy Controls for Information Systems and Organizations*. National Institute of Standards and Technology.

---

### LAMPIRAN

#### Lampiran 1: Tabel Risiko Keamanan Informasi
*(Tabel lengkap dapat dilihat pada file pendukung: `TABEL_RISIKO.md`)*
Berisi daftar 6 aset utama dengan identifikasi ancaman SQLi, Brute Force, DDoS, dan manipulasi data beserta rencana mitigasinya.

#### Lampiran 2: Tabel Statement of Applicability (SoA)
*(Tabel lengkap dapat dilihat pada file pendukung: `SOA_TABLE.md`)*
Mencakup 10 kontrol pilihan dari Annex A ISO/IEC 27001:2022 beserta justifikasi teknis dan status implementasinya.

#### Lampiran 3: Dokumen Kebijakan Keamanan
*(Dokumen lengkap dapat dilihat pada file pendukung: `KEBIJAKAN_KEAMANAN.md`)*
Berisi kebijakan operasional terkait Kontrol Akses, Kriptografi, Jaringan, Manajemen Insiden, dan Perlindungan Data.

#### Lampiran 4: Bukti Implementasi (Technical Evidence)
- **Screenshot 1:** Tampilan Dashboard Admin pada menu "Kelola Reservasi" (Monitoring).
- **Screenshot 2:** Cuplikan kode `password_hash()` pada file `api/auth/register.php`.
- **Screenshot 3:** Cuplikan kode Prepared Statements pada file `api/auth/login.php`.
- **Screenshot 4:** Struktur Database `users` yang menunjukkan kolom `role` (Admin/Customer).

#### Lampiran 5: Bukti Audit Internal
- **File Log:** `api/auth/debug_login.log` yang mencatat aktivitas histori akses.
- **Tabel Temuan:** Ringkasan ketidaksesuaian (Nonconformity) terkait penggunaan protokol HTTP pada lingkungan lokal.
