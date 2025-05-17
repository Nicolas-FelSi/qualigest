<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['erro' => 'Usuário não autenticado.']);
    exit;
}

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/DAO/ProjetoDAO.php';
require_once __DIR__ . '/../Models/DAO/UsuarioProjetoDAO.php';

$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os dados obrigatórios foram enviados
if (empty($data['id_projeto']) || empty($data['nome_projeto']) || !isset($data['participantes']) || !isset($data['lideres'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Dados obrigatórios ausentes.']);
    exit;
}

$id_projeto = $data['id_projeto'];
$nome_projeto = trim($data['nome_projeto']);
$participantesNovos = $data['participantes']; // Array de IDs
$lideresNovos = $data['lideres']; // Array de IDs

$usuarioLogado = $_SESSION['usuario_id'];

$database = new Database();
$db = $database->getConnection();

$projetoDAO = new ProjetoDAO($db);
$usuarioProjetoDAO = new UsuarioProjetoDAO($db);

// Verifica se o usuário é criador OU líder do projeto
$query = "
    SELECT 
        CASE 
            WHEN p.id_usuario = :usuario THEN 'criador'
            WHEN pp.is_lider = 1 THEN 'lider'
            ELSE NULL
        END AS permissao
    FROM Projetos p
    LEFT JOIN ParticipantesProjeto pp 
        ON p.id_projeto = pp.id_projeto AND pp.id_usuario = :usuario
    WHERE p.id_projeto = :id_projeto
    LIMIT 1
";

$stmt = $db->prepare($query);
$stmt->bindParam(':usuario', $usuarioLogado, PDO::PARAM_INT);
$stmt->bindParam(':id_projeto', $id_projeto, PDO::PARAM_INT);
$stmt->execute();
$permissao = $stmt->fetchColumn();

if (!$permissao) {
    http_response_code(403);
    echo json_encode(['erro' => 'Acesso negado. Apenas criador ou líder pode editar este projeto.']);
    exit;
}

// Atualiza nome do projeto
$projetoAtualizado = $projetoDAO->atualizarProjeto($id_projeto, $nome_projeto);

// Participantes atuais
$query = "SELECT id_usuario FROM participantesprojeto WHERE id_projeto = :id_projeto";
$stmt = $db->prepare($query);
$stmt->bindParam(':id_projeto', $id_projeto, PDO::PARAM_INT);
$stmt->execute();
$participantesAtuais = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Quem entra e quem sai
$adicionar = array_diff($participantesNovos, $participantesAtuais);
$remover = array_diff($participantesAtuais, $participantesNovos);

foreach ($adicionar as $id_usuario) {
    $usuarioProjetoDAO->inserirAssociacao($id_usuario, $id_projeto);
}

foreach ($remover as $id_usuario) {
    $usuarioProjetoDAO->excluirAssociacao($id_usuario, $id_projeto);
}

// Atualiza líderes (define is_lider = 1 ou 0 conforme lista recebida)
$query = "UPDATE participantesprojeto SET is_lider = CASE 
    WHEN id_usuario IN (" . implode(',', array_map('intval', $lideresNovos)) . ") THEN 1 ELSE 0 END
    WHERE id_projeto = :id_projeto";

$stmt = $db->prepare($query);
$stmt->bindParam(':id_projeto', $id_projeto, PDO::PARAM_INT);
$stmt->execute();

if ($projetoAtualizado) {
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Projeto atualizado com sucesso.']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao atualizar projeto.']);
}
