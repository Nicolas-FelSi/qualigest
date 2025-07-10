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

    $nomeCompleto = $dados['nome_completo'] ?? null;
    $nick = $dados['nome_usuario'] ?? null;
    $email = $dados['email'] ?? null;
    $senha = $dados['senha'] ?? null;
    $foto = $dados['foto'] ?? null;
    $fotoPath = null;

    if (!empty($foto)) {
        $diretorio = __DIR__ . '/../../uploads/fotos_perfil/';
        if (!is_dir($diretorio)) {
            mkdir($diretorio, 0755, true);
        }

        $nomeArquivo = 'foto_' . $id_usuario . '_' . time() . '.png';
        $caminhoCompleto = $diretorio . $nomeArquivo;

        // Remove cabeçalho base64
        $fotoLimpa = preg_replace('#^data:image/\w+;base64,#i', '', $foto);
        $fotoDecodificada = base64_decode($fotoLimpa);

        if ($fotoDecodificada !== false) {
            file_put_contents($caminhoCompleto, $fotoDecodificada);
            $fotoPath = 'uploads/fotos_perfil/' . $nomeArquivo;
        }
    }

    $query = "UPDATE usuarios SET nome_completo = :nome, email = :email, nome_usuario = :nick";

    if (!empty($senha)) {
        $query .= ", senha = :senha";
        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    }

    if (!empty($fotoPath)) {
        $query .= ", foto_perfil = :foto";
    }
    $query .= " WHERE id_usuario = :id";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':nome', $nomeCompleto);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':nick', $nick);
    $stmt->bindParam(':id', $id_usuario);

    if (!empty($senha)) {
        $stmt->bindParam(':senha', $senhaHash);
    }

    if (!empty($fotoPath)) {
        $stmt->bindParam(':foto', $fotoPath);
    }

    $sucesso = $stmt->execute();

    if ($sucesso) {
        // 1. Após o UPDATE, fazemos um SELECT para buscar os dados atualizados
        $stmt_select = $pdo->prepare("SELECT id_usuario, nome_completo, email, nome_usuario, foto_perfil FROM usuarios WHERE id_usuario = :id");
        $stmt_select->bindParam(':id', $id_usuario);
        $stmt_select->execute();
        $usuario_atualizado = $stmt_select->fetch(PDO::FETCH_ASSOC);

        if ($usuario_atualizado) {
            // 2. Retornamos uma resposta de sucesso JUNTO com o objeto do usuário atualizado
            echo json_encode([
                'status' => 'sucesso',
                'mensagem' => 'Perfil atualizado com sucesso.',
                'usuario' => $usuario_atualizado
            ]);
        } else {
            // Caso raro onde o SELECT falha após um UPDATE bem-sucedido
            http_response_code(500);
            echo json_encode(['status' => 'erro', 'mensagem' => 'Perfil atualizado, mas não foi possível recuperar os dados.']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao atualizar perfil.']);
    }

    exit;
}
