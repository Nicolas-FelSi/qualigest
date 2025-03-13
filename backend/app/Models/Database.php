<?php

class Database {
    private $host = 'localhost';         
    private $db_name = 'qualigestdb';  
    private $username = 'root';          
    private $password = '';              
    private $conn;                       

    // Construtor para iniciar a conexão ao banco de dados
    public function __construct() {
        $this->connect();
    }

    // Método para obter a conexão com o banco de dados
    private function connect() {
        try {
            // Criando a conexão usando PDO
            $dsn = "mysql:host={$this->host};dbname={$this->db_name}";
            $this->conn = new PDO($dsn, $this->username, $this->password);

            // Definindo o modo de erro como exceção
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            // Caso haja um erro na conexão, exibe a mensagem
            echo "Erro na conexão: " . $exception->getMessage();
        }
    }

    // Método para retornar a conexão
    public function getConnection() {
        return $this->conn;
    }

    // Método para fechar a conexão
    public function closeConnection() {
        $this->conn = null;
    }
}
?>
