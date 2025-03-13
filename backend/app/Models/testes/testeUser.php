<?php
include_once __DIR__ . '/../Database.php';
include_once __DIR__ . '/../UsuarioDAO.php';

$id_usuario = 1;
$usuario =1;

// Criar conexão com o banco de dados
$database = new Database();
$db = $database->getConnection();

// Criar instância do UsuarioDAO
$usuarioDAO = new UsuarioDAO($db);

if ($usuario) {
    if ($usuarioDAO->excluirUsuario($id_usuario)) {
        echo "Usuário excluído com sucesso!<br>";
    } else {
        echo "Erro ao excluir usuário.<br>";
    }
}

?>
