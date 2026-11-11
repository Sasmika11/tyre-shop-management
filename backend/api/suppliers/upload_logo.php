<?php
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $supplier_id = isset($_POST['supplier_id']) ? $_POST['supplier_id'] : null;

    if (!$supplier_id || !isset($_FILES['logo'])) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Supplier ID and Logo file are required."]);
        exit;
    }

    $target_dir = "../../uploads/supplier-logos/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $file_extension = strtolower(pathinfo($_FILES["logo"]["name"], PATHINFO_EXTENSION));
    $valid_extensions = array("jpg", "jpeg", "png", "webp");

    if (!in_array($file_extension, $valid_extensions)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid file format. Only JPG, JPEG, PNG, and WEBP are allowed."]);
        exit;
    }

    // Generate a unique name to prevent overwriting
    $new_filename = "logo_sup_" . $supplier_id . "_" . time() . "." . $file_extension;
    $target_file = $target_dir . $new_filename;

    if (move_uploaded_file($_FILES["logo"]["tmp_name"], $target_file)) {
        // Save the relative path to the database
        $db_path = "uploads/supplier-logos/" . $new_filename;
        
        $query = "UPDATE suppliers SET logo_path = :logo_path WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->execute([
            ':logo_path' => $db_path,
            ':id' => $supplier_id
        ]);

        echo json_encode(["status" => "success", "message" => "Logo uploaded successfully.", "path" => $db_path]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to upload file."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
}
?>