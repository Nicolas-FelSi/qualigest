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

// Verifica se todos os dados necessários foram enviados
if (
    !isset($data['id_tarefa'], $data['titulo'], $data['descricao'], $data['data_inicio'], $data['data_limite'],
    $data['prioridade'], $data['pontuacao_tarefa'], $data['status'], $data['responsaveis'])
) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados incompletos.']);
    exit;
}

// Validação de datas
$dataInicio = DateTime::createFromFormat('Y-m-d H:i:s', $data['data_inicio']);
$dataLimite = DateTime::createFromFormat('Y-m-d H:i:s', $data['data_limite']);
$agora = new DateTime();

if (!$dataInicio || !$dataLimite) {
    http_response_code(400);
    echo json_encode(['erro' => 'Formato de data inválido. Use Y-m-d H:i:s.']);
    exit;
}

if ($dataInicio < $agora) {
    http_response_code(400);
    echo json_encode(['erro' => 'A data de início não pode ser anterior ao momento atual.']);
    exit;
}

if ($dataLimite < $dataInicio) {
    http_response_code(400);
    echo json_encode(['erro' => 'A data limite não pode ser anterior à data de início.']);
    exit;
}

// Atualiza os dados da tarefa
$tarefaAtualizada = $tarefaDAO->atualizarTarefa(
    $data['id_tarefa'],
    $data['titulo'],
    $data['descricao'],
    $data['data_inicio'],
    $data['data_limite'],
    $data['prioridade'],
    $data['pontuacao_tarefa'],
    $data['status']
);

// Atualiza os responsáveis apenas se houver mudança
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
        $usuarioTarefaDAO->inserirAssociacao($id_usuario, $data['id_tarefa']);
    }
}

// Retorna sucesso
echo json_encode(['mensagem' => 'Tarefa atualizada com sucesso.']);
