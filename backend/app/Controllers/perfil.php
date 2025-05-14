<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/DAO/UsuarioDAO.php';
require_once __DIR__ . '/../Models/DAO/TarefaDAO.php';

$usuario_id = $_SESSION['usuario_id'];  // Obtém o ID do usuário logado

// Cria a conexão com o banco
$database = new Database();
$db = $database->getConnection();

// Inicializa os DAOs
$usuarioDAO = new UsuarioDAO($db);
$tarefaDAO = new TarefaDAO($db);

// Busca os dados do usuário
$usuario = $usuarioDAO->buscarUsuarioPorId($usuario_id);
if (!$usuario) {
    echo json_encode(['erro' => 'Usuário não encontrado.']);
    exit;
}

// Busca a quantidade de tarefas concluídas e em atraso
$tarefasConcluidas = $tarefaDAO->contarTarefasConcluidas($usuario_id);
$tarefasEmAtraso = $tarefaDAO->contarTarefasEmAtraso($usuario_id);

// Prepara os dados do perfil
$perfil = [
    'nome_usuario' => $usuario['nome_usuario'],
    'foto_perfil' => $usuario['foto_perfil'],
    'email' => $usuario['email'],
    'pontuacao' => $usuario['pontuacao'],
    'tarefas_concluidas' => $tarefasConcluidas,
    'tarefas_em_atraso' => $tarefasEmAtraso,
];

echo json_encode($perfil);
