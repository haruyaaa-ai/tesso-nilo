console.log('MAIN.JS LOADED - VERSION 2.1');
// Konfigurasi Tailwind untuk warna dan font kustom
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-green': '#1b742e', // Hijau Konservasi Lebih Gelap
                'secondary-yellow': '#ffb300', // Kuning Aksen
                'bg-light': '#f0fdf4', // Light Green Background
                'text-dark': '#1f2937',
                'accent-blue': '#3b82f6',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        }
    }
};

// --- 1. SETUP & DATA SIMULASI ---
const STORAGE_KEY_RESERVASI = 'tessoNiloReservasiData'; // Masih dipakai untuk Reservasi? Dashboard admin pakai API, public mungkin masih perlu bersih2
const API_BASE_URL = 'api';

// Data Informasi Publik (Fetch dari API)
let infoData = [];

// Fungsi Helper Fetch Data
async function fetchPublicData() {
    try {
        const response = await fetch(`${API_BASE_URL}/berita/read.php`);
        const result = await response.json();
        if (result.success) {
            infoData = result.data;
        }
    } catch (e) {
        console.error('Gagal memuat berita:', e);
    }
}

// ... Reservasi logic user (masih local storage mungkin, tapi dashboard admin pakai API) ...
// Kita biarkan reservasiData public lama biar tidak error dulu, fokus ke Berita Sync.
let reservasiData = JSON.parse(localStorage.getItem(STORAGE_KEY_RESERVASI)) || [];

// ...

// --- FUNGSI HEADER & NAVIGATION ---

function getHeader(isLoggedIn) {
    const userData = JSON.parse(sessionStorage.getItem('user_data') || '{}');
    const menuLinks = `
        <a href="index.html" class="hover:text-secondary-yellow transition-colors duration-300">Beranda</a>
        
        <div class="relative group cursor-pointer py-4">
            <span class="hover:text-secondary-yellow transition-colors duration-300 flex items-center gap-1">
                Tentang <i data-lucide="chevron-down" class="w-4 h-4"></i>
            </span>
            <div class="absolute top-full left-0 w-64 bg-white text-gray-900 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 py-3 border border-gray-100 overflow-hidden">
                <a href="about.html" class="flex items-center gap-3 px-6 py-4 hover:bg-bg-light hover:text-primary-green transition">
                    <div class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                        <i data-lucide="info" class="w-4 h-4 text-primary-green"></i>
                    </div>
                    <div>
                        <p class="font-bold text-sm">Tentang Kami</p>
                        <p class="text-[10px] text-gray-400 uppercase tracking-tighter">Profil TNTN</p>
                    </div>
                </a>
                <a href="visitor-info.html" class="flex items-center gap-3 px-6 py-4 hover:bg-bg-light hover:text-primary-green transition">
                    <div class="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                        <i data-lucide="user-check" class="w-4 h-4 text-yellow-600"></i>
                    </div>
                    <div>
                        <p class="font-bold text-sm">Informasi Pengunjung</p>
                        <p class="text-[10px] text-gray-400 uppercase tracking-tighter">Aturan & Peta</p>
                    </div>
                </a>
            </div>
        </div>

        <a href="berita.html" class="hover:text-secondary-yellow transition-colors duration-300">Berita</a>
        <a href="spesies.html" class="hover:text-secondary-yellow transition-colors duration-300">Spesies</a>
        ${isLoggedIn && userData.role === 'customer' ? '<a href="booking.html" class="hover:text-secondary-yellow transition-colors duration-300">Booking</a>' : ''}
        ${isLoggedIn && userData.role === 'customer' ? '<a href="riwayat.html" class="hover:text-secondary-yellow transition-colors duration-300">Riwayat</a>' : ''}
    `;

    const authButton = isLoggedIn
        ? `
            <div class="flex items-center space-x-6">
                <a href="profile.html" class="hidden md:flex flex-col items-end group">
                    <span class="text-xs opacity-70 uppercase tracking-widest font-bold group-hover:text-secondary-yellow transition">Akun Saya</span>
                    <span class="text-sm font-bold text-white group-hover:text-secondary-yellow transition">${userData.username || 'User'}</span>
                </a>
                ${userData.role === 'admin' ? '<a href="dashboard.html" class="bg-secondary-yellow text-primary-dark px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-secondary-yellow/20 transition-all">Dashboard</a>' : ''}
                <button onclick="handleLogout()" class="bg-rose-500/20 text-rose-100 border border-rose-500/30 px-5 py-2 rounded-full text-sm font-bold hover:bg-rose-500 hover:text-white transition-all">Keluar</button>
            </div>
        `
        : `
            <a href="login.html" class="bg-secondary-yellow text-primary-dark px-8 py-2.5 rounded-full font-bold hover:shadow-xl hover:shadow-secondary-yellow/30 transition-all transform hover:scale-105">Masuk</a>
        `;

    return `
        <nav class="bg-primary-green/95 backdrop-blur-md text-white shadow-2xl sticky top-0 z-[100] border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-24">
                    <div class="flex items-center">
                        <a href="index.html" class="flex items-center space-x-4 group">
                            <div class="bg-white/10 p-2.5 rounded-2xl group-hover:bg-secondary-yellow/20 transition-colors">
                                <i data-lucide="trees" class="w-8 h-8 text-secondary-yellow"></i>
                            </div>
                            <div>
                                <h1 class="text-2xl font-black leading-none tracking-tighter text-white">TESSO NILO</h1>
                                <p class="text-[9px] uppercase tracking-[0.2em] text-secondary-yellow font-bold mt-1">Sumatera Conservation</p>
                            </div>
                        </a>
                    </div>
                    
                    <div class="hidden lg:flex items-center space-x-10 text-sm font-bold uppercase tracking-wider">
                        ${menuLinks}
                    </div>

                    <div class="flex items-center">
                        ${authButton}
                    </div>
                </div>
            </div>
        </nav>
    `;
}

function handleHybridHeader(isLoggedIn) {
    console.log('Hybrid Header Initialized with isLoggedIn:', isLoggedIn);
    const headerEl = document.getElementById('mainHeader');
    if (headerEl) {
        headerEl.innerHTML = getHeader(isLoggedIn);
        lucide.createIcons();
    }
}

function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}

function handleRouting() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const hash = window.location.hash || '';
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (hash.startsWith('#detail/')) {
        const id = parseInt(hash.split('/')[1]);
        appEl.innerHTML = renderDetailView(id, isLoggedIn);
    } else if (window.location.pathname.includes('berita.html')) {
        appEl.innerHTML = renderBeritaListView(isLoggedIn);
    }

    lucide.createIcons();
}

// --- FUNGSI RENDERING TAMPILAN PUBLIK ---

function renderPublicHomeView(isLoggedIn) {
    const heroContent = `
        <header class="hero-bg h-[60vh] flex items-center justify-center text-center">
            <div class="px-4 py-16 text-white max-w-4xl">
                <h1 class="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                    Konservasi Gajah di Jantung Sumatera
                </h1>
                <p class="text-xl md:text-2xl mb-8 font-light tracking-wide">
                    Taman Nasional Tesso Nilo: Melindungi Keanekaragaman Hayati.
                </p>
                <a href="about.html" class="bg-secondary-yellow text-text-dark font-bold px-8 py-3 rounded-full hover:bg-yellow-600 transition duration-300 shadow-xl inline-flex items-center">
                    Tentang Tesso Nilo
                    <span data-lucide="info" class="ml-2 w-5 h-5"></span>
                </a>
            </div>
        </header>
        <section id="informasi-ringkas" class="py-20 bg-bg-light">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center text-primary-green mb-12">Informasi Ringkas</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${infoData.slice(0, 3).map((item) => {
        // Gunakan Image URL dari API atau default
        const imgSrc = (item.image && item.image !== 'null') ? item.image : 'assets/img/default-news.jpg';

        return `
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:translate-y-[-5px]">
                                <div class="h-48 w-full overflow-hidden rounded-t-xl bg-gray-200">
                                    <img src="${imgSrc}" alt="${item.title}" class="w-full h-full object-cover">
                                </div>
                                <div class="p-6">
                                    <h3 class="text-2xl font-semibold text-text-dark mb-3 truncate">${item.title}</h3>
                                    <div class="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                                        <span class="flex items-center"><span data-lucide="tag" class="w-4 h-4 mr-1"></span> ${item.category}</span>
                                    </div>
                                    <p class="text-gray-600 line-clamp-3 mb-4">${item.content}</p>
                                    <a href="berita.html#detail/${item.id}" class="inline-flex items-center text-accent-blue hover:text-blue-700 font-medium">
                                        Baca Selengkapnya <span data-lucide="arrow-right" class="ml-2 w-4 h-4"></span>
                                    </a>
                                </div>
                            </div>
                        `;
    }).join('')}
                </div>
                <div class="text-center mt-10">
                    <a href="berita.html" class="inline-flex items-center bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md">
                        Lihat Semua Laporan
                        <span data-lucide="external-link" class="ml-2 w-4 h-4"></span>
                    </a>
                </div>
            </div>
        </section>
    `;

    return getHeader(isLoggedIn) + heroContent;
}

function renderBeritaListView(isLoggedIn) {
    const listItems = infoData.map((item, index) => {
        const imgSrc = (item.image && item.image !== 'null') ? item.image : 'images/hero_premium.png';
        const date = new Date(item.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        return `
            <div class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group mb-10 border border-gray-100" data-aos="fade-up" data-aos-delay="${index * 50}">
                <div class="flex flex-col lg:flex-row">
                    <div class="lg:w-72 relative h-64 lg:h-auto overflow-hidden shrink-0">
                        <img src="${imgSrc}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-1000">
                        <div class="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    </div>
                    <div class="lg:flex-1 p-6 lg:p-8 flex flex-col justify-center">
                        <div class="flex items-center gap-4 mb-6">
                            <span class="bg-forest-100 text-forest-700 text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-widest text-[10px]">
                                ${item.category}
                            </span>
                            <span class="text-gray-400 text-sm flex items-center gap-2">
                                <i data-lucide="calendar" class="w-4 h-4"></i> ${date}
                            </span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-forest-600 transition-colors uppercase tracking-tight">
                            ${item.title}
                        </h3>
                        <p class="text-gray-500 leading-relaxed mb-6 line-clamp-2 text-base">
                            ${item.content}
                        </p>
                        <div class="flex items-center justify-between pt-6 border-t border-gray-100">
                             <a href="#detail/${item.id}" class="inline-flex items-center gap-3 text-forest-700 font-black text-sm uppercase tracking-[0.2em] group/btn">
                                <span>Selengkapnya</span>
                                <div class="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center group-hover/btn:bg-forest-600 group-hover/btn:text-white transition-all shadow-sm">
                                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1">
                ${listItems.length > 0 ? listItems : '<div class="text-center py-20 bg-white rounded-3xl shadow-xl"><i data-lucide="file-x-2" class="w-16 h-16 text-gray-300 mx-auto mb-4"></i><p class="text-gray-500 italic text-xl">Belum ada informasi yang tersedia.</p></div>'}
            </div>
        </div>
    `;
}


function renderDetailView(id, isLoggedIn) {
    const item = infoData.find(d => d.id == id);

    if (!item) {
        return `
            <div class="max-w-4xl mx-auto py-20 text-center bg-white rounded-3xl shadow-2xl px-6">
                <div class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
                    <i data-lucide="alert-circle" class="w-12 h-12"></i>
                </div>
                <h1 class="text-4xl font-bold text-gray-900 mb-4 uppercase">Berita tidak ditemukan</h1>
                <p class="text-gray-500 mb-10 text-lg">Informasi yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
                <a href="berita.html" class="inline-flex items-center gap-3 bg-forest-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-forest-700 transition shadow-xl shadow-forest-600/20">
                    <i data-lucide="arrow-left" class="w-5 h-5"></i> Kembali ke Berita
                </a>
            </div>
        `;
    }

    const date = new Date(item.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const imgSrc = (item.image && item.image !== 'null') ? item.image : 'images/hero_premium.png';

    return `
        <div class="max-w-5xl mx-auto">
            <!-- Back Button -->
            <a href="berita.html" class="inline-flex items-center gap-2 text-forest-700 hover:text-forest-900 mb-10 font-bold uppercase text-[10px] tracking-widest group">
                <div class="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </div>
                Kembali ke Daftar Berita
            </a>
            
            <article class="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
                <!-- Cover Image -->
                <div class="relative h-[350px] lg:h-[400px] overflow-hidden">
                    <img src="${imgSrc}" alt="${item.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div class="absolute bottom-12 left-12 right-12 text-white">
                        <span class="bg-yellow-500 text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full mb-6 inline-block shadow-lg">
                            ${item.category}
                        </span>
                        <h1 class="text-4xl lg:text-5xl font-bold leading-tight uppercase tracking-tight drop-shadow-lg font-display">
                            ${item.title}
                        </h1>
                    </div>
                </div>

                <!-- Article Content -->
                <div class="p-12 lg:p-20">
                    <div class="flex flex-wrap items-center gap-8 mb-12 py-6 border-y border-gray-100">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center text-forest-600">
                                <i data-lucide="calendar" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Tanggal</p>
                                <p class="text-sm font-bold text-gray-800">${date}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 px-6 py-2 bg-green-50 rounded-full text-green-700 ml-auto">
                            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span class="text-[10px] font-bold uppercase">Verified Information</span>
                        </div>
                    </div>
                    
                    <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p class="text-xl font-medium text-gray-600 italic border-l-4 border-yellow-500 pl-6 mb-12">
                            ${item.content.split('.')[0]}.
                        </p>
                        
                        <div class="text-lg leading-loose space-y-6">
                            ${item.content}
                        </div>

                        <div class="mt-20 p-10 bg-gray-50 rounded-3xl border border-gray-100 flex items-start gap-6">
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                                <i data-lucide="info" class="w-6 h-6 text-forest-600"></i>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 italic">
                                    Informasi ini merupakan bagian dari upaya transparansi dan edukasi publik Balai Taman Nasional Tesso Nilo. 
                                    Semua kegiatan yang dilaporkan telah mematuhi protokol konservasi yang ketat.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Share & Footer -->
                    <div class="mt-16 flex justify-between items-center pt-8 border-t border-gray-100">
                        <div class="flex items-center gap-4">
                            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bagikan:</span>
                            <div class="flex gap-2">
                                <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-forest-600 hover:text-white transition shadow-sm"><i data-lucide="facebook" class="w-4 h-4"></i></button>
                                <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-forest-600 hover:text-white transition shadow-sm"><i data-lucide="twitter" class="w-4 h-4"></i></button>
                                <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-forest-600 hover:text-white transition shadow-sm"><i data-lucide="share-2" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                        <a href="berita.html" class="text-forest-600 font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-8">Kembali ke Daftar</a>
                    </div>
                </div>
            </article>
        </div>
    `;
}


// --- 7. FUNGSI RENDERING TAMPILAN ADMIN ---

function renderAdminLayout(subView) {
    const adminContent = getAdminContent(subView);
    return `
        ${getHeader(true)}
        <div class="view-content flex flex-col md:flex-row">
            <div class="md:w-64 bg-white shadow-lg p-4 md:h-screen sticky top-[72px]">
                <h3 class="text-lg font-bold text-primary-green mb-4 border-b pb-2">Panel Admin</h3>
                <nav class="space-y-2">
                    <a href="#admin/dashboard" onclick="window.location.hash='admin/dashboard';" class="flex items-center p-3 rounded-lg hover:bg-green-100 transition ${subView === 'dashboard' || !subView ? 'active-menu' : ''}">
                        <span data-lucide="layout-dashboard" class="w-5 h-5 mr-3"></span> Dashboard
                    </a>
                    <a href="#admin/manage_info" onclick="window.location.hash='admin/manage_info';" class="flex items-center p-3 rounded-lg hover:bg-green-100 transition ${subView === 'manage_info' ? 'active-menu' : ''}">
                        <span data-lucide="book-open-text" class="w-5 h-5 mr-3"></span> Kelola Informasi
                    </a>
                    <a href="#admin/manage_reservasi" onclick="window.location.hash='admin/manage_reservasi';" class="flex items-center p-3 rounded-lg hover:bg-green-100 transition ${subView === 'manage_reservasi' ? 'active-menu' : ''}">
                        <span data-lucide="calendar-check" class="w-5 h-5 mr-3"></span> Kelola Reservasi
                    </a>
                </nav>
            </div>

            <main class="flex-1 p-4 md:p-8">
                ${adminContent}
            </main>
        </div>
    `;
}

function getAdminContent(subView) {
    switch (subView) {
        case 'manage_info':
            return renderManageInfo();
        case 'manage_reservasi':
            return renderManageReservasi();
        case 'dashboard':
        default:
            return renderAdminDashboard();
    }
}

function renderAdminDashboard() {
    const totalInfo = infoData.length;
    const totalReservasi = reservasiData.length;
    const confirmedReservasi = reservasiData.filter(r => r.status === 'Confirmed').length;

    return `
        <h1 class="text-4xl font-bold text-primary-green mb-6">Dashboard Admin</h1>
        <p class="text-lg text-gray-600 mb-8">Selamat datang, Admin. Berikut ringkasan aktivitas sistem Anda.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-accent-blue">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Informasi Publik</p>
                        <p class="text-3xl font-extrabold text-text-dark">${totalInfo}</p>
                    </div>
                    <span data-lucide="book-open-text" class="w-8 h-8 text-accent-blue opacity-70"></span>
                </div>
                <p class="text-xs text-gray-400 mt-2">Data ditampilkan di halaman Berita.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-secondary-yellow">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Total Reservasi</p>
                        <p class="text-3xl font-extrabold text-text-dark">${totalReservasi}</p>
                    </div>
                    <span data-lucide="calendar-check" class="w-8 h-8 text-secondary-yellow opacity-70"></span>
                </div>
                <p class="text-xs text-gray-400 mt-2">Semua data pemesanan tiket.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary-green">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-500">Terkonfirmasi</p>
                        <p class="text-3xl font-extrabold text-text-dark">${confirmedReservasi}</p>
                    </div>
                    <span data-lucide="check-circle" class="w-8 h-8 text-primary-green opacity-70"></span>
                </div>
                <p class="text-xs text-gray-400 mt-2">${totalReservasi - confirmedReservasi} pending.</p>
            </div>
        </div>
    `;
}

function renderManageInfo() {
    const listRows = infoData.map((item, index) => `
        <tr class="border-b hover:bg-green-50/50 transition">
            <td class="px-6 py-4 font-medium text-text-dark">${index + 1}</td>
            <td class="px-6 py-4">${item.title}</td>
            <td class="px-6 py-4 hidden sm:table-cell">${item.category}</td>
            <td class="px-6 py-4 hidden md:table-cell">${item.date}</td>
            <td class="px-6 py-4 space-x-2">
                <button onclick="editInfo(${item.id})" class="text-accent-blue hover:text-blue-700 p-1 rounded-full">
                    <span data-lucide="square-pen" class="w-5 h-5"></span>
                </button>
                <button onclick="deleteInfo(${item.id})" class="text-red-500 hover:text-red-700 p-1 rounded-full">
                    <span data-lucide="trash-2" class="w-5 h-5"></span>
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <h1 class="text-4xl font-bold text-primary-green mb-6">Kelola Informasi Publik</h1>
        <p class="text-lg text-gray-600 mb-8">Tambahkan, ubah, atau hapus konten berita/laporan di halaman depan.</p>

        <button onclick="showInfoForm()" class="bg-secondary-yellow text-text-dark font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition mb-8 flex items-center">
            <span data-lucide="plus-circle" class="w-5 h-5 mr-2"></span> Tambah Informasi Baru
        </button>

        <div id="infoFormContainer" class="bg-white p-6 rounded-xl shadow-xl mb-10 hidden">
            <h3 id="infoFormTitle" class="text-2xl font-semibold text-text-dark mb-4">Tambah Informasi Baru</h3>
            <form id="infoForm" class="space-y-4">
                <input type="hidden" id="infoId">
                <div>
                    <label for="inputTitle" class="block font-medium text-gray-700">Judul Laporan</label>
                    <input type="text" id="inputTitle" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="inputCategory" class="block font-medium text-gray-700">Kategori</label>
                        <select id="inputCategory" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                            <option value="Konservasi">Konservasi</option>
                            <option value="Riset">Riset</option>
                            <option value="Ekowisata">Ekowisata</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                    <div>
                        <label for="inputDate" class="block font-medium text-gray-700">Tanggal</label>
                        <input type="date" id="inputDate" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                    </div>
                </div>
                <div>
                    <label for="inputContent" class="block font-medium text-gray-700">Isi Konten</label>
                    <textarea id="inputContent" rows="4" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required></textarea>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" id="submitInfoButton" class="bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition">Simpan Data</button>
                    <button type="button" onclick="hideInfoForm()" class="bg-gray-300 text-text-dark font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition">Batal</button>
                </div>
            </form>
        </div>
        
        <div class="bg-white rounded-xl shadow-xl overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-green-100">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">No</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Judul</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider hidden sm:table-cell">Kategori</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider hidden md:table-cell">Tanggal</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${listRows.length > 0 ? listRows : `<tr><td colspan="5" class="text-center py-8 text-gray-500">Data Kosong. Silakan tambah data baru.</td></tr>`}
                </tbody>
            </table>
        </div>
    `;
}

function renderManageReservasi() {
    const listRows = reservasiData.map((item, index) => `
        <tr class="border-b hover:bg-green-50/50 transition">
            <td class="px-6 py-4 font-medium text-text-dark">${index + 1}</td>
            <td class="px-6 py-4">${item.name}</td>
            <td class="px-6 py-4 hidden sm:table-cell">${item.date}</td>
            <td class="px-6 py-4">${item.tickets} Tiket</td>
            <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full 
                    ${item.status === 'Confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}">
                    ${item.status}
                </span>
            </td>
            <td class="px-6 py-4 space-x-2">
                <button onclick="editReservasi(${item.id})" class="text-accent-blue hover:text-blue-700 p-1 rounded-full">
                    <span data-lucide="square-pen" class="w-5 h-5"></span>
                </button>
                <button onclick="deleteReservasi(${item.id})" class="text-red-500 hover:text-red-700 p-1 rounded-full">
                    <span data-lucide="trash-2" class="w-5 h-5"></span>
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <h1 class="text-4xl font-bold text-primary-green mb-6">Kelola Reservasi Pengunjung</h1>
        <p class="text-lg text-gray-600 mb-8">Kelola dan pantau data pemesanan tiket dari pengunjung.</p>

        <button onclick="showReservasiForm()" class="bg-secondary-yellow text-text-dark font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition mb-8 flex items-center">
            <span data-lucide="plus-circle" class="w-5 h-5 mr-2"></span> Tambah Data Reservasi
        </button>

        <div id="reservasiFormContainer" class="bg-white p-6 rounded-xl shadow-xl mb-10 hidden">
            <h3 id="reservasiFormTitle" class="text-2xl font-semibold text-text-dark mb-4">Tambah Reservasi Baru</h3>
            <form id="reservasiForm" class="space-y-4">
                <input type="hidden" id="reservasiId">
                <div>
                    <label for="inputName" class="block font-medium text-gray-700">Nama Pengunjung</label>
                    <input type="text" id="inputName" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="inputRsvDate" class="block font-medium text-gray-700">Tanggal Kunjungan</label>
                        <input type="date" id="inputRsvDate" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                    </div>
                    <div>
                        <label for="inputTickets" class="block font-medium text-gray-700">Jumlah Tiket</label>
                        <input type="number" id="inputTickets" min="1" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                    </div>
                    <div>
                        <label for="inputStatus" class="block font-medium text-gray-700">Status</label>
                        <select id="inputStatus" class="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-primary-green focus:border-primary-green" required>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" id="submitReservasiButton" class="bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition">Simpan Reservasi</button>
                    <button type="button" onclick="hideReservasiForm()" class="bg-gray-300 text-text-dark font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition">Batal</button>
                </div>
            </form>
        </div>
        
        <div class="bg-white rounded-xl shadow-xl overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-green-100">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">No</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Nama Pengunjung</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider hidden sm:table-cell">Tanggal Kunjungan</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Jumlah Tiket</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-semibold text-primary-green uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${listRows.length > 0 ? listRows : `<tr><td colspan="6" class="text-center py-8 text-gray-500">Belum ada data reservasi.</td></tr>`}
                </tbody>
            </table>
        </div>
    `;
}

/* LEGACY CRUD FUNCTIONS - DISABLED TO PREVENT CONFLICTS WITH Standalone Dashboard 
function showInfoForm(isEditing = false) { ... }
...
*/

// function deleteReservasi(id) {
//     const isConfirmed = confirm('Anda yakin ingin menghapus data reservasi ini?');
//     if (isConfirmed) {
//         reservasiData = reservasiData.filter(d => d.id !== id);
//         saveReservasiData();
//         // Refresh Admin View
//         window.location.hash = 'admin/manage_reservasi';
//     }
// }


// --- 8. INISIALISASI ---

document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // 1. Tangani Header di semua halaman MPA
    handleHybridHeader(isLoggedIn);

    // 2. Fetch Data dari API Server
    await fetchPublicData();

    // 3. Pasang Event Listener Form spesifik per halaman (Login/Register)
    // loginForm ditangani langsung di login.html
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', handleRegistration);
    }

    // 4. Jalankan Routing untuk Konten Dinamis (index.html, berita.html)
    handleRouting();

    // 5. Tambahkan Listener untuk Hash Change (di index.html dan berita.html)
    window.addEventListener('hashchange', handleRouting);
});

function refreshPublicInfo() {
    const section = document.getElementById('informasi-ringkas');
    if (!section) return;

    section.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-4xl font-bold text-center text-primary-green mb-12">Informasi Ringkas</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${infoData.slice(0, 3).map((item, index) => {
        const imageIndex = (index % 4) + 1;
        let imageClass = `card-img-${imageIndex}`;
        return `
                        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:translate-y-[-5px]">
                            <div class="${imageClass} h-48 bg-cover bg-center rounded-t-xl"></div>
                            <div class="p-6">
                                <h3 class="text-2xl font-semibold text-text-dark mb-3 truncate">${item.title}</h3>
                                <div class="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                                    <span class="flex items-center"><span data-lucide="tag" class="w-4 h-4 mr-1"></span> ${item.category}</span>
                                </div>
                                <p class="text-gray-600 line-clamp-3 mb-4">${item.content}</p>
                                <a href="berita.html#detail/${item.id}" class="inline-flex items-center text-accent-blue hover:text-blue-700 font-medium">
                                    Baca Selengkapnya <span data-lucide="arrow-right" class="ml-2 w-4 h-4"></span>
                                </a>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
            <div class="text-center mt-10">
                <a href="berita.html" class="inline-flex items-center bg-primary-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md">
                    Lihat Semua Laporan
                    <span data-lucide="external-link" class="ml-2 w-4 h-4"></span>
                </a>
            </div>
        </div>
    `;
    lucide.createIcons();
}
// Setelah simpan / hapus / update
refreshPublicInfo();

function initWeatherWidget() {
    const widget = document.getElementById('weatherWidget');
    if (!widget) return;

    // Use Open-Meteo API (No Key Required) - Lat/Lon Tesso Nilo approx
    const apiURL = "https://api.open-meteo.com/v1/forecast?latitude=-0.1&longitude=101.5&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok";

    // Fallback Function if API fails
    const useFallback = () => {
        widget.classList.remove('hidden');
        widget.classList.add('flex');
        document.getElementById('weatherTemp').textContent = "29°C"; // Avg Forecast
        document.getElementById('weatherDesc').textContent = "Cerah Berawan";
        document.getElementById('weatherIcon').innerHTML = `<i data-lucide="cloud-sun" class="w-5 h-5 text-yellow-400"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // Fetch with Timeout (3s)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch(apiURL, { signal: controller.signal })
        .then(res => {
            if (!res.ok) throw new Error('API Error');
            return res.json();
        })
        .then(data => {
            clearTimeout(timeoutId);
            const current = data.current;
            const temp = Math.round(current.temperature_2m);
            const code = current.weather_code;

            widget.classList.remove('hidden');
            widget.classList.add('flex');

            document.getElementById('weatherTemp').textContent = `${temp}°C`;

            let desc = "Cerah";
            let icon = "sun";
            let color = "text-yellow-400";

            // WMO Weather Codes simplified
            if (code > 1) { desc = "Berawan"; icon = "cloud"; color = "text-gray-300"; }
            if (code > 40) { desc = "Kabut"; icon = "cloud-fog"; color = "text-gray-400"; }
            if (code > 50) { desc = "Gerimis"; icon = "cloud-drizzle"; color = "text-blue-300"; }
            if (code > 60) { desc = "Hujan"; icon = "cloud-rain"; color = "text-blue-400"; }
            if (code >= 80) { desc = "Hujan Deras"; icon = "cloud-lightning"; color = "text-blue-500"; }
            if (code >= 95) { desc = "Badai"; icon = "cloud-lightning"; color = "text-purple-400"; }

            document.getElementById('weatherDesc').textContent = desc;
            document.getElementById('weatherIcon').innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 ${color} animate-pulse"></i>`;

            lucide.createIcons();
        })
        .catch(err => {
            clearTimeout(timeoutId);
            console.warn("Weather fetch failed/timeout, using fallback.");
            useFallback();
        });
}
// Auto Run Weather
document.addEventListener('DOMContentLoaded', initWeatherWidget);

/* ===== FOOTER FUNCTIONS ===== */
function getFooter() {
    return `
    <footer id="mainFooter" style="background-color: #052e16;" class="text-white font-sans relative z-50 border-t border-white/10">
        <div class="max-w-7xl mx-auto px-6 py-16">
             <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
                <!-- Data -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3">
                         <i data-lucide="trees" class="w-10 h-10 text-yellow-500"></i>
                         <div class="leading-tight">
                            <h3 class="text-2xl font-bold uppercase tracking-wider text-white">Tesso Nilo</h3>
                            <p class="text-xs text-yellow-500 font-bold tracking-[0.2em] uppercase">National Park</p>
                         </div>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        Kawasan konservasi seluas 385.803 hektar. Benteng terakhir habitat Gajah dan Harimau Sumatera.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition"><i data-lucide="facebook" class="w-5 h-5"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition"><i data-lucide="instagram" class="w-5 h-5"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition"><i data-lucide="twitter" class="w-5 h-5"></i></a>
                    </div>
                </div>
                
                <!-- Links -->
                <div>
                     <h4 class="text-lg font-bold uppercase mb-6 text-yellow-500 tracking-wider">Navigasi</h4>
                     <ul class="space-y-3 text-gray-300 text-sm">
                        <li><a href="index.html" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Beranda</a></li>
                        <li><a href="about.html" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Tentang Kami</a></li>
                        <li><a href="spesies.html" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Biodiversitas</a></li>
                        <li><a href="berita.html" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Berita Terkini</a></li>
                     </ul>
                </div>

                 <div>
                      <h4 class="text-lg font-bold uppercase mb-6 text-yellow-500 tracking-wider">Informasi</h4>
                      <ul class="space-y-3 text-gray-300 text-sm">
                         <li><a href="booking.html" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Booking Tiket</a></li>
                         <li><a href="visitor-info.html#rules" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Aturan Pengunjung</a></li>
                         <li><a href="visitor-info.html#map" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Peta Kawasan</a></li>
                         <li><a href="visitor-info.html#contact" class="hover:text-white transition flex items-center gap-2"><i data-lucide="chevron-right" class="w-4 h-4 text-yellow-500"></i> Kontak Darurat</a></li>
                      </ul>
                 </div>

                <!-- Contact -->
                <div>
                     <h4 class="text-lg font-bold uppercase mb-6 text-yellow-500 tracking-wider">Hubungi Kami</h4>
                     <div class="space-y-4 text-gray-300 text-sm">
                        <div class="flex gap-3">
                            <i data-lucide="map-pin" class="w-5 h-5 text-green-500 shrink-0"></i>
                            <p>Kuantan Singingi, Riau<br>Indonesia 28612</p>
                        </div>
                        <div class="flex gap-3">
                            <i data-lucide="mail" class="w-5 h-5 text-green-500 shrink-0"></i>
                            <p>info@tessonilo.go.id</p>
                        </div>
                        <div class="flex gap-3">
                            <i data-lucide="phone" class="w-5 h-5 text-green-500 shrink-0"></i>
                            <p>+62 761 XXXXXX</p>
                        </div>
                     </div>
                </div>
             </div>
             
             <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <div class="text-center md:text-left">
                    <p>&copy; 2026 Taman Nasional Tesso Nilo. All rights reserved.</p>
                    <p class="mt-1 text-gray-500">Damar Satriatama Putra - 23552011300<br>TIF RP 23 CNS A</p>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>System Operational</span>
                </div>
             </div>
             
             <button id="scrollToTopBtn" class="fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 text-black rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition hidden z-50 flex items-center justify-center">
                <i data-lucide="arrow-up" class="w-6 h-6"></i>
            </button>
        </div>
    </footer>
    `;
}

function handleFooter() {
    const footerEl = document.getElementById('mainFooter');

    // Check jika dashboard/admin
    if (window.location.hash.includes('admin') ||
        window.location.pathname.includes('dashboard') ||
        document.body.classList.contains('admin-page')) {
        return;
    }

    if (!footerEl) {
        const footer = getFooter();
        document.body.insertAdjacentHTML('beforeend', footer);

        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 50);
        }

        const scrollBtn = document.getElementById('scrollToTopBtn');
        if (scrollBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) scrollBtn.classList.remove('hidden');
                else scrollBtn.classList.add('hidden');
            });
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
}
