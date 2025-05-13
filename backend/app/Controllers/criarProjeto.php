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
require_once __DIR__ . '/../Models/DAO/UsuarioProjetoDAO.php';

// Lê os dados enviados pelo frontend
$data = json_decode(file_get_contents("php://input"), true);

// Valida os dados
if (empty($data['nome_projeto'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'O nome do projeto é obrigatório.']);
    exit;
}

$participantes = isset($data['participantes']) && is_array($data['participantes']) ? $data['participantes'] : [];

// Cria o objeto Projeto
$projeto = new Projeto();
$projeto->setNomeProjeto(trim($data['nome_projeto']));
$projeto->setIdUsuario($_SESSION['usuario_id']); // ID do líder

// Conecta ao banco
$database = new Database();
$db = $database->getConnection();
$projetoDAO = new ProjetoDAO($db);
$usuarioProjetoDAO = new UsuarioProjetoDAO($db);

// Insere o projeto e obtém o ID gerado
$idProjeto = $projetoDAO->inserirProjeto($projeto->getNomeProjeto(), $projeto->getIdUsuario());

if ($idProjeto !== false) {
    // Associa o líder ao projeto também
    $usuarioProjetoDAO->inserirAssociacao($projeto->getIdUsuario(), $idProjeto);

    // Associa os participantes enviados (se houver)
    foreach ($participantes as $idParticipante) {
        // Evita duplicar o líder se ele estiver incluído na lista
        if ($idParticipante != $projeto->getIdUsuario()) {
            $usuarioProjetoDAO->inserirAssociacao($idParticipante, $idProjeto);
        }
    }

    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Projeto criado com sucesso.']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao inserir projeto.']);
}
?>
