<?php

session_start();

header('Content-Type: application/json');

require_once __DIR__ . '/../../../config/database.php';
require_once __DIR__ . '/../Models/classes/Projeto.php';
require_once __DIR__ . '/../Models/DAO/ProjetoDAO.php';
require_once __DIR__ . '/../Models/classes/Usuarioprojeto.php';
require_once __DIR__ . '/../Models/DAO/UsuarioProjetoDAO.php';

// Verifica se o usuário está autenticado
if (!isset($_SESSION['usuario_id'])) {
    // Redireciona para a página principal se não estiver logado
    header('Location: /qualigest/frontend/src/pages/PaginaInicial');
    exit;
}

$id_usuario = $_SESSION['usuario_id'];

// Conexão com o banco
$database = new Database();
$db = $database->getConnection();

$projetoDAO = new ProjetoDAO($db);

// Busca os projetos que o usuário participa
$query = "SELECT p.id_projeto, p.nome_projeto, p.pontuacao_projeto, p.id_usuario AS id_lider
          FROM projetos p
          INNER JOIN usuario_projeto up ON p.id_projeto = up.id_projeto
          WHERE up.id_usuario = :id_usuario";

$stmt = $db->prepare($query);
$stmt->bindParam(':id_usuario', $id_usuario);
$stmt->execute();

$projetos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['status' => 'sucesso', 'projetos' => $projetos]);


?>