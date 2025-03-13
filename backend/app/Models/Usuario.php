<?php

class Usuario {

    private $id_usuario;
    private $nome_completo;
    private $nome_usuario;
    private $email;
    private $senha;
    private $foto_perfil;
    private $pontuacao;
    private $tarefas_concluidas;

    public function getIdUsuario() {
        return $this->id_usuario;
    }

    public function setIdUsuario($id_usuario) {
        $this->id_usuario = $id_usuario;
    }

    public function getNomeCompleto() {
        return $this->nome_completo;
    }

    public function setNomeCompleto($nome_completo) {
        $this->nome_completo = $nome_completo;
    }

    public function getNomeUsuario() {
        return $this->nome_usuario;
    }

    public function setNomeUsuario($nome_usuario) {
        $this->nome_usuario = $nome_usuario;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getSenha() {
        return $this->senha;
    }

    public function setSenha($senha) {
        $this->senha = $senha;
    }

    public function getFotoPerfil() {
        return $this->foto_perfil;
    }

    public function setFotoPerfil($foto_perfil) {
        $this->foto_perfil = $foto_perfil;
    }

    public function getPontuacao() {
        return $this->pontuacao;
    }

    public function setPontuacao($pontuacao) {
        $this->pontuacao = $pontuacao;
    }

    public function getTarefasConcluidas() {
        return $this->tarefas_concluidas;
    }

    public function setTarefasConcluidas($tarefas_concluidas) {
        $this->tarefas_concluidas = $tarefas_concluidas;
    }


}
