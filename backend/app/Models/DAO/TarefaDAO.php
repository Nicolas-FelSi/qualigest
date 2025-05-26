<?php

require_once __DIR__ . '/../../../config/Database.php';  // Caminho correto para o Database.php
include_once __DIR__ . '/../classes/Tarefa.php'; // Caminho correto para Tarefa.php

class TarefaDAO
{
    private $conn;

    // Construtor que recebe a conexão com o banco de dados
    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function inserirTarefa($titulo, $descricao, $dataInicio, $dataLimite, $prioridade, $pontuacaoBase, $status, $id_projeto)
    {
        // Multiplicadores por prioridade
        $multiplicadores = [
            'Baixa'     => 0.75,
            'Moderada'  => 1.0,
            'Alta'      => 1.25,
            'Imediato'  => 1.5
        ];

        $pontuacaoBase = 20;

        // Aplica o multiplicador correspondente à prioridade
        $multiplicador = $multiplicadores[$prioridade] ?? 1.0;
        $pontuacaoTarefa = intval($pontuacaoBase * $multiplicador); // Arredonda para inteiro

        // Query para inserção
        $query = "INSERT INTO tarefas (titulo, descricao, data_inicio, data_limite, prioridade, pontuacao_Tarefa, status, id_projeto) 
              VALUES (:titulo, :descricao, :dataInicio, :dataLimite, :prioridade, :pontuacaoTarefa, :status, :id_projeto)";

        $stmt = $this->conn->prepare($query);

        // Bind dos parâmetros
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':dataInicio', $dataInicio);
        $stmt->bindParam(':dataLimite', $dataLimite);
        $stmt->bindParam(':prioridade', $prioridade);
        $stmt->bindValue(':pontuacaoTarefa', $pontuacaoTarefa);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id_projeto', $id_projeto);

        return $stmt->execute();
    }


    // Método para buscar uma tarefa pelo ID
    public function buscarTarefaPorId($id_tarefa)
    {
        $query = "SELECT * FROM tarefas WHERE id_tarefa = :id_tarefa";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_tarefa', $id_tarefa);

        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null; // Retorna a tarefa ou null se não encontrar
    }

    // Método para atualizar uma tarefa
    public function atualizarTarefa($id_tarefa, $titulo, $descricao, $dataInicio, $dataLimite, $prioridade, $pontuacaoTarefa, $status)
    {
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
    public function excluirTarefa($id_tarefa)
    {
        $query = "DELETE FROM tarefas WHERE id_tarefa = :id_tarefa";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_tarefa', $id_tarefa);

        return $stmt->execute();
    }

    // Método para buscar todas as tarefas de um projeto específico
    public function buscarTarefasPorProjeto($id_projeto)
    {
        $query = "SELECT * FROM tarefas WHERE id_projeto = :id_projeto";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_projeto', $id_projeto);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Conta quantas tarefas estão concluídas para um usuário
    public function contarTarefasConcluidas($id_usuario)
    {
        $query = "
            SELECT COUNT(*) 
            FROM responsaveistarefa ut
            JOIN tarefas t ON ut.id_tarefa = t.id_tarefa
            WHERE ut.id_usuario = :id_usuario AND t.status = 'concluido'
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();

        return (int) $stmt->fetchColumn();
    }

    // Conta quantas tarefas estão em atraso para um usuário
    public function contarTarefasEmAtraso($id_usuario)
    {
        $query = "
        SELECT COUNT(*) 
        FROM responsaveistarefa ut
        JOIN tarefas t ON ut.id_tarefa = t.id_tarefa
        WHERE ut.id_usuario = :id_usuario 
        AND t.status != 'concluido' 
        AND t.data_limite < NOW()
    ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();

        return (int) $stmt->fetchColumn();
    }
}
