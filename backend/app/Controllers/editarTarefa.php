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
require_once __DIR__ . '/../../config/Database.php';
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
$camposObrigatorios = ['id_tarefa', 'titulo', 'descricao', 'data_inicio', 'data_limite', 'prioridade', 'multiplicador', 'ids_responsaveis'];
foreach ($camposObrigatorios as $campo) {
    if (!isset($data[$campo])) {
        http_response_code(400);
        echo json_encode(['erro' => "Campo obrigatório ausente: $campo"]);
        exit;
    }
}

// 🔒 VERIFICAÇÃO DE PERMISSÃO — apenas líderes do projeto podem editar

// 1. Descobre o projeto da tarefa
$queryProjeto = "SELECT id_projeto FROM tarefas WHERE id_tarefa = :id_tarefa";
$stmtProjeto = $conn->prepare($queryProjeto);
$stmtProjeto->bindParam(':id_tarefa', $data['id_tarefa']);
$stmtProjeto->execute();
$resultado = $stmtProjeto->fetch(PDO::FETCH_ASSOC);

if (!$resultado) {
    http_response_code(404);
    echo json_encode(['erro' => 'Tarefa não encontrada.']);
    exit;
}

$idProjeto = $resultado['id_projeto'];

// 2. Verifica se o usuário é líder do projeto
$queryLider = "SELECT is_lider FROM participantesprojeto WHERE id_projeto = :id_projeto AND id_usuario = :id_usuario";
$stmtLider = $conn->prepare($queryLider);
$stmtLider->bindParam(':id_projeto', $idProjeto);
$stmtLider->bindParam(':id_usuario', $_SESSION['usuario_id']);
$stmtLider->execute();

$linha = $stmtLider->fetch(PDO::FETCH_ASSOC);
if (!$linha || !$linha['is_lider']) {
    http_response_code(403);
    echo json_encode(['erro' => 'Você não tem permissão para editar esta tarefa.']);
    exit;
}

// Validação de datas recebidas
$dataInicio = DateTime::createFromFormat('Y-m-d H:i', $data['data_inicio']);
$dataLimite = DateTime::createFromFormat('Y-m-d H:i', $data['data_limite']);

if (!$dataInicio || !$dataLimite) {
    http_response_code(400);
    echo json_encode(['erro' => 'Formato de data inválido. Use Y-m-d H:i.']);
    exit;
}

if ($dataLimite < $dataInicio) {
    http_response_code(400);
    echo json_encode(['erro' => 'A data limite não pode ser anterior à data de início.']);
    exit;
}

// 3. Verifica se a nova data de início não é anterior à original
$queryDataOriginal = "SELECT data_inicio FROM tarefas WHERE id_tarefa = :id_tarefa";
$stmtData = $conn->prepare($queryDataOriginal);
$stmtData->bindParam(':id_tarefa', $data['id_tarefa']);
$stmtData->execute();
$tarefaOriginal = $stmtData->fetch(PDO::FETCH_ASSOC);

if (!$tarefaOriginal) {
    http_response_code(404);
    echo json_encode(['erro' => 'Tarefa não encontrada para verificar a data original.']);
    exit;
}

$dataInicioOriginal = DateTime::createFromFormat('Y-m-d H:i:s', $tarefaOriginal['data_inicio']);

if ($dataInicio < $dataInicioOriginal) {
    http_response_code(400);
    echo json_encode(['erro' => 'Você não pode definir uma nova data de início anterior à data original da tarefa.']);
    exit;
}

// 🎯 Validação do multiplicador
$multiplicador = isset($data['multiplicador']) ? floatval($data['multiplicador']) : 1;

if ($multiplicador < 1) {
    $multiplicador = 1;
} elseif ($multiplicador > 10) {
    $multiplicador = 10;
}


// Determina o status com base na nova data de início
$agora = new DateTime();
$status = ($dataInicio > $agora) ? 'Agendada' : 'Em andamento';

// Atualiza a tarefa
$tarefaAtualizada = $tarefaDAO->atualizarTarefa(
    $data['id_tarefa'],
    $data['titulo'],
    $data['descricao'],
    $data['data_inicio'],
    $data['data_limite'],
    $data['prioridade'],
    $multiplicador,
    $status
);

// Atualiza os responsáveis se houver mudança
$responsaveisNovos = $data['ids_responsaveis']; // array de IDs
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
    $usuarioTarefaDAO->inserirAssociacoes($responsaveisNovos, $data['id_tarefa']);
}

echo json_encode(['mensagem' => 'Tarefa atualizada com sucesso.']);
