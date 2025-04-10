<?php 
header('Content-Type: application/json');

require_once __DIR__ . '/../../../config/database.php';
require_once __DIR__ . '/../Models/classes/Usuario.php';
require_once __DIR__ . '/../dao/UsuarioDAO.php';

// Recebe os dados do login via POST
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se os campos foram enviados
if (empty($data['login']) || empty($data['senha'])) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'login ou senha em branco.']);
    exit;
}

$login = trim($data['login']);
$senha = $data['senha'];

// Conecta ao banco
$database = new Database();
$db = $database->getConnection();
$usuarioDAO = new UsuarioDAO($db);

// Verifica se o login é um e-mail ou nome de usuário
if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
    $usuario = $usuarioDAO->buscarUsuarioPorEmail($login);
} else {
    $usuario = $usuarioDAO->buscarUsuarioPorNome($login);
}

if (!$usuario) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Usuário não encontrado.']);
    exit;
}

// Verifica a senha
if (password_verify($senha, $usuario['senha'])) {
    unset($usuario['senha']); // Remove a senha antes de retornar
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Login realizado com sucesso.', 'usuario' => $usuario]);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Senha incorreta.']);
}

?>