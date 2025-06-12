<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

require_once '../../config/database.php';

$data = json_decode(file_get_contents('php://input'), true);
$id_tarefa = $data['id_tarefa'] ?? null;

if (!$id_tarefa) {
    http_response_code(400);
    echo json_encode(['erro' => 'ID da tarefa não fornecido.']);
    exit;
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Atualiza o status para "concluído"
    $stmt = $conn->prepare("UPDATE Tarefas SET status = 'concluído' WHERE id_tarefa = :id");
    $stmt->bindParam(':id', $id_tarefa);
    $stmt->execute();

    echo json_encode(['mensagem' => 'Tarefa concluída.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao concluir tarefa.', 'detalhes' => $e->getMessage()]);
}
