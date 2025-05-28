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
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/DAO/TarefaDAO.php';
require_once __DIR__ . '/../Models/DAO/UsuarioTarefaDAO.php';
require_once __DIR__ . '/../Models/DAO/UsuarioDAO.php';

// Verifica se o id_projeto foi enviado
if (!isset($_GET['id_projeto'])) {
    http_response_code(400);
    echo json_encode(['erro' => 'ID do projeto não fornecido']);
    exit;
}

$db = new Database();
$conn = $db->getConnection();

$tarefaDAO = new TarefaDAO($conn);
$usuarioTarefaDAO = new UsuarioTarefaDAO($conn);

$id_projeto = $_GET['id_projeto'];
$tarefas = $tarefaDAO->buscarTarefasPorProjeto($id_projeto);

$tarefasComResponsaveis = [];

foreach ($tarefas as $tarefa) {
    $responsaveis = $usuarioTarefaDAO->buscarResponsaveisPorTarefa($tarefa['id_tarefa']);

    $tarefasComResponsaveis[] = [
        'id_tarefa'        => $tarefa['id_tarefa'],
        'titulo'           => $tarefa['titulo'],
        'descricao'        => $tarefa['descricao'],
        'data_inicio'      => $tarefa['data_inicio'],
        'data_limite'      => $tarefa['data_limite'],
        'prioridade'       => $tarefa['prioridade'],
        'pontuacao_Tarefa' => $tarefa['pontuacao_tarefa'],
        'status'           => $tarefa['status'],
        'id_projeto'       => $tarefa['id_projeto'],
        'responsaveis'     => $responsaveis
    ];
}

echo json_encode($tarefasComResponsaveis);
