<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Tratamento para requisição OPTIONS (CORS)
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

require_once '../../config/database.php';

$id_projeto = $_GET['id_projeto'] ?? null;

if (!$id_projeto) {
    http_response_code(400);
    echo json_encode(['erro' => 'ID do projeto não fornecido.']);
    exit;
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Informações do projeto
    $stmtProjeto = $conn->prepare("SELECT nome_projeto, pontuacao_projeto FROM Projetos WHERE id_projeto = :id");
    $stmtProjeto->execute([':id' => $id_projeto]);
    $projeto = $stmtProjeto->fetch(PDO::FETCH_ASSOC);

    if (!$projeto) {
        http_response_code(404);
        echo json_encode(['erro' => 'Projeto não encontrado.']);
        exit;
    }

    // Contagem de tarefas por status
    $stmtTarefas = $conn->prepare("
        SELECT status, COUNT(*) as quantidade
        FROM Tarefas
        WHERE id_projeto = :id
        GROUP BY status
    ");
    $stmtTarefas->execute([':id' => $id_projeto]);
    $tarefasStatus = $stmtTarefas->fetchAll(PDO::FETCH_ASSOC);

    $statusCounts = [
        'concluída' => 0,
        'atrasada' => 0,
        'em andamento' => 0
    ];
    foreach ($tarefasStatus as $row) {
        if (isset($statusCounts[$row['status']])) {
            $statusCounts[$row['status']] = (int)$row['quantidade'];
        }
    }

    // Participantes + rank por pontuação
    $stmtParticipantes = $conn->prepare("
        SELECT u.id_usuario, u.nome_completo, u.foto_perfil, u.pontuacao
        FROM ParticipantesProjeto pp
        JOIN Usuarios u ON pp.id_usuario = u.id_usuario
        WHERE pp.id_projeto = :id
        ORDER BY u.pontuacao DESC
    ");
    $stmtParticipantes->execute([':id' => $id_projeto]);
    $participantes = $stmtParticipantes->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'nome_projeto' => $projeto['nome_projeto'],
        'pontuacao_total' => (int)$projeto['pontuacao_projeto'],
        'tarefas_concluidas' => $statusCounts['concluída'],
        'tarefas_atrasadas' => $statusCounts['atrasada'],
        'tarefas_em_andamento' => $statusCounts['em andamento'],
        'participantes' => $participantes
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao buscar dados do projeto.', 'detalhes' => $e->getMessage()]);
}