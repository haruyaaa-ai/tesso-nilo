<?php
require_once '../../config/database.php';

if (!isLoggedIn()) {
    sendResponse(false, 'Unauthorized', null, 401);
}

$user_id = getUserId();
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    sendResponse(false, 'Invalid input', null, 400);
}

$full_name = isset($data['full_name']) ? trim($data['full_name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$new_password = isset($data['password']) ? $data['password'] : '';

if (empty($full_name) || empty($email)) {
    sendResponse(false, 'Nama Lengkap dan Email wajib diisi', null, 400);
}

// Check if email is already taken by another user
$check_sql = "SELECT id FROM users WHERE email = ? AND id != ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("si", $email, $user_id);
$check_stmt->execute();
if ($check_stmt->get_result()->num_rows > 0) {
    sendResponse(false, 'Email sudah digunakan oleh pengguna lain', null, 400);
}

// Build query
if (!empty($new_password)) {
    $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);
    $sql = "UPDATE users SET full_name = ?, email = ?, phone = ?, password = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $full_name, $email, $phone, $hashed_password, $user_id);
} else {
    $sql = "UPDATE users SET full_name = ?, email = ?, phone = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $full_name, $email, $phone, $user_id);
}

if ($stmt->execute()) {
    // Update session data
    $_SESSION['full_name'] = $full_name;
    $_SESSION['email'] = $email;
    sendResponse(true, 'Profil berhasil diperbarui');
} else {
    sendResponse(false, 'Gagal memperbarui profil: ' . $conn->error, null, 500);
}
