import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import createTask from "../../api/tasks/createTask";
import handleChangeUtil from "../../utils/handleChange";
import InputField from "../InputField";
import GenericModal from "./GenericModal";
import showToast from "../../utils/showToast";
import getUsersByProject from "../../api/getUsersByProject";
import MultiSelectUsers from "../MultiSelectUsers";

function ModalCriarTarefa({ isOpen, closeModal, onTaskCreated }) {
  const { idProjeto } = useParams();
  const [errors, setErrors] = useState({});
  const [projectUsers, setProjectUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [minSelectableDateTime, setMinSelectableDateTime] = useState("");

  const initialFormData = {
    titulo: "",
    descricao: "",
    data_inicio: "",
    data_limite: "",
    prioridade: "",
    multiplicador: "",
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
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Início do dia atual

    if (!formData.titulo.trim()) newErrors.titulo = "O título da tarefa é obrigatório";
    if (!formData.data_inicio) newErrors.data_inicio = "A data de início é obrigatória";
    if (!formData.data_limite) newErrors.data_limite = "A data limite é obrigatória";
    if (formData.ids_responsaveis.length === 0) newErrors.ids_responsaveis = "Selecione pelo menos um responsável";
    if (!formData.prioridade) newErrors.prioridade = "A prioridade é obrigatória";

    // Validação de datas no JavaScript
    if (formData.data_inicio) {
      const dataInicio = new Date(formData.data_inicio);
      if (dataInicio < now) {
        newErrors.data_inicio = "A data de início não pode ser anterior ao dia atual.";
      }
    }
    if (formData.data_limite) {
      const dataLimite = new Date(formData.data_limite);
      if (dataLimite < now) {
        newErrors.data_limite = "A data limite não pode ser anterior ao dia atual.";
      }
      if (formData.data_inicio && dataLimite <= new Date(formData.data_inicio)) {
        newErrors.data_limite = "A data limite não pode ser anterior ou igual à data de início.";
      }
    }

    return newErrors;
  }

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleResponsaveisChange = (selectedIds) => {
    setFormData((prev) => ({ ...prev, ids_responsaveis: selectedIds }));
    if (errors.ids_responsaveis) {
      setErrors((prev) => ({ ...prev, ids_responsaveis: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Por favor, corrija os erros indicados.", "error");
      return;
    }
    setErrors({});

    // Formatar datas para o formato esperado pela API (ex.: YYYY-MM-DD)
    const dadosParaApi = {
      ...formData,
      id_projeto: parseInt(idProjeto, 10),
      ids_responsaveis: formData.ids_responsaveis.map((id) => parseInt(id, 10)),
      data_inicio: formData.data_inicio ? formData.data_inicio.replace("T", " ") : "",
      data_limite: formData.data_limite ? formData.data_limite.replace("T", " ") : "",
    };

    try {
      const result = await createTask(dadosParaApi);
      if (result.sucesso) {
        showToast("Tarefa criada com sucesso", "success");
        resetForm();
        closeModal();
        if (onTaskCreated) onTaskCreated(); // Chama a função para atualizar a lista de tarefas
      } else {
        showToast(result.erro || "Erro ao criar tarefa.", "error");
      }
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      showToast("Ocorreu um erro inesperado ao criar a tarefa.", "error");
    }
  };

  useEffect(() => {
    if (isOpen && idProjeto) {
      const fetchProjectUsers = async () => {
        setIsLoadingUsers(true);
        setErrors((prev) => ({ ...prev, ids_responsaveis: undefined }));
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

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      // Define o mínimo como o início do dia atual
      const minDateTimeString = `${year}-${month}-${day}T00:00`;
      setMinSelectableDateTime(minDateTimeString);
    }
  }, [isOpen]);

  const handleSimpleChange = (e) => {
    handleChangeUtil(e, setFormData, formData);
  };

  return (
    <GenericModal
      title="Criar tarefa"
      textButton="Criar"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <InputField
        error={errors.titulo}
        label="Título da tarefa"
        name="titulo"
        onChange={handleSimpleChange}
        placeholder="Informe um título para a tarefa"
        value={formData.titulo}
      />
      <div className="mt-2">
        <label htmlFor="descricao" className="block mb-2 text-sm font-medium">
          Descrição da tarefa
        </label>
        <textarea
          id="descricao"
          className={`rounded-lg bg-gray-50 border text-gray-900 w-full text-sm p-2.5 border-gray-300`}
          placeholder="Informe uma descrição para a tarefa (opcional)"
          name="descricao"
          value={formData.descricao}
          onChange={handleSimpleChange}
          rows="3"
        />
        {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao}</p>}
      </div>
      <InputField
        error={errors.data_inicio}
        label="Data de início"
        name="data_inicio"
        onChange={handleSimpleChange}
        value={formData.data_inicio}
        type="datetime-local"
        min={minSelectableDateTime}
      />
      <InputField
        error={errors.data_limite}
        label="Data limite"
        name="data_limite"
        onChange={handleSimpleChange}
        value={formData.data_limite}
        type="datetime-local"
        min={formData.data_inicio || minSelectableDateTime}
      />
      <div className="mt-2">
        <label htmlFor="prioridadeTarefaId" className="block mb-2 text-sm font-medium">
          Prioridade *
        </label>
        <select
          id="prioridadeTarefaId"
          className={`rounded-lg bg-gray-50 border text-gray-900 w-full text-sm p-2.5 ${errors.prioridade ? "border-red-500" : "border-gray-300"}`}
          name="prioridade"
          value={formData.prioridade}
          onChange={handleSimpleChange}
        >
          <option value="">Selecione uma prioridade</option>
          <option value="Baixa">Baixa</option>
          <option value="Moderada">Moderada</option>
          <option value="Alta">Alta</option>
          <option value="Imediata">Imediata</option>
        </select>
        {errors.prioridade && <p className="text-red-500 text-xs mt-1">{errors.prioridade}</p>}
      </div>
      <div className="mt-2">
        <label htmlFor="multiplicador" className="block mb-2 text-sm font-medium">
          Multiplicador da tarefa (1 a 10)
        </label>
        <input
          type="number"
          max={10}
          min={1}
          step={0.1}
          id="multiplicador"
          className={`rounded-lg bg-gray-50 border text-gray-900 w-full text-sm p-2.5 border-gray-300`}
          placeholder="Informe uma multiplicador para a tarefa (opicional)"
          name="multiplicador"
          value={formData.multiplicador}
          onChange={handleSimpleChange}
        />
        {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao}</p>}
      </div>
      <MultiSelectUsers
        label="Responsáveis"
        allUsers={projectUsers}
        selectedUserIds={formData.ids_responsaveis}
        onChange={handleResponsaveisChange}
        error={errors.ids_responsaveis}
        placeholder="Selecione o(s) responsável(eis)"
        isLoading={isLoadingUsers}
        inputId="responsaveis-tarefa-select"
      />
    </GenericModal>
  );
}

export default ModalCriarTarefa;