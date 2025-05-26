import { useState } from "react";
import createTask from "../../api/tasks/createTask";
import handleChange from "../../utils/handleChange"
import InputField from "../InputField";
import GenericModal from "./GenericModal";
import { useParams } from "react-router-dom";
import showToast from "../../utils/showToast"

function ModalCriarTarefa({ isOpen, closeModal  }) {
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data_inicio: "",
    data_limite: "",
    prioridade: "",
    id_projeto: "",
  });

  const resetForm = () => {
    setFormData({
      ...formData,
      titulo: "",
      descricao: "",
      data_inicio: "",
      data_limite: "",
      prioridade: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  function validate() {
    const newErrors = {};

    if (formData.titulo.trim() == "") newErrors.titulo = "O título da tarefa é obrigatório";
    if (formData.data_limite == "") newErrors.data_limite = "A data de entrega é obrigatória";

    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const dadosParaApi = {
      ...formData, 
      id_projeto: parseInt(params.idProjeto), 
      data_inicio: new Date().toISOString(),
    };

    const result = await createTask(dadosParaApi); 

    if (result.sucesso) {
      showToast("Tarefa criada com sucesso", "success");
      resetForm();
      closeModal();
    } else {
      showToast(result.erro);
    }
  };

  if (!isOpen) return null;

  return (
      <GenericModal
        title={"Criar tarefa"}
        textButton={"Criar"}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <InputField
          error={errors.titulo}
          label={"Título da tarefa"}
          name={"titulo"}
          onChange={(e) => handleChange(e, setFormData, formData)}
          placeholder={"Informe um título para a tarefa"}
          value={formData.titulo}
        />
        <div className="mt-2">
          <label htmlFor="descricao" className="mb-2 text-sm font-medium">
            Descrição da tarefa
          </label>
          <div className="flex">
            <textarea
              id="descricao"
              className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm p-2.5 border-gray-300"
              placeholder="Informe uma descrição para a tarefa"
              name="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange(e, setFormData, formData)}
            />
          </div>
        </div>
        <InputField
          error={errors.data_limite}
          label={"Data limite"}
          name={"data_limite"}
          onChange={(e) => handleChange(e, setFormData, formData)}
          value={formData.data_limite}
          type="datetime-local"
        />
        <div className="mt-2">
          <label
            htmlFor="prioridadeTarefaId"
            className="mb-2 text-sm font-medium"
          >
            Prioridade
          </label>
          <div className="flex">
            <select
              id="prioridadeTarefaId"
              className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
              name="prioridade"
              value={formData.prioridade}
              onChange={(e) => handleChange(e, setFormData, formData)}
            >
              <option className="text-body-tertiary" defaultValue={true}>
                Selecione uma prioridade
              </option>
              <option value="Baixa">Baixa</option>
              <option value="Moderada">Moderada</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
        </div>
        {/* <div className="mt-2">
          <label
            htmlFor="responsavelTarefaId"
            className="mb-2 text-sm font-medium"
          >
            Responsável
          </label>
          <div className="flex">
            <select
              id="responsavelTarefaId"
              className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
              name="responsavel"
              value={formData.}
              onChange={(e) => handleChange(e, setFormData, formData)}
            >
              <option className="text-body-tertiary" defaultValue={true}>
                Selecione um responsável
              </option>
            </select>
          </div>
        </div> */}
      </GenericModal>
  );
}

export default ModalCriarTarefa;
