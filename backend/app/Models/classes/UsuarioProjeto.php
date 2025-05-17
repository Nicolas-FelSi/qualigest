<?php
class Usuarioprojeto {

    private $id_usuario;
    private $id_projeto;
    private $is_lider;  // novo campo booleano para indicar se é líder

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

    public function getIsLider() {
        return $this->is_lider;
    }

    public function setIsLider($is_lider) {
        $this->is_lider = $is_lider;
    }
}
