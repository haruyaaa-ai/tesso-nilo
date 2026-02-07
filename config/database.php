<?php
// Prevent any output before headers
ob_start();

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'tesso_nilo_db');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    header('Content-Type: application/json');
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Set charset
$conn->set_charset("utf8");

// Session configuration - MUST be before any output
ini_set('session.gc_maxlifetime', 3600);
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'domain' => '',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);
// Omit explicit cookie params on local to let PHP handle it if needed, or keep it broad

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Enable CORS for API requests with credentials
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Helper function to check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

// Helper function to check if user is admin
function isAdmin() {
    return isset($_SESSION['role']) && (strtolower($_SESSION['role']) === 'admin');
}

// Helper function to get user ID from session
function getUserId() {
    return isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
}

// Helper function to set user session variables after successful login
function setUserSession($user) { // Login Sukses
    // Set Session (jika perlu stateful)
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['is_logged_in'] = true;
    $_SESSION['login_time'] = time();
}

// Helper function for JSON response
function sendResponse($success, $message, $data = null, $statusCode = 200) {
    // Clear buffer to ensure only JSON is sent
    if (ob_get_length()) ob_clean();
    
    http_response_code($statusCode);
    header('Content-Type: application/json');
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data
    ];
    echo json_encode($response);
    exit();
}

