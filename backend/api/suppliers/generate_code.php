<?php
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT supplier_code FROM suppliers ORDER BY id DESC LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $nextCode = "SUP001";
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch();
        $lastCode = $row['supplier_code'];
        // Extract the numeric part and increment
        $number = (int) str_replace('SUP', '', $lastCode);
        $nextCode = 'SUP' . str_pad($number + 1, 3, '0', STR_PAD_LEFT);
    }

    echo json_encode(["status" => "success", "data" => $nextCode]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>