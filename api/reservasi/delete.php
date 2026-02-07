<?php
// Debugging: log request at the very beginning
file_put_contents(__DIR__ . '/delete_debug.log', date('Y-m-d H:i:s') . " - START DELETE.PHP\n", FILE_APPEND);

require_once '../../config/database.php';

// Check if user is logged in
if (!isLoggedIn()) {
    file_put_contents(__DIR__ . '/delete_debug.log', date('Y-m-d H:i:s') . " - Unauthenticated\n", FILE_APPEND);
    sendResponse(false, 'Authentication required', null, 401);
}

// Allow both DELETE and POST for maximum compatibility
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    file_put_contents(__DIR__ . '/delete_debug.log', date('Y-m-d H:i:s') . " - Invalid Method: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);
    sendResponse(false, 'Invalid request method', null, 405);
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Fallback to $_POST or $_GET
$id = null;
if (isset($data['id'])) $id = $data['id'];
else if (isset($_POST['id'])) $id = $_POST['id'];
else if (isset($_GET['id'])) $id = $_GET['id'];

// Debugging: log request data
file_put_contents(__DIR__ . '/delete_debug.log', date('Y-m-d H:i:s') . " - Input: $input - ID: $id - Session: " . json_encode($_SESSION) . "\n", FILE_APPEND);

if ($id === null || $id === '') {
    sendResponse(false, 'ID is required. Raw input: ' . $input, null, 400);
}

$id = intval($id);
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
$role = isset($_SESSION['role']) ? strtolower($_SESSION['role']) : '';
$is_admin = ($role === 'admin');

// Check if reservasi exists and user has permission
if ($is_admin) {
    $checkSql = "SELECT id FROM reservasi WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("i", $id);
} else {
    $checkSql = "SELECT id FROM reservasi WHERE id = ? AND user_id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("ii", $id, $user_id);
}

$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows === 0) {
    sendResponse(false, 'Reservasi not found or unauthorized', null, 404);
}

$sql = "DELETE FROM reservasi WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    sendResponse(true, 'Reservasi deleted successfully', ['id' => $id], 200);
} else {
    sendResponse(false, 'Failed to delete reservasi: ' . $stmt->error, null, 500);
}
?>
