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

// Verifica se o usuário está autenticado
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['status' => 'erro', 'mensagem' => 'Não autenticado']);
    exit;
}

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/classes/Projeto.php';
require_once __DIR__ . '/../Models/DAO/ProjetoDAO.php';
require_once __DIR__ . '/../Models/classes/Usuarioprojeto.php';
require_once __DIR__ . '/../Models/DAO/UsuarioProjetoDAO.php';

$id_usuario = $_SESSION['usuario_id'];

// Conexão com o banco
$database = new Database();
$db = $database->getConnection();

$projetoDAO = new ProjetoDAO($db);

// Busca os projetos que o usuário participa
$query = "SELECT p.id_projeto, p.nome_projeto, p.pontuacao_projeto, p.id_usuario AS id_lider
          FROM projetos p
          INNER JOIN participantesprojeto up ON p.id_projeto = up.id_projeto
          WHERE up.id_usuario = :id_usuario";

$stmt = $db->prepare($query);
$stmt->bindParam(':id_usuario', $id_usuario);
$stmt->execute();

$projetos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'sucesso', 'projetos' => $projetos]);


?>