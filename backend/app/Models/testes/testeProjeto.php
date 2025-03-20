<?php
require_once __DIR__ . '/../../../config/Database.php';
include_once __DIR__ . '/../DAO/ProjetoDAO.php';

$database = new Database();
$db = $database->getConnection();

// Criando instância do ProjetoDAO
$projetoDAO = new ProjetoDAO($db);

// Teste de Inserção de Projeto
$nome_projeto = "Projeto chiquititas";
$id_usuario = 2; // Substitua por um ID de usuário válido do seu banco

if ($projetoDAO->inserirProjeto($nome_projeto, $id_usuario)) {
    echo "Projeto inserido com sucesso!<br>";
} else {
    echo "Erro ao inserir o projeto.<br>";
}
?>