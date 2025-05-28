import { useEffect, useState } from "react";
import createTask from "../../api/tasks/createTask";
import handleChange from "../../utils/handleChange"
import InputField from "../InputField";
import GenericModal from "./GenericModal";
import { useParams } from "react-router-dom";
import showToast from "../../utils/showToast"
import getUsersByProject from "../../api/getUsersByProject";

function ModalCriarTarefa({ isOpen, closeModal  }) {
  const { idProjeto } = useParams();
  const [errors, setErrors] = useState({});
  const [projectUsers, setProjectUsers] = useState([]); // Estado para usuários do projeto
  const [isLoadingUsers, setIsLoadingUsers] = useState(false); // Estado para loading dos usuários
  const initialFormData = {
    titulo: "",
    descricao: "",
    data_limite: "",
    prioridade: "",
    ids_responsaveis: [], 
    id_projeto: "",
  };
  const [formData, setFormData] = useState(initialFormData);

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

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleMultiSelectChange = (e) => {
    const selectedIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData(prev => ({ ...prev, ids_responsaveis: selectedIds }));
    if (errors.responsavel) {
        setErrors(prev => ({...prev, responsavel: undefined}));
    }
  };

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
      id_projeto: parseInt(idProjeto), 
      data_inicio: new Date().toISOString(),
      ids_responsaveis: formData.ids_responsaveis.map(id => parseInt(id)), 
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


  // Busca usuários e participantes quando o modal abre
  useEffect(() => {
    if (isOpen && idProjeto) {
      const fetchProjectUsers = async () => {
        setIsLoadingUsers(true);
        setErrors(prev => ({...prev, responsavel: undefined}));
        try {
          const users = await getUsersByProject(idProjeto);
          setProjectUsers(Array.isArray(users) ? users : []);
        } catch (error) {
          console.error("Erro ao buscar usuários do projeto:", error);
          showToast("Erro ao carregar responsáveis.", "error");
          setProjectUsers([]);
        } finally {
          setIsLoadingUsers(false);
        }
      };
      fetchProjectUsers();
    }
  }, [isOpen, idProjeto]);

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
              <option value="Imediata">Imediata</option>
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
