import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import editTask from "../../api/tasks/editTask"; 
import handleChangeUtil from "../../utils/handleChange";
import InputField from "../InputField";
import GenericModal from "./GenericModal";
import showToast from "../../utils/showToast";
import getUsersByProject from "../../api/getUsersByProject";
import MultiSelectUsers from "../MultiSelectUsers";
import getTaskById from "../../api/tasks/getTaskById";
import { format, parseISO } from "date-fns";

function ModalEditarTarefa({ isOpen, closeModal, taskId }) {
  const { idProjeto } = useParams();
  const [errors, setErrors] = useState({});
  const [projectUsers, setProjectUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [minSelectableDateTime, setMinSelectableDateTime] = useState("");
  const [taskData, setTaskData] = useState(null);

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

  useEffect(() => {
    if (isOpen && taskId) {
      const fetchTask = async () => {
        setTaskData(null); // Limpa dados antigos
        try {
          const data = await getTaskById(taskId);
          if (data) {
            setTaskData(data); // Armazena os dados recebidos da API
          } else {
            showToast("Não foi possível carregar os dados da tarefa.", "error");
            closeModal();
          }
        } catch (error) {
          showToast("Erro ao carregar a tarefa.", "error");
          console.error(error);
        }
      };

      fetchTask();
    }
  }, [isOpen, taskId, closeModal]);


  // EFEITO 2: POPULAR O FORMULÁRIO QUANDO OS DADOS DA TAREFA SÃO CARREGADOS
  useEffect(() => {
    if (taskData) { // Dispara quando taskData for preenchido
      const formattedDataInicio = taskData.data_inicio ? taskData.data_inicio.replace(" ", "T") : "";
      const formattedDataLimite = taskData.data_limite ? taskData.data_limite.replace(" ", "T") : "";
      const capitalize = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);
      
      setFormData({
        titulo: taskData.titulo || "",
        descricao: taskData.descricao || "",
        data_inicio: formattedDataInicio,
        data_limite: formattedDataLimite,
        prioridade: capitalize(taskData.prioridade) || "",
        multiplicador: taskData.multiplicador || "",
        ids_responsaveis: taskData.responsaveis ? taskData.responsaveis.map(user => String(user.id_usuario)) : [],
      });
    }
  }, [taskData]); // Depende apenas dos dados da tarefa


  const handleClose = () => {
    setTaskData(null); // Limpa os dados ao fechar
    setFormData(initialFormData); // Reseta o formulário
    setErrors({});
    closeModal();
  };

  // A função de validação pode ser a mesma
  function validate() {
    const newErrors = {};
    const now = new Date();
    now.setHours(0, 0, 0, 0); 

    if (!formData.titulo.trim()) newErrors.titulo = "O título da tarefa é obrigatório";
    if (!formData.data_inicio) newErrors.data_inicio = "A data de início é obrigatória";
    if (!formData.data_limite) newErrors.data_limite = "A data limite é obrigatória";
    if (formData.ids_responsaveis.length === 0) newErrors.ids_responsaveis = "Selecione pelo menos um responsável";
    if (!formData.prioridade) newErrors.prioridade = "A prioridade é obrigatória";

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

  const handleResponsaveisChange = (selectedIds) => {
    setFormData((prev) => ({ ...prev, ids_responsaveis: selectedIds }));
    if (errors.ids_responsaveis) {
      setErrors((prev) => ({ ...prev, ids_responsaveis: undefined }));
    }
  };

  // MUDANÇA: Lógica de submissão para ATUALIZAR
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Por favor, corrija os erros indicados.", "error");
      return;
    }
    setErrors({});

    const dataInicioFormatada = formData.data_inicio
      ? format(parseISO(formData.data_inicio), "yyyy-MM-dd HH:mm")
      : "";
    const dataLimiteFormatada = formData.data_limite
      ? format(parseISO(formData.data_limite), "yyyy-MM-dd HH:mm")
      : "";

    const dadosParaApi = {
      ...formData,
      id_projeto: parseInt(idProjeto, 10),
      ids_responsaveis: formData.ids_responsaveis.map((id) => parseInt(id, 10)),
      data_inicio: dataInicioFormatada,
      data_limite: dataLimiteFormatada,
    };

    try {
      // MUDANÇA: Chama editTask com o ID da tarefa
      const result = await editTask(taskId, dadosParaApi); 
      if (result.mensagem) {
        showToast(result.mensagem || "Tarefa atualizada com sucesso!", "success");
        closeModal();
      } else {
        showToast(result.erro || "Erro ao atualizar tarefa.", "error");
      }
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      showToast("Ocorreu um erro inesperado ao atualizar a tarefa.", "error");
    }
  };

  // A busca por usuários do projeto continua a mesma
  useEffect(() => {
    if (isOpen && idProjeto) {
      const fetchProjectUsers = async () => {
        setIsLoadingUsers(true);
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
  
  // A definição da data mínima selecionável continua a mesma
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const minDateTimeString = `${year}-${month}-${day}T00:00`;
      setMinSelectableDateTime(minDateTimeString);
    }
  }, [isOpen]);

  const handleSimpleChange = (e) => {
    handleChangeUtil(e, setFormData, formData);
  };

  return (
    // MUDANÇA: Título e texto do botão
    <GenericModal
      title="Editar tarefa"
      textButton="Salvar alterações"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {/* O JSX dos campos do formulário pode permanecer exatamente o mesmo */}
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
        inputId="responsaveis-tarefa-edit-select" // ID único para o input de edição
      />
    </GenericModal>
  );
}

export default ModalEditarTarefa;