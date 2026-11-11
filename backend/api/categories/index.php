<?php
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

function cleanInput($data) {
    return htmlspecialchars(strip_tags($data));
}

switch ($method) {
    case 'GET':
        try {
            $supplier_id = isset($_GET['supplier_id']) ? $_GET['supplier_id'] : null;
            if (!$supplier_id) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Supplier ID is required."]);
                exit;
            }

            $query = "SELECT * FROM supplier_categories WHERE supplier_id = :supplier_id ORDER BY id ASC";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':supplier_id', $supplier_id);
            $stmt->execute();
            
            $data = $stmt->fetchAll();
            echo json_encode(["status" => "success", "data" => $data]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['supplier_id']) || empty($data['category_name'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Supplier ID and Category Name are required."]);
                exit;
            }

            $query = "INSERT INTO supplier_categories (supplier_id, category_name, description) 
                      VALUES (:supplier_id, :category_name, :description)";
            $stmt = $db->prepare($query);

            $stmt->execute([
                ':supplier_id' => cleanInput($data['supplier_id']),
                ':category_name' => cleanInput($data['category_name']),
                ':description' => cleanInput($data['description'] ?? '')
            ]);

            echo json_encode(["status" => "success", "message" => "Category added successfully."]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $id = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$id || empty($data['category_name'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID and Category Name are required."]);
                exit;
            }

            $query = "UPDATE supplier_categories SET category_name = :category_name, description = :description WHERE id = :id";
            $stmt = $db->prepare($query);

            $stmt->execute([
                ':category_name' => cleanInput($data['category_name']),
                ':description' => cleanInput($data['description'] ?? ''),
                ':id' => $id
            ]);

            echo json_encode(["status" => "success", "message" => "Category updated successfully."]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        try {
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            if (!$id) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID is required."]);
                exit;
            }

            $query = "DELETE FROM supplier_categories WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Category deleted successfully."]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method not allowed."]);
        break;
}
?>