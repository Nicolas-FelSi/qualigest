<?php

session_start();

// Verifica se o usuário está autenticado
if (!isset($_SESSION['usuario_id'])) {
    // Redireciona para a página principal se não estiver logado
    header('Location: /qualigest/frontend/src/pages/PaginaInicial');
    exit;
}


?>