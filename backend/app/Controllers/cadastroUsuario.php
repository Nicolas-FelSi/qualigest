<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Verificar se é uma requisição OPTIONS (pré-requisito para CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Método não permitido. Use POST.']);
    http_response_code(405);
    exit;
}

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../Models/classes/Usuario.php';
require_once __DIR__ . '/../Models/DAO/UsuarioDAO.php';

// Pega o conteúdo do corpo da requisição (JSON)
$data = json_decode(file_get_contents("php://input"), true);

// Validação básica
if (
    empty($data['nome_completo']) ||
    empty($data['nome_usuario']) ||
    empty($data['email']) ||
    empty($data['senha'])
) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Preencha todos os campos obrigatórios.']);
    exit;
}

// Cria o objeto Usuario
$usuario = new Usuario();
$usuario->setNomeCompleto(trim($data['nome_completo']));
$usuario->setNomeUsuario(trim($data['nome_usuario']));
$usuario->setEmail(trim($data['email']));
$usuario->setSenha(password_hash($data['senha'], PASSWORD_BCRYPT)); // Senha segura


// Cria a conexão e instancia o DAO
$database = new Database();
$db = $database->getConnection();

$usuarioDAO = new UsuarioDAO($db);

// Verifica se o nome de usuário já existe
if ($usuarioDAO->buscarUsuarioPorNome($usuario->getNomeUsuario())) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Nome de usuário já está em uso.']);
    exit;
}

// Verifica se o e-mail já está cadastrado
if ($usuarioDAO->buscarUsuarioPorEmail($usuario->getEmail())) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Email já está em uso.']);
    exit;
}

// Tenta cadastrar
$sucesso = $usuarioDAO->inserirUsuario(
    $usuario->getNomeCompleto(),
    $usuario->getNomeUsuario(),
    $usuario->getEmail(),
    $usuario->getSenha()
);

if ($sucesso) {
    echo json_encode(['status' => 'sucesso', 'mensagem' => 'Usuário cadastrado com sucesso.']);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao cadastrar usuário.']);
}
