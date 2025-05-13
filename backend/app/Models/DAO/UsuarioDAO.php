<?php

require_once __DIR__ . '/../../../config/Database.php';
include_once __DIR__ . '/../classes/Usuario.php';

class UsuarioDAO {
    private $conn;

    // Construtor que recebe a conexão
    public function __construct($db) {
        $this->conn = $db;
    }

    // Método para inserir um novo usuário
    public function inserirUsuario($nome_completo, $nome_usuario, $email, $senha) {
        $query = "INSERT INTO usuarios (nome_completo, nome_usuario, email, senha, pontuacao, tarefas_concluidas) 
                  VALUES (:nome_completo, :nome_usuario, :email, :senha, 0, 0)";
        
        $stmt = $this->conn->prepare($query);

        // Vinculando os parâmetros aos valores
        $stmt->bindParam(':nome_completo', $nome_completo);
        $stmt->bindParam(':nome_usuario', $nome_usuario);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a inserção for bem-sucedida
        } else {
            return false; // Caso contrário, retorna false
        }
    }

    // Método para consultar um usuário pelo nome de usuário
    public function buscarUsuarioPorNome($nome_usuario) {
        $query = "SELECT * FROM usuarios WHERE nome_usuario = :nome_usuario";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nome_usuario', $nome_usuario);
        
        $stmt->execute();

        // Verifica se encontrou o usuário
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o usuário como um array
        } else {
            return null; // Retorna null se não encontrar
        }
    }

    // Método para consultar um usuário pelo E-mail
    public function buscarUsuarioPorEmail($email) {
        $query = "SELECT * FROM usuarios WHERE email = :email";
    
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
    
        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            return null;
        }
    }

    // Método para buscar um usuário pelo ID
    public function buscarUsuarioPorId($id_usuario) {
        $query = "SELECT * FROM usuarios WHERE id_usuario = :id_usuario";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna os dados como array associativo
        } else {
            return null; // Retorna null se não encontrar o usuário
        }
    }

    // Método para atualizar os dados de um usuário
    public function atualizarUsuario($id_usuario, $nome_completo, $email, $senha, $foto_perfil) {
        $query = "UPDATE usuarios 
                  SET nome_completo = :nome_completo, 
                      email = :email, 
                      senha = :senha, 
                      foto_perfil = :foto_perfil
                  WHERE id_usuario = :id_usuario";
    
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':nome_completo', $nome_completo);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha);
        $stmt->bindParam(':foto_perfil', $foto_perfil);
    
        return $stmt->execute();
    }

    // Método para excluir um usuário
    public function excluirUsuario($id_usuario) {
        $query = "DELETE FROM usuarios WHERE id_usuario = :id_usuario";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);

        // Executando a query
        if ($stmt->execute()) {
            return true; // Retorna true se a exclusão for bem-sucedida
        } else {
            return false; // Caso contrário, retorna false
        }
    }

    public function buscarDadosPerfil($id_usuario) {
        $query = "SELECT u.nome_completo, u.nome_usuario, u.email, u.foto_perfil, u.pontuacao, u.tarefas_concluidas,
                        (
                            SELECT COUNT(*) 
                            FROM tarefas t 
                            INNER JOIN usuario_projeto up ON t.id_projeto = up.id_projeto
                            WHERE up.id_usuario = u.id_usuario AND t.status = 'atrasada'
                        ) AS tarefas_atrasadas
                  FROM usuarios u
                  WHERE u.id_usuario = :id_usuario";
    
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
