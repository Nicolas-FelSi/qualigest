<?php

require_once __DIR__ . '/../../../config/Database.php';
include_once __DIR__ . '/../DAO/UsuarioDAO.php';
include_once __DIR__ . '/../classes/Usuario.php';


// Criar conexão com o banco de dados
$database = new Database();
$db = $database->getConnection();

$usuarioDAO = new UsuarioDAO($db);

// Testar inserção de um novo usuário
$nome_completo = "Fernando Andrade";
$nome_usuario = "fernandin";
$email = "fefe@email.com";
$senha = password_hash("Fernando123", PASSWORD_DEFAULT); // Hash da senha

if ($usuarioDAO->inserirUsuario($nome_completo, $nome_usuario, $email, $senha)) {
    echo "Usuário inserido com sucesso!<br>";
} else {
    echo "Erro ao inserir usuário.<br>";
}


?>