<?php
// tes_koneksi.php
// Matikan error reporting sejenak agar bersih
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Diagnosa Koneksi Server</h1>";
echo "<hr>";

// 1. Tes PHP Dasar
echo "<p>✅ <strong>PHP Running:</strong> Versi " . phpversion() . "</p>";

// 2. Tes Koneksi Database dengan Timeout Cepat
$host = 'localhost';
$user = 'root';
$pass = ''; // Default password

echo "<p>🔄 <strong>Mencoba menghubungkan ke Database...</strong></p>";

try {
    // Set timeout 2 detik saja
    $mysqli = mysqli_init();
    $mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 3);
    
    // Coba connect (suppress warning dengan @)
    $link = @$mysqli->real_connect($host, $user, $pass);
    
    if ($link) {
        echo "<h2 style='color:green'>✅ SUKSES: Koneksi Database Berhasil!</h2>";
        echo "<p>Server MySQL Anda aktif dan bisa diakses.</p>";
        $mysqli->close();
    } else {
        throw new Exception($mysqli->connect_error);
    }
} catch (Exception $e) {
    echo "<h2 style='color:red'>❌ GAGAL: Tidak bisa connect ke Database!</h2>";
    echo "<div style='background:#fee; border:1px solid red; padding:10px;'>";
    echo "<strong>Penyebab:</strong> " . $e->getMessage() . "<br><br>";
    echo "<strong>Solusi:</strong><br>";
    echo "1. Buka <b>XAMPP Control Panel</b>.<br>";
    echo "2. Pastikan module <b>MySQL</b> sudah di-klik <b>Start</b> dan berwarna <b>Hijau</b>.<br>";
    echo "3. Jika password root Anda bukan kosong, beri tahu saya.";
    echo "</div>";
}
?>
