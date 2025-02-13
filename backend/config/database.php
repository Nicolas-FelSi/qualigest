<?php
$usuario = 'root';
$senha = '';

try {
    $conexao = new PDO('mysql:host=localhost;dbname=qualigestdb', $usuario, $senha);
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage();
}
?>