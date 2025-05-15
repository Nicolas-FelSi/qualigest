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


$erros = validarCadastro($data);

if (!empty($erros)) {
    echo json_encode(['status' => 'erro', 'mensagens' => $erros]);
    exit;
} else {
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

}


function validarCadastro($data) {
    $erros = [];

    // Nome completo
    if (empty($data['nome_completo'])) {
        $erros[] = 'O nome completo é obrigatório.';
    } elseif (!preg_match('/^[a-zA-ZÀ-ú\s]+$/u', $data['nome_completo'])) {
        $erros[] = 'O nome completo deve conter apenas letras e espaços.';
    }

    // Nome de usuário
    if (empty($data['nome_usuario'])) {
        $erros[] = 'O nome de usuário é obrigatório.';
    } elseif (strpos($data['nome_usuario'], '@') !== false) {
        $erros[] = 'O nome de usuário não pode conter "@".';
    } elseif (!preg_match('/^[a-zA-Z0-9._-]+$/', $data['nome_usuario'])) {
        $erros[] = 'O nome de usuário só pode conter letras, números, ponto, hífen e underline.';
    }

    // E-mail
    if (empty($data['email'])) {
        $erros[] = 'O e-mail é obrigatório.';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $erros[] = 'O e-mail informado não é válido.';
    }

    // Senha
    if (empty($data['senha'])) {
        $erros[] = 'A senha é obrigatória.';
    } elseif (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/', $data['senha'])) {
        $erros[] = 'A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.';
    }

    return $erros;
}

