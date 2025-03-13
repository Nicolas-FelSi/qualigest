<?php

class UsuarioTarefa {

    private $id_usuario;
    private $id_tarefa;

    public function getIdUsuario() {
        return $this->id_usuario;
    }

    public function setIdUsuario($id_usuario) {
        $this->id_usuario = $id_usuario;
    }

    public function getIdTarefa() {
        return $this->id_tarefa;
    }

    public function setIdTarefa($id_tarefa) {
        $this->id_tarefa = $id_tarefa;
    }
}