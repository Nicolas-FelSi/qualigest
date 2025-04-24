<?php
class Usuarioprojeto {

    private $id_usuario;
    private $id_projeto;

    public function getIdUsuario() {
        return $this->id_usuario;
    }

    public function setIdUsuario($id_usuario) {
        $this->id_usuario = $id_usuario;
    }

    public function getIdProjeto() {
        return $this->id_projeto;
    }

    public function setIdProjeto($id_projeto) {
        $this->id_projeto = $id_projeto;
    }

}