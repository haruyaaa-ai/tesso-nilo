<?php
require_once 'config/database.php';
header('Content-Type: application/json');
echo json_encode([
    'session' => $_SESSION,
    'isLoggedIn' => isLoggedIn(),
    'session_id' => session_id()
]);
?>
