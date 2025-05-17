<?php

require_once __DIR__ . '/../../../config/Database.php';
include_once __DIR__ . '/../classes/Projeto.php';

class ProjetoDAO {
    private $conn;

    // Construtor que recebe a conexão com o banco de dados
    public function __construct($db) {
        $this->conn = $db;
    }

    // Método para inserir um novo projeto
    public function inserirProjeto($nome_projeto, $id_usuario) {
        $query = "INSERT INTO projetos (nome_projeto, id_usuario)
                  VALUES (:nome_projeto, :id_usuario)";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nome_projeto', $nome_projeto);
        $stmt->bindParam(':id_usuario', $id_usuario);
    
        if ($stmt->execute()) {
            return $this->conn->lastInsertId(); // Retorna o ID do projeto inserido
        } else {
            return false;
        }
    }

    // Método para buscar um projeto por nome
    public function buscarProjetoPorNome($nome_projeto) {
        $query = "SELECT * FROM projetos WHERE nome_projeto = :nome_projeto";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nome_projeto', $nome_projeto);
        
        $stmt->execute();

        // Verifica se encontrou o projeto
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o projeto como um array
        } else {
            return null; // Retorna null se não encontrar
        }
    }

    // Método para atualizar apenas o nome do projeto
public function atualizarProjeto($id_projeto, $nome_projeto) {
    $query = "UPDATE projetos 
              SET nome_projeto = :nome_projeto,
              WHERE id_projeto = :id_projeto";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':id_projeto', $id_projeto);
    $stmt->bindParam(':nome_projeto', $nome_projeto);

    return $stmt->execute();
}


    // Método para excluir um projeto
    public function excluirProjeto($id_projeto) {
        $query = "DELETE FROM projetos WHERE id_projeto = :id_projeto";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_projeto', $id_projeto);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a exclusão for bem-sucedida
        } else {
            return false; // Caso contrário, retorna false
        }
    }
}
?>
