<?php 

class Projeto {

    private $id_projeto;
    private $nome_projeto;
    private $pontuacao_projeto;
    private $id_usuario;

    public function getIdProjeto() {
        return $this->id_projeto;
    }

    public function setIdProjeto($id_projeto) {
        $this->id_projeto = $id_projeto;
    }


    public function getNomeProjeto() {
        return $this->nome_projeto;
    }

    public function setNomeProjeto($nome_projeto) {
        $this->nome_projeto = $nome_projeto;
    }

    public function getPontuacaoProjeto() {
        return $this->pontuacao_projeto;
    }

    public function setPontuacaoProjeto($pontuacao_projeto) {
        $this->pontuacao_projeto = $pontuacao_projeto;
    }

    public function getIdUsuario() {
        return $this->id_usuario;
    }

    public function setIdUsuario($id_usuario) {
        $this->id_usuario = $id_usuario;
    }


}