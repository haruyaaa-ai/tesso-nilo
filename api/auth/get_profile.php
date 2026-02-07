<?php
require_once '../../config/database.php';

if (!isLoggedIn()) {
    sendResponse(false, 'Unauthorized', null, 401);
}

$user_id = getUserId();

$sql = "SELECT id, username, email, full_name, role, phone, created_at FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    sendResponse(true, 'Profile loaded', $user);
} else {
    sendResponse(false, 'User not found', null, 404);
}
