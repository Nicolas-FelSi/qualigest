<?php

require_once __DIR__ . '/../../../config/Database.php';
include_once __DIR__ . '/../classes/UsuarioTarefa.php';

class UsuarioTarefaDAO {
    private $conn;

    // Construtor que recebe a conexão com o banco de dados
    public function __construct($db) {
        $this->conn = $db;
    }

    // Método para inserir uma nova associação entre usuário e tarefa
    public function inserirAssociacao($id_usuario, $id_tarefa) {
        $query = "INSERT INTO responsaveistarefa (id_usuario, id_tarefa)
                  VALUES (:id_usuario, :id_tarefa)";
        
        $stmt = $this->conn->prepare($query);

        // Vinculando os parâmetros aos valores
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_tarefa', $id_tarefa);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a inserção for bem-sucedida
        } else {
            return false; // Caso contrário, retorna false
        }
    }

    // Método para buscar todas as tarefas de um usuário
    //public function buscarTarefasPorUsuario($id_usuario) {
    //    $query = "SELECT * FROM responsaveistarefa WHERE id_usuario = :id_usuario";
        
    //    $stmt = $this->conn->prepare($query);
    //    $stmt->bindParam(':id_usuario', $id_usuario);
        
    //    $stmt->execute();

        // Retorna todos os registros encontrados
    //    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    //}

    // Método para buscar a associação entre um usuário e uma tarefa específica
    public function buscarAssociacaoPorUsuarioETarefa($id_usuario, $id_tarefa) {
        $query = "SELECT * FROM responsaveistarefa WHERE id_usuario = :id_usuario AND id_tarefa = :id_tarefa";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_tarefa', $id_tarefa);
        
        $stmt->execute();

        // Retorna o registro da associação, caso encontrado
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return null; // Retorna null se não encontrar
        }
    }

    // Método para atualizar o usuário relacionado a uma tarefa
    public function atualizarUsuarioNaTarefa($id_tarefa, $novo_id_usuario) {
        // Query de atualização
        $query = "UPDATE responsaveistarefa 
              SET id_usuario = :novo_id_usuario
              WHERE id_tarefa = :id_tarefa";

        $stmt = $this->conn->prepare($query);

        // Vincula os parâmetros
        $stmt->bindParam(':id_tarefa', $id_tarefa);
        $stmt->bindParam(':novo_id_usuario', $novo_id_usuario);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a atualização for bem-sucedida
        } else {
            return false; // Retorna false se não for bem-sucedido
        }
    }

    // Método para excluir uma associação entre usuário e tarefa
    public function excluirAssociacao($id_usuario, $id_tarefa) {
        $query = "DELETE FROM responsaveistarefa WHERE id_usuario = :id_usuario AND id_tarefa = :id_tarefa";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_tarefa', $id_tarefa);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a exclusão for bem-sucedida
        } else {
            return false; // Caso contrário, retorna false
        }
    }

    // Método para buscar os responsáveis de uma tarefa
    public function buscarResponsaveisPorTarefa($id_tarefa) {
    $query = "
        SELECT u.id_usuario, u.nome_completo AS nome, u.nome_usuario AS nick, u.foto_perfil AS foto
        FROM responsaveistarefa rt
        JOIN usuarios u ON rt.id_usuario = u.id_usuario
        WHERE rt.id_tarefa = :id_tarefa
    ";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id_tarefa', $id_tarefa);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
