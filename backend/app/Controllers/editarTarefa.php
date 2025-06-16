<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: PUT, POST, OPTIONS');
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

// Inclui arquivos necessários
require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../Models/DAO/TarefaDAO.php';
require_once __DIR__ . '/../Models/DAO/UsuarioTarefaDAO.php';

// Conecta ao banco de dados
$db = new Database();
$conn = $db->getConnection();

$tarefaDAO = new TarefaDAO($conn);
$usuarioTarefaDAO = new UsuarioTarefaDAO($conn);

// Pega os dados recebidos
$data = json_decode(file_get_contents("php://input"), true);

// Validação básica dos campos obrigatórios
$camposObrigatorios = ['id_tarefa', 'titulo', 'descricao', 'data_inicio', 'data_limite', 'prioridade', 'pontuacao_tarefa', 'multiplicador', 'status', 'responsaveis'];
foreach ($camposObrigatorios as $campo) {
    if (!isset($data[$campo])) {
        http_response_code(400);
        echo json_encode(['erro' => "Campo obrigatório ausente: $campo"]);
        exit;
    }
}

// Validação de datas
$dataInicio = DateTime::createFromFormat('Y-m-d H:i:s', $data['data_inicio']);
$dataLimite = DateTime::createFromFormat('Y-m-d H:i:s', $data['data_limite']);

if (!$dataInicio || !$dataLimite) {
    http_response_code(400);
    echo json_encode(['erro' => 'Formato de data inválido. Use Y-m-d H:i:s.']);
    exit;
}

if ($dataLimite < $dataInicio) {
    http_response_code(400);
    echo json_encode(['erro' => 'A data limite não pode ser anterior à data de início.']);
    exit;
}

// Atualiza a tarefa
$tarefaAtualizada = $tarefaDAO->atualizarTarefa(
    $data['id_tarefa'],
    $data['titulo'],
    $data['descricao'],
    $data['data_inicio'],
    $data['data_limite'],
    $data['prioridade'],
    $data['pontuacao_tarefa'],
    floatval($data['multiplicador']),
    $data['status']
);

// Atualiza os responsáveis se houver mudança
$responsaveisNovos = $data['responsaveis']; // array de IDs
$responsaveisAtuais = $usuarioTarefaDAO->buscarResponsaveisPorTarefa($data['id_tarefa']);
$idsAtuais = array_column($responsaveisAtuais, 'id_usuario');

sort($idsAtuais);
sort($responsaveisNovos);

if ($idsAtuais !== $responsaveisNovos) {
    // Remove antigos
    $queryLimpar = "DELETE FROM responsaveistarefa WHERE id_tarefa = :id_tarefa";
    $stmt = $conn->prepare($queryLimpar);
    $stmt->bindParam(':id_tarefa', $data['id_tarefa']);
    $stmt->execute();

    // Insere novos
    foreach ($responsaveisNovos as $id_usuario) {
        $usuarioTarefaDAO->inserirAssociacoes($id_usuario, $data['id_tarefa']);
    }
}

echo json_encode(['mensagem' => 'Tarefa atualizada com sucesso.']);
