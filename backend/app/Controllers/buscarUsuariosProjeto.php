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

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../Models/DAO/UsuarioProjetoDAO.php';

session_start();

// Verifica se o usuário está logado
if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}


if (!isset($_GET['id_projeto'])) {
    http_response_code(400);
    echo json_encode(['erro' => 'ID do projeto não informado']);
    exit;
}

$id_projeto = $_GET['id_projeto'];

$database = new Database();
$db = $database->getConnection();

$usuarioProjetoDAO = new UsuarioProjetoDAO($db);
$usuarios = $usuarioProjetoDAO->buscarUsuariosPorProjeto($id_projeto);

// Retorna diretamente os dados necessários (já com id, nome, nick e foto)
echo json_encode($usuarios);
