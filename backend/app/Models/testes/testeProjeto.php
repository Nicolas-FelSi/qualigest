<?php
include_once __DIR__ . '/../Database.php';
include_once __DIR__ . '/../ProjetoDAO.php';
$id_projeto = 1;

// Criando conexão com o banco de dados
$database = new Database();
$db = $database->getConnection();

// Criando instância do ProjetoDAO
$projetoDAO = new ProjetoDAO($db);

// Teste de Exclusão
if ($id_projeto) {
    if ($projetoDAO->excluirProjeto($id_projeto)) {
        echo "Projeto excluído com sucesso!<br>";
    } else {
        echo "Erro ao excluir o projeto.<br>";
    }
}
