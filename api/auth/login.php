<?php
// api/auth/login.php

// 1. Matikan error display agar tidak merusak JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

// 2. Set Header JSON
header('Content-Type: application/json');

// 3. Include Config
require_once '../../config/database.php';

// 4. Debugging Log (Optional, tulis ke file)
function logDebug($msg) {
    file_put_contents('debug_login.log', date('Y-m-d H:i:s') . " - " . $msg . "\n", FILE_APPEND);
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Method Not Allowed', 405);
    }

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    
    // Fallback jika JSON decode gagal (kadang $_POST dikirim form-data)
    if (!$data && !empty($_POST)) {
        $data = $_POST;
    }

    if (!isset($data['username']) || !isset($data['password'])) {
        throw new Exception('Username dan Password wajib diisi', 400);
    }

    $username = trim($data['username']);
    $password = trim($data['password']);

    // Query DB
    $sql = "SELECT id, username, email, password, full_name, role FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    if(!$stmt) throw new Exception("Database Prepare Error: " . $conn->error);

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        // Delay sedikit untuk mencegah brute force timing attack
        usleep(100000); 
        throw new Exception('Username tidak ditemukan', 401);
    }

    $user = $result->fetch_assoc();

    if (!password_verify($password, $user['password'])) {
        usleep(100000);
        throw new Exception('Password salah', 401);
    }

    // Login Sukses
    // Set Session (jika perlu stateful)
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['is_logged_in'] = true;
    $_SESSION['login_time'] = time();

    // Return Data
    echo json_encode([
        'success' => true,
        'message' => 'Login Berhasil',
        'data' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'full_name' => $user['full_name'],
            'role' => $user['role'],
            'redirect' => ($user['role'] === 'admin') ? 'dashboard.html' : 'index.html'
        ]
    ]);

} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
