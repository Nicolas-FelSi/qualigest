<?php

session_start();

// Verifica se o usuário está autenticado
if (!isset($_SESSION['usuario_id'])) {
    // Redireciona para a página principal se não estiver logado
    header('Location: /qualigest/frontend/src/pages/PaginaInicial');
    exit;
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Tratamento para requisição OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/classes/Projeto.php';
require_once __DIR__ . '/../Models/DAO/ProjetoDAO.php';

// Lê os dados enviados pelo frontend
$data = json_decode(file_get_contents("php://input"), true);

// Valida os dados
if (empty($data['nome_projeto'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'O nome do projeto é obrigatório.']);
    exit;
}

// Cria o objeto Projeto
$projeto = new Projeto();
$projeto->setNomeProjeto(trim($data['nome_projeto']));
$projeto->setIdUsuario($_SESSION['usuario_id']); // ID do usuário autenticado

// Conecta ao banco
$database = new Database();
$db = $database->getConnection();
$projetoDAO = new ProjetoDAO($db);

// Insere o projeto
$sucesso = $projetoDAO->inserirProjeto($projeto->getNomeProjeto(), $projeto->getIdUsuario());

if ($sucesso) {
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Projeto inserido com sucesso.']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao inserir projeto.']);
}


?>