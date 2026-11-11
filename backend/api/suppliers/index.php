<?php
require_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Helper function to safely get data
function cleanInput($data) {
    return htmlspecialchars(strip_tags($data));
}

switch ($method) {
    case 'GET':
        try {
            if (isset($_GET['id'])) {
                // Get single supplier
                $query = "SELECT * FROM suppliers WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id', $_GET['id']);
                $stmt->execute();
                $data = $stmt->fetch();
                
                if ($data) {
                    echo json_encode(["status" => "success", "data" => $data]);
                } else {
                    http_response_code(404);
                    echo json_encode(["status" => "error", "message" => "Supplier not found."]);
                }
            } else {
                // Get all suppliers with optional search
                $search = isset($_GET['search']) ? cleanInput($_GET['search']) : '';
                $query = "SELECT id, supplier_code, supplier_name, phone_1, is_active FROM suppliers ";
                
                if (!empty($search)) {
                    $query .= "WHERE supplier_code LIKE :search OR supplier_name LIKE :search OR phone_1 LIKE :search ";
                }
                
                $query .= "ORDER BY id DESC";
                $stmt = $db->prepare($query);
                
                if (!empty($search)) {
                    $searchTerm = "%{$search}%";
                    $stmt->bindParam(':search', $searchTerm);
                }
                
                $stmt->execute();
                $data = $stmt->fetchAll();
                echo json_encode(["status" => "success", "data" => $data]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            
            if (empty($data['supplier_code']) || empty($data['supplier_name'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Supplier Code and Name are required."]);
                exit;
            }

            $query = "INSERT INTO suppliers (
                        supplier_code, supplier_name, short_name, category, contact_person, 
                        designation, phone_1, phone_2, email, website, address, city, 
                        district, postal_code, country, tax_no, credit_limit, payment_term, is_active
                      ) VALUES (
                        :supplier_code, :supplier_name, :short_name, :category, :contact_person, 
                        :designation, :phone_1, :phone_2, :email, :website, :address, :city, 
                        :district, :postal_code, :country, :tax_no, :credit_limit, :payment_term, :is_active
                      )";

            $stmt = $db->prepare($query);

            $stmt->execute([
                ':supplier_code' => cleanInput($data['supplier_code']),
                ':supplier_name' => cleanInput($data['supplier_name']),
                ':short_name' => cleanInput($data['short_name'] ?? ''),
                ':category' => cleanInput($data['category'] ?? ''),
                ':contact_person' => cleanInput($data['contact_person'] ?? ''),
                ':designation' => cleanInput($data['designation'] ?? ''),
                ':phone_1' => cleanInput($data['phone_1'] ?? ''),
                ':phone_2' => cleanInput($data['phone_2'] ?? ''),
                ':email' => cleanInput($data['email'] ?? ''),
                ':website' => cleanInput($data['website'] ?? ''),
                ':address' => cleanInput($data['address'] ?? ''),
                ':city' => cleanInput($data['city'] ?? ''),
                ':district' => cleanInput($data['district'] ?? ''),
                ':postal_code' => cleanInput($data['postal_code'] ?? ''),
                ':country' => cleanInput($data['country'] ?? 'Sri Lanka'),
                ':tax_no' => cleanInput($data['tax_no'] ?? ''),
                ':credit_limit' => cleanInput($data['credit_limit'] ?? 0.00),
                ':payment_term' => cleanInput($data['payment_term'] ?? 0),
                ':is_active' => isset($data['is_active']) ? (int)$data['is_active'] : 1
            ]);

            $lastId = $db->lastInsertId();
            echo json_encode(["status" => "success", "message" => "Supplier created successfully.", "id" => $lastId]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $id = isset($_GET['id']) ? $_GET['id'] : null;

            if (!$id || empty($data['supplier_name'])) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Supplier ID and Name are required."]);
                exit;
            }

            $query = "UPDATE suppliers SET 
                        supplier_name = :supplier_name, short_name = :short_name, category = :category, 
                        contact_person = :contact_person, designation = :designation, phone_1 = :phone_1, 
                        phone_2 = :phone_2, email = :email, website = :website, address = :address, 
                        city = :city, district = :district, postal_code = :postal_code, country = :country, 
                        tax_no = :tax_no, credit_limit = :credit_limit, payment_term = :payment_term, 
                        is_active = :is_active 
                      WHERE id = :id";

            $stmt = $db->prepare($query);

            $stmt->execute([
                ':supplier_name' => cleanInput($data['supplier_name']),
                ':short_name' => cleanInput($data['short_name'] ?? ''),
                ':category' => cleanInput($data['category'] ?? ''),
                ':contact_person' => cleanInput($data['contact_person'] ?? ''),
                ':designation' => cleanInput($data['designation'] ?? ''),
                ':phone_1' => cleanInput($data['phone_1'] ?? ''),
                ':phone_2' => cleanInput($data['phone_2'] ?? ''),
                ':email' => cleanInput($data['email'] ?? ''),
                ':website' => cleanInput($data['website'] ?? ''),
                ':address' => cleanInput($data['address'] ?? ''),
                ':city' => cleanInput($data['city'] ?? ''),
                ':district' => cleanInput($data['district'] ?? ''),
                ':postal_code' => cleanInput($data['postal_code'] ?? ''),
                ':country' => cleanInput($data['country'] ?? 'Sri Lanka'),
                ':tax_no' => cleanInput($data['tax_no'] ?? ''),
                ':credit_limit' => cleanInput($data['credit_limit'] ?? 0.00),
                ':payment_term' => cleanInput($data['payment_term'] ?? 0),
                ':is_active' => isset($data['is_active']) ? (int)$data['is_active'] : 1,
                ':id' => $id
            ]);

            echo json_encode(["status" => "success", "message" => "Supplier updated successfully."]);

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
                echo json_encode(["status" => "error", "message" => "Supplier ID is required."]);
                exit;
            }

            // The ON DELETE CASCADE in the database schema handles the related tab records
            $query = "DELETE FROM suppliers WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Supplier deleted successfully."]);

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