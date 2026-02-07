<?php
require_once '../../config/database.php';
require_once '../payment/config.php'; // Include Midtrans Config

// Check if user is logged in
if (!isLoggedIn()) {
    sendResponse(false, 'Authentication required', null, 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method', null, 405);
}

// Handle POST JSON (Preferred) or FormData
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
$data = [];
if (strpos($contentType, 'application/json') !== false) {
    $data = json_decode(file_get_contents("php://input"), true);
} else {
    $data = $_POST;
}

// Validate required fields
$required = ['name', 'email', 'phone', 'date_booking', 'tickets'];
foreach ($required as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        sendResponse(false, ucfirst($field) . ' is required', null, 400);
    }
}

// User Data
$user_id = $_SESSION['user_id'];
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$phone = $conn->real_escape_string($data['phone']);
$date_booking = $conn->real_escape_string($data['date_booking']);
$tickets = intval($data['tickets']);
$notes = isset($data['notes']) ? $conn->real_escape_string($data['notes']) : '';

// Calculate Price
$citizen_type = isset($data['citizen_type']) ? $data['citizen_type'] : 'wni';
$price_per_ticket = ($citizen_type === 'wna') ? 150000 : 15000;
$total_price = $tickets * $price_per_ticket;

// 1. Insert Reservation to DB (Status 'pending')
$sql = "INSERT INTO reservasi (user_id, name, email, phone, date_booking, tickets, citizen_type, total_price, notes, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issssisds", $user_id, $name, $email, $phone, $date_booking, $tickets, $citizen_type, $total_price, $notes);

if ($stmt->execute()) {
    $reservasi_id = $stmt->insert_id;
    
    $response = [
        'id' => $reservasi_id,
        'name' => $name,
        'tickets' => $tickets,
        'total_price' => $total_price,
        'status' => 'pending'
    ];
    
    sendResponse(true, 'Booking created. Proceed to payment.', $response, 201);
} else {
    sendResponse(false, 'Failed to create reservation: ' . $stmt->error, null, 500);
}
?>
