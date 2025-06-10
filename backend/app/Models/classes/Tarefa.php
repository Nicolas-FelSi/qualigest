<?php
class Tarefa {
    private $titulo;
    private $descricao;
    private $dataInicio;
    private $dataLimite;
    private $prioridade;
    private $pontuacaoTarefa;
    private $multiplicador;
    private $status;
    private $id_tarefa;	
    private $id_projeto;
    
    public function set_id_tarefa($id_tarefa) {
        $this->id_tarefa = $id_tarefa;
    }

    public function get_id_tarefa() {
        return $this->id_tarefa;
    }

    public function set_titulo($titulo) {
        $this->titulo = $titulo;
    }

    public function get_titulo() {
        return $this->titulo;
    }

    public function set_descricao($descricao) {
        $this->descricao = $descricao;
    }

    public function get_descricao() {
        return $this->descricao;
    }

    public function set_dataInicio($dataInicio) {
        $this->dataInicio = $dataInicio;
    }

    public function get_dataInicio() {
        return $this->dataInicio;
    }

    public function set_dataLimite($dataLimite) {
        $this->dataLimite = $dataLimite;
    }

    public function get_dataLimite() {
        return $this->dataLimite;
    }

    public function set_prioridade($prioridade) {
        $this->prioridade = $prioridade;
    }

    public function get_prioridade() {
        return $this->prioridade;
    }

    public function set_pontuacaoTarefa($pontuacaoTarefa) {
        $this->pontuacaoTarefa = $pontuacaoTarefa;
    }

    public function get_pontuacaoTarefa() {
        return $this->pontuacaoTarefa;
    }

    public function set_multiplicador($multiplicador) {
        $this->multiplicador = $multiplicador;
    }

    public function get_multiplicador() {
        return $this->multiplicador;
    }

    public function set_status($status) {
        $this->status = $status;
    }

    public function get_status() {
        return $this->status;
    }

    public function set_id_projeto($id_projeto) {
        $this->id_projeto = $id_projeto;
    }

    public function get_id_projeto() {
        return $this->id_projeto;
    }
}