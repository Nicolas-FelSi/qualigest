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

if (empty($data['id_projeto']) || empty($data['nome_projeto']) || !isset($data['participantes'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Dados obrigatórios ausentes.']);
    exit;
}

$id_projeto = $data['id_projeto'];
$nome_projeto = trim($data['nome_projeto']);
$pontuacao_projeto = $data['pontuacao_projeto'] ?? 0;
$participantesNovos = $data['participantes']; // Array de IDs
$id_usuario_lider = $data['id_lider'] ?? $_SESSION['usuario_id'];

$database = new Database();
$db = $database->getConnection();

$projetoDAO = new ProjetoDAO($db);
$usuarioProjetoDAO = new UsuarioProjetoDAO($db);

// Atualiza nome, pontuação e líder do projeto
$projetoAtualizado = $projetoDAO->atualizarProjeto($id_projeto, $nome_projeto, $pontuacao_projeto, $id_usuario_lider);

// Busca participantes atuais do projeto
$query = "SELECT id_usuario FROM participantesprojeto WHERE id_projeto = :id_projeto";
$stmt = $db->prepare($query);
$stmt->bindParam(':id_projeto', $id_projeto);
$stmt->execute();
$participantesAtuais = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Determina quem adicionar e remover
$adicionar = array_diff($participantesNovos, $participantesAtuais);
$remover = array_diff($participantesAtuais, $participantesNovos);

// Insere os novos participantes
foreach ($adicionar as $id_usuario) {
    $usuarioProjetoDAO->inserirAssociacao($id_usuario, $id_projeto);
}

// Remove os participantes que saíram
foreach ($remover as $id_usuario) {
    $usuarioProjetoDAO->excluirAssociacao($id_usuario, $id_projeto);
}

if ($projetoAtualizado) {
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Projeto atualizado com sucesso.']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao atualizar projeto.']);
}
