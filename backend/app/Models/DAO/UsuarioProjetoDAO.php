<?php

require_once __DIR__ . '/../../../config/Database.php';
include_once __DIR__ . '/../classes/Usuarioprojeto.php';

class UsuarioProjetoDAO {
    private $conn;

    // Construtor que recebe a conexão com o banco de dados
    public function __construct($db) {
        $this->conn = $db;
    }

    // Método para inserir uma nova associação entre usuário e projeto
    public function inserirAssociacao($id_usuario, $id_projeto) {
        $query = "INSERT INTO participantesprojeto (id_usuario, id_projeto)
                  VALUES (:id_usuario, :id_projeto)";
        
        $stmt = $this->conn->prepare($query);

        // Vinculando os parâmetros aos valores
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_projeto', $id_projeto);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a inserção for bem-sucedida
        } else {
            return false; // Caso contrário, retorna false
        }
    }

    // Método para atualizar a pontuação de um projeto de um usuário
    //public function atualizarPontosProjeto($id_usuario, $id_projeto, $pontos_projeto) {
    //    $query = "UPDATE participantesprojeto 
    //              SET pontos_projeto = :pontos_projeto
    //              WHERE id_usuario = :id_usuario AND id_projeto = :id_projeto";

    //    $stmt = $this->conn->prepare($query);

        // Vinculando os parâmetros aos valores
    //    $stmt->bindParam(':id_usuario', $id_usuario);
    //    $stmt->bindParam(':id_projeto', $id_projeto);

        // Executando a query
    //    if ($stmt->execute()) {
    //        return true; // Retorna true se a atualização for bem-sucedida
    //    } else {
    //        return false; // Caso contrário, retorna false
    //    }
    //}

    // Método para excluir uma associação entre usuário e projeto
    public function excluirAssociacao($id_usuario, $id_projeto) {
        $query = "DELETE FROM participantesprojeto WHERE id_usuario = :id_usuario AND id_projeto = :id_projeto";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_projeto', $id_projeto);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a exclusão for bem-sucedida
        } else {
            return false; // Caso contrário, retorna false
        }
    }

    //busca os usuários que estão no mesmo projeto
    public function buscarUsuariosPorProjeto($id_projeto) {
    $query = "
        SELECT u.id_usuario, u.nome, u.nick, u.foto
        FROM participantesprojeto pp
        JOIN usuarios u ON pp.id_usuario = u.id_usuario
        WHERE pp.id_projeto = :id_projeto
    ";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id_projeto', $id_projeto);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }



}
?>
