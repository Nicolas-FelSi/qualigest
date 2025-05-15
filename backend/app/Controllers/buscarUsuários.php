<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Tratamento para requisição OPTIONS (CORS)
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


require_once __DIR__ . '/../../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Pega o parâmetro de busca
$nome = isset($_GET['nome']) ? trim($_GET['nome']) : '';

if (empty($nome)) {
    echo json_encode([]);
    exit;
}

// Consulta os usuários pelo nome (evita retornar o próprio usuário logado)
$query = "SELECT id_usuario, nome FROM usuarios 
          WHERE nome LIKE :nome AND id_usuario != :id_atual 
          LIMIT 10";

$stmt = $db->prepare($query);
$nomeBusca = '%' . $nome . '%';
$stmt->bindParam(':nome', $nomeBusca);
$stmt->bindParam(':id_atual', $_SESSION['usuario_id']);
$stmt->execute();

$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultados);
