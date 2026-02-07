<?php
// setup_auto.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$user = 'root';
$pass = ''; // Default XAMPP password

echo "<h1>Setup Database Otomatis</h1>";
echo "<pre>";

// 1. Connect to Server
$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    die("Koneksi MySQL Gagal: " . $conn->connect_error . "\nPastikan XAMPP MySQL sudah Start!");
}
echo "Koneksi ke MySQL Sukses.\n";

// 2. Create Database
$dbName = 'tesso_nilo_db';
$sql = "CREATE DATABASE IF NOT EXISTS $dbName";
if ($conn->query($sql) === TRUE) {
    echo "Database '$dbName' siap.\n";
} else {
    die("Error creating database: " . $conn->error);
}

// 3. Select Database
$conn->select_db($dbName);

// 4. Create Tables
$tables = [
    "users" => "CREATE TABLE IF NOT EXISTS users (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role ENUM('admin','customer') DEFAULT 'customer',
        phone VARCHAR(15),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    "berita" => "CREATE TABLE IF NOT EXISTS berita (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content LONGTEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        image VARCHAR(255),
        created_by INT(11)
    )",
    "reservasi" => "CREATE TABLE IF NOT EXISTS reservasi (
        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11),
        name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(15),
        date_booking DATE,
        tickets INT,
        total_price DECIMAL(10,2),
        status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )"
];

foreach ($tables as $name => $sql) {
    if ($conn->query($sql) === TRUE) {
        echo "Tabel '$name' siap.\n";
    } else {
        echo "Error creating table $name: " . $conn->error . "\n";
    }
}

// 5. Insert Default Admin if not exists
$adminPass = password_hash('12345', PASSWORD_DEFAULT);
$checkAdmin = "SELECT * FROM users WHERE username='admin'";
if ($conn->query($checkAdmin)->num_rows == 0) {
    $sqlAdmin = "INSERT INTO users (username, email, password, full_name, role) 
                 VALUES ('admin', 'admin@tessonilo.com', '$adminPass', 'Administrator', 'admin')";
    if ($conn->query($sqlAdmin) === TRUE) {
        echo "User 'admin' (password: 12345) berhasil dibuat.\n";
    } else {
        echo "Error creating admin: " . $conn->error . "\n";
    }
} else {
    echo "User 'admin' sudah ada. Skip.\n";
}

// 6. Insert Default User if not exists
$userPass = password_hash('12345', PASSWORD_DEFAULT);
$checkUser = "SELECT * FROM users WHERE username='pengunjung'";
if ($conn->query($checkUser)->num_rows == 0) {
    $sqlUser = "INSERT INTO users (username, email, password, full_name, role) 
                 VALUES ('pengunjung', 'user@tessonilo.com', '$userPass', 'Pengunjung', 'customer')";
    if ($conn->query($sqlUser) === TRUE) {
        echo "User 'pengunjung' (password: 12345) berhasil dibuat.\n";
    } else {
        echo "Error creating visitor: " . $conn->error . "\n";
    }
} else {
    echo "User 'pengunjung' sudah ada. Skip.\n";
}

echo "</pre>";
echo "<h2>Setup Selesai!</h2>";
echo "<p><a href='login.html' style='background:green; color:white; padding:10px; text-decoration:none; border-radius:5px;'>Ke Halaman Login ></a></p>";
?>
