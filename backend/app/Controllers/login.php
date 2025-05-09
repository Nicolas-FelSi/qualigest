<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/classes/Usuario.php';
require_once __DIR__ . '/../Models/DAO/UsuarioDAO.php';

// Verificar se é uma requisição OPTIONS (pré-requisito para CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Recebe os dados do login via POST
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os campos foram enviados
if (empty($data['email']) || empty($data['senha'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'email ou senha em branco.']);
    exit;
}

$email = trim($data['email']);
$senha = trim($data['senha']);

// Conecta ao banco
$database = new Database();
$db = $database->getConnection();
$usuarioDAO = new UsuarioDAO($db);

// Verifica se o login é um e-mail ou nome de usuário
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $usuario = $usuarioDAO->buscarUsuarioPorEmail($email);
} else {
    $usuario = $usuarioDAO->buscarUsuarioPorNome($email);
}

if (!$usuario) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Usuário não encontrado.']);
    exit;
}

// Verifica a senha
if (password_verify($senha, $usuario['senha'])) {

    session_start();
    // Armazena informações do usuário na sessão (ex: ID e nome)
    $_SESSION['usuario_id'] = $usuario['id_usuario'];
    $_SESSION['usuario_nome'] = $usuario['nome_completo'];
    
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Login realizado com sucesso.']);

} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Senha incorreta.']);
}

?>