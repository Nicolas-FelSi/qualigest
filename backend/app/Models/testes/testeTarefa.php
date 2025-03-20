<?php
require_once __DIR__ . '/../../../config/Database.php';
include_once __DIR__ . '/../DAO/TarefaDAO.php'; // Incluindo o arquivo do TarefaDAO

$database = new Database();
$db = $database->getConnection();

// Criando instância do TarefaDAO
$tarefaDAO = new TarefaDAO($db);

// Teste de Inserção de Tarefa
$titulo_tarefa = "receptar uma carrada de brita";
$descricao_tarefa = "numa fábrica abandonada perto do conglomerado silva";
$data_inicio = "2025-03-23";
$data_limite = "2025-04-04";
$prioridade = "Moderada";
$pontuacao_tarefa = 20;
$status = "Em andamento";
$id_projeto = 2; // ID do projeto associado

// Inserindo a tarefa
if ($tarefaDAO->inserirTarefa($titulo_tarefa, $descricao_tarefa, $data_inicio, $data_limite, $prioridade, $pontuacao_tarefa, $status, $id_projeto)) {
    echo "Tarefa inserida com sucesso!<br>";
} else {
    echo "Erro ao inserir a tarefa.<br>";
}
?>
