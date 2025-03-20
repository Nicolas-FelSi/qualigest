<?php

require_once __DIR__ . '/../../../config/Database.php';  // Caminho correto para o Database.php
include_once __DIR__ . '/../classes/Tarefa.php'; // Caminho correto para Tarefa.php

class TarefaDAO {
    private $conn;

    // Construtor que recebe a conexão com o banco de dados
    public function __construct($db) {
        $this->conn = $db;
    }

    // Método para inserir uma nova tarefa
    public function inserirTarefa($titulo, $descricao, $dataInicio, $dataLimite, $prioridade, $pontuacaoTarefa, $status, $id_projeto) {
        $query = "INSERT INTO tarefas (titulo, descricao, data_inicio, data_limite, prioridade, pontuacao_Tarefa, status, id_projeto) 
                  VALUES (:titulo, :descricao, :dataInicio, :dataLimite, :prioridade, :pontuacaoTarefa, :status, :id_projeto)";
        
        $stmt = $this->conn->prepare($query);

        // Vinculando os parâmetros aos valores
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':dataInicio', $dataInicio);
        $stmt->bindParam(':dataLimite', $dataLimite);
        $stmt->bindParam(':prioridade', $prioridade);
        $stmt->bindParam(':pontuacaoTarefa', $pontuacaoTarefa);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id_projeto', $id_projeto);

        return $stmt->execute();
    }

    // Método para buscar uma tarefa pelo ID
    public function buscarTarefaPorId($id_tarefa) {
        $query = "SELECT * FROM tarefas WHERE id_tarefa = :id_tarefa";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_tarefa', $id_tarefa);
        
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null; // Retorna a tarefa ou null se não encontrar
    }

    // Método para atualizar uma tarefa
    public function atualizarTarefa($id_tarefa, $titulo, $descricao, $dataInicio, $dataLimite, $prioridade, $pontuacaoTarefa, $status) {
        $query = "UPDATE tarefas 
                  SET titulo = :titulo, descricao = :descricao, data_inicio = :dataInicio, 
                      data_limite = :dataimite, prioridade = :prioridade, 
                      pontuacaoTarefa = :pontuacaoTarefa, status = :status
                  WHERE id_tarefa = :id_tarefa";

        $stmt = $this->conn->prepare($query);

        // Vinculando os parâmetros aos valores
        $stmt->bindParam(':id_tarefa', $id_tarefa);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':dataInicio', $dataInicio);
        $stmt->bindParam(':dataLimite', $dataLimite);
        $stmt->bindParam(':prioridade', $prioridade);
        $stmt->bindParam(':pontuacaoTarefa', $pontuacaoTarefa);
        $stmt->bindParam(':status', $status);

        return $stmt->execute();
    }

    // Método para excluir uma tarefa
    public function excluirTarefa($id_tarefa) {
        $query = "DELETE FROM tarefas WHERE id_tarefa = :id_tarefa";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_tarefa', $id_tarefa);

        return $stmt->execute();
    }

    // Método para buscar todas as tarefas de um projeto específico
    public function buscarTarefasPorProjeto($id_projeto) {
        $query = "SELECT * FROM tarefas WHERE id_projeto = :id_projeto";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_projeto', $id_projeto);
        
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>
