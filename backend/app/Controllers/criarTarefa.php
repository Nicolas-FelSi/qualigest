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

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/classes/Tarefa.php';
require_once __DIR__ . '/../Models/DAO/TarefaDAO.php';
require_once __DIR__ . '/../Models/DAO/UsuarioTarefaDAO.php';

$id_usuario = $_SESSION['usuario_id'];

// Recebe os dados do POST
$data = json_decode(file_get_contents('php://input'), true);

$titulo = $data['titulo'] ?? '';
$descricao = $data['descricao'] ?? '';
$dataInicio = $data['data_inicio'] ?? '';
$dataLimite = $data['data_limite'] ?? '';
$prioridade = $data['prioridade'] ?? '';
$pontuacaoTarefa = $data['pontuacao_tarefa'] ?? 0;
$status = $data['status'] ?? 'pendente';
$id_projeto = $data['id_projeto'] ?? null;

if (!$titulo || !$dataLimite || !$id_projeto) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados obrigatórios ausentes.']);
    exit;
}

$database = new Database();
$db = $database->getConnection();

$tarefaDAO = new TarefaDAO($db);
$usuarioTarefaDAO = new UsuarioTarefaDAO($db);

// Inserir tarefa
$sucesso = $tarefaDAO->inserirTarefa($titulo, $descricao, $dataInicio, $dataLimite, $prioridade, $pontuacaoTarefa, $status, $id_projeto);

if ($sucesso) {
    // Recuperar ID da última tarefa inserida
    $id_tarefa = $db->lastInsertId();

    // Associar usuário à tarefa
    $associado = $usuarioTarefaDAO->inserirAssociacao($id_usuario, $id_tarefa);

    if ($associado) {
        echo json_encode(['sucesso' => true, 'id_tarefa' => $id_tarefa]);
    } else {
        http_response_code(500);
        echo json_encode(['erro' => 'Tarefa criada, mas falha ao associar usuário.']);
    }
} else {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao criar a tarefa.']);
}
?>
