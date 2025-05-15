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

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Models/DAO/TarefaDAO.php';
require_once __DIR__ . '/../Models/DAO/UsuarioTarefaDAO.php';

if (!isset($_GET['id_tarefa'])) {
    echo json_encode(['erro' => 'ID da tarefa não fornecido']);
    exit;
}

$id_tarefa = $_GET['id_tarefa'];

$db = new Database();
$conn = $db->getConnection();

$tarefaDAO = new TarefaDAO($conn);
$usuarioTarefaDAO = new UsuarioTarefaDAO($conn);

// Buscar a tarefa
$tarefa = $tarefaDAO->buscarTarefaPorId($id_tarefa);

if (!$tarefa) {
    echo json_encode(['erro' => 'Tarefa não encontrada']);
    exit;
}

// Buscar os responsáveis
$responsaveis = $usuarioTarefaDAO->buscarResponsaveisPorTarefa($id_tarefa);

// Adiciona ao retorno
$tarefa['responsaveis'] = $responsaveis;

// Envia pro front
echo json_encode($tarefa);





?>