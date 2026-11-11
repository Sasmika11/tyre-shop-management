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

            $query = "SELECT * FROM supplier_documents WHERE supplier_id = :supplier_id ORDER BY id DESC";
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
        // Handling file upload along with metadata
        $supplier_id = isset($_POST['supplier_id']) ? $_POST['supplier_id'] : null;
        $document_name = isset($_POST['document_name']) ? cleanInput($_POST['document_name']) : '';
        $document_type = isset($_POST['document_type']) ? cleanInput($_POST['document_type']) : '';

        if (!$supplier_id || empty($document_name) || !isset($_FILES['document_file'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Supplier ID, Document Name, and File are required."]);
            exit;
        }

        $target_dir = "../../uploads/documents/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $file_extension = strtolower(pathinfo($_FILES["document_file"]["name"], PATHINFO_EXTENSION));
        $valid_extensions = array("pdf", "doc", "docx", "jpg", "jpeg", "png", "webp", "xls", "xlsx");

        if (!in_array($file_extension, $valid_extensions)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid file format."]);
            exit;
        }

        $new_filename = "doc_" . $supplier_id . "_" . time() . "." . $file_extension;
        $target_file = $target_dir . $new_filename;

        if (move_uploaded_file($_FILES["document_file"]["tmp_name"], $target_file)) {
            $db_path = "uploads/documents/" . $new_filename;
            
            try {
                $query = "INSERT INTO supplier_documents (supplier_id, document_name, document_type, file_path) 
                          VALUES (:supplier_id, :document_name, :document_type, :file_path)";
                $stmt = $db->prepare($query);
                
                $stmt->execute([
                    ':supplier_id' => $supplier_id,
                    ':document_name' => $document_name,
                    ':document_type' => $document_type,
                    ':file_path' => $db_path
                ]);

                echo json_encode(["status" => "success", "message" => "Document uploaded successfully.", "file_path" => $db_path]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => $e->getMessage()]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to upload file."]);
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

            // First, get the file path so we can delete the actual file
            $query_select = "SELECT file_path FROM supplier_documents WHERE id = :id";
            $stmt_select = $db->prepare($query_select);
            $stmt_select->bindParam(':id', $id);
            $stmt_select->execute();
            $doc = $stmt_select->fetch();

            if ($doc && !empty($doc['file_path'])) {
                $file_to_delete = "../../" . $doc['file_path'];
                if (file_exists($file_to_delete)) {
                    unlink($file_to_delete);
                }
            }

            $query = "DELETE FROM supplier_documents WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Document deleted successfully."]);
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