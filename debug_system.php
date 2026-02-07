<?php
// debug_system.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h3>System Diagnostic</h3>";

// 1. Check Config File
$configPath = 'config/database.php';
if (file_exists($configPath)) {
    echo "<p>[OK] Config file found at $configPath</p>";
    require_once $configPath;
    echo "<p>[OK] Config file included successfully</p>";
} else {
    echo "<p style='color:red'>[FAIL] Config file not found at $configPath</p>";
    exit;
}

// 2. Check Database Connection
if ($conn) {
    echo "<p>[OK] Database object created</p>";
    if ($conn->connect_error) {
        echo "<p style='color:red'>[FAIL] Connection error: " . $conn->connect_error . "</p>";
    } else {
        echo "<p>[OK] Connected to database: " . DB_NAME . "</p>";
    }
} else {
    echo "<p style='color:red'>[FAIL] Database object is null</p>";
}

// 3. User Check
$sql = "SELECT * FROM users WHERE username = 'admin'";
$result = $conn->query($sql);
if ($result) {
    echo "<p>[OK] Query executed. Rows: " . $result->num_rows . "</p>";
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo "<p>[OK] Admin user found. Hash: " . substr($user['password'], 0, 10) . "...</p>";
        
        // 4. Password Verify
        $pass = '12345';
        if (password_verify($pass, $user['password'])) {
            echo "<p style='color:green'>[PASS] Password '12345' verification SUCCESS</p>";
        } else {
            echo "<p style='color:red'>[FAIL] Password '12345' verification FAILED</p>";
            // Try updating hash
            $newHash = password_hash('12345', PASSWORD_DEFAULT);
            echo "<p>Suggested Hash for 12345: $newHash</p>";
        }
    } else {
        echo "<p style='color:red'>[FAIL] User 'admin' not found.</p>";
    }
} else {
    echo "<p style='color:red'>[FAIL] Query failed: " . $conn->error . "</p>";
}

echo "<hr>";
echo "<h4>Try Login API directly via JS Fetch:</h4>";
?>
<button onclick="testLogin()">Test Login API Now</button>
<div id="result" style="background:#eee; padding:10px; margin-top:10px;"></div>

<script>
async function testLogin() {
    const resDiv = document.getElementById('result');
    resDiv.innerHTML = 'Testing...';
    try {
        const response = await fetch('api/auth/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: '12345' })
        });
        const text = await response.text();
        resDiv.innerHTML = '<strong>Status:</strong> ' + response.status + '<br><strong>Response:</strong> ' + text;
    } catch (e) {
        resDiv.innerHTML = 'Error: ' + e;
    }
}
</script>
