<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/DAO/ProjetoDAO.php';
require_once __DIR__ . '/../Models/DAO/UsuarioProjetoDAO.php';

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_projeto'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID do projeto é obrigatório.']);
    exit;
}

$id_projeto = $data['id_projeto'];

$database = new Database();
$db = $database->getConnection();

$projetoDAO = new ProjetoDAO($db);
$usuarioProjetoDAO = new UsuarioProjetoDAO($db);

// Exclui todas as associações do projeto com usuários
$query = "DELETE FROM participantesprojeto WHERE id_projeto = :id_projeto";
$stmt = $db->prepare($query);
$stmt->bindParam(':id_projeto', $id_projeto);
$stmt->execute();

// Agora exclui o projeto
$projetoExcluido = $projetoDAO->excluirProjeto($id_projeto);

if ($projetoExcluido) {
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Projeto excluído com sucesso.']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao excluir projeto.']);
}
