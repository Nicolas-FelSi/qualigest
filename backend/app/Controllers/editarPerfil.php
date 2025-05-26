<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
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

require_once '../../config/database.php';

$db = new Database();
$pdo = $db->getConnection();
$id_usuario = $_SESSION['usuario_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT id_usuario, nome_completo, email, nome_usuario, foto_perfil FROM usuarios WHERE id_usuario = :id");
    $stmt->bindParam(':id', $id_usuario);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($usuario);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $dados = json_decode(file_get_contents("php://input"), true);

    if (!$dados) {
        http_response_code(400);
        echo json_encode(['erro' => 'Dados inválidos.']);
        exit;
    }

    $nome = $dados['nome_completo'] ?? null;
    $nome = $dados['nome_usuario'] ?? null;
    $email = $dados['email'] ?? null;
    $senha = $dados['senha'] ?? null;
    $foto = $dados['foto'] ?? null;

    // Atualiza campos
    $query = "UPDATE usuarios SET nome = :nome, email = :email, nick = :nick";

    if (!empty($senha)) {
        $query .= ", senha = :senha";
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    }

    if (!empty($foto)) {
        $query .= ", foto = :foto";
    }

    $query .= " WHERE id_usuario = :id";

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':nick', $nick);
    $stmt->bindParam(':id', $id_usuario);

    if (!empty($senha)) {
        $stmt->bindParam(':senha', $senhaHash);
    }

    if (!empty($foto)) {
        $stmt->bindParam(':foto', $foto);
    }

    $sucesso = $stmt->execute();

    if ($sucesso) {
        echo json_encode(['mensagem' => 'Perfil atualizado com sucesso.']);
    } else {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao atualizar perfil.']);
    }

    exit;
}