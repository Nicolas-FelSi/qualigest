<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Trata requisição OPTIONS (CORS)
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

$data = json_decode(file_get_contents('php://input'), true);
$id_tarefa = $data['id_tarefa'] ?? null;

if (!$id_tarefa) {
    http_response_code(400);
    echo json_encode(['erro' => 'ID da tarefa não fornecido.']);
    exit;
}

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Verifica se a tarefa já está concluída e obtém dados
    $stmt = $conn->prepare("SELECT pontuacao_tarefa, data_limite, multiplicador, status, id_projeto FROM Tarefas WHERE id_tarefa = :id");
    $stmt->execute([':id' => $id_tarefa]);
    $tarefa = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$tarefa) {
        http_response_code(404);
        echo json_encode(['erro' => 'Tarefa não encontrada.']);
        exit;
    }

    if (strtolower($tarefa['status']) === 'concluída') {
        http_response_code(400);
        echo json_encode(['erro' => 'Tarefa já foi concluída anteriormente.']);
        exit;
    }

    $pontuacaoBase = (float)$tarefa['pontuacao_tarefa'];
    $multiplicador = (float)$tarefa['multiplicador'];
    $id_projeto = $tarefa['id_projeto'];

    $dataLimite = new DateTime($tarefa['data_limite']);
    $hoje = new DateTime();

    // Calcula pontuação final com base no prazo
    $pontuacaoFinal = $hoje <= $dataLimite
        ? intval($pontuacaoBase * $multiplicador)
        : intval($pontuacaoBase);

    // Buscar responsáveis
    $stmt = $conn->prepare("SELECT id_usuario FROM ResponsaveisTarefa WHERE id_tarefa = :id");
    $stmt->execute([':id' => $id_tarefa]);
    $responsaveis = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$responsaveis) {
        http_response_code(400);
        echo json_encode(['erro' => 'Nenhum responsável encontrado para esta tarefa.']);
        exit;
    }

    // Adiciona pontuação e incrementa tarefas_concluidas
    foreach ($responsaveis as $resp) {
        $stmt = $conn->prepare("
            UPDATE Usuarios 
            SET pontuacao = pontuacao + :pontos,
                tarefas_concluidas = tarefas_concluidas + 1
            WHERE id_usuario = :id
        ");
        $stmt->execute([
            ':pontos' => $pontuacaoFinal,
            ':id' => $resp['id_usuario']
        ]);
    }

    // Atualiza pontuação no projeto
    $stmt = $conn->prepare("UPDATE projetos SET pontuacao_projeto = pontuacao_projeto + :pontos WHERE id_projeto = :id");
    $stmt->execute([
        ':pontos' => $pontuacaoFinal,
        ':id' => $id_projeto
    ]);

    // Atualiza a pontuação final da tarefa e marca como concluída
    $stmt = $conn->prepare("UPDATE tarefas SET pontuacao_tarefa = :pontos, status = 'concluída' WHERE id_tarefa = :id");
    $stmt->execute([
        ':pontos' => $pontuacaoFinal,
        ':id' => $id_tarefa
    ]);

    echo json_encode([
        'mensagem' => 'Tarefa concluída com sucesso.',
        'pontuacao_aplicada' => $pontuacaoFinal
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'erro' => 'Erro ao processar a entrega.',
        'detalhes' => $e->getMessage()
    ]);
}
