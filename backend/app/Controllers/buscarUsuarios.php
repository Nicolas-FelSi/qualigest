<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

// Pega o parâmetro de busca (GET)
$nome = isset($_GET['nome']) ? trim($_GET['nome']) : '';

try {
    // Monta a consulta base
    $query = "SELECT id_usuario, nome_usuario FROM usuarios WHERE id_usuario != :id_atual";

    // Se houver nome digitado, adiciona cláusula de busca
    if (!empty($nome)) {
        $query .= " AND nome LIKE :nome";
    }

    // Limita os resultados
    $query .= " LIMIT 10";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':id_atual', $_SESSION['usuario_id'], PDO::PARAM_INT);

    if (!empty($nome)) {
        $nomeBusca = '%' . $nome . '%';
        $stmt->bindParam(':nome', $nomeBusca, PDO::PARAM_STR);
    }

    $stmt->execute();
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($usuarios);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao buscar usuários.', 'detalhes' => $e->getMessage()]);
}
