import { useEffect, useState } from "react";
import InputField from "../InputField";
import GenericModal from "./GenericModal";
import showToast from "../../utils/showToast";
import handleChangeUtil from "../../utils/handleChange";
import MultiSelectUsers from "../MultiSelectUsers";
import updateTask from "../../api/tasks/updateTask"; // Você precisa ter essa função na sua API
import getUsersByProject from "../../api/getUsersByProject";

function ModalEditarTarefa({ isOpen, closeModal, tarefa, onTaskUpdated }) {
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [projectUsers, setProjectUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const handleSimpleChange = (e) => {
    handleChangeUtil(e, setFormData, formData);
  };

  const handleResponsaveisChange = (selectedIds) => {
    setFormData((prev) => ({ ...prev, ids_responsaveis: selectedIds }));
  };

  useEffect(() => {
    if (isOpen && tarefa) {
      setFormData({
        ...tarefa,
        data_inicio: tarefa.data_inicio?.replace(" ", "T") || "",
        data_limite: tarefa.data_limite?.replace(" ", "T") || "",
        multiplicador: tarefa.multiplicador || "",
      });
      const fetchUsers = async () => {
        setIsLoadingUsers(true);
        try {
          const users = await getUsersByProject(tarefa.id_projeto);
          setProjectUsers(Array.isArray(users) ? users : []);
        } catch (err) {
          console.error("Erro ao carregar usuários:", err);
          showToast("Erro ao carregar usuários do projeto.", "error");
        } finally {
          setIsLoadingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [isOpen, tarefa]);

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo?.trim()) newErrors.titulo = "O título é obrigatório";
    if (!formData.data_inicio) newErrors.data_inicio = "A data de início é obrigatória";
    if (!formData.data_limite) newErrors.data_limite = "A data limite é obrigatória";
    if (!formData.prioridade) newErrors.prioridade = "A prioridade é obrigatória";
    if (!formData.ids_responsaveis || formData.ids_responsaveis.length === 0) {
      newErrors.ids_responsaveis = "Selecione pelo menos um responsável";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Por favor, corrija os erros.", "error");
      return;
    }

    try {
      const dadosParaApi = {
        ...formData,
        data_inicio: formData.data_inicio.replace("T", " "),
        data_limite: formData.data_limite.replace("T", " "),
      };

      const result = await updateTask(dadosParaApi);
      if (result.sucesso) {
        showToast("Tarefa atualizada com sucesso!", "success");
        if (onTaskUpdated) onTaskUpdated();
        closeModal();
      } else {
        showToast(result.erro || "Erro ao atualizar tarefa.", "error");
      }
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      showToast("Erro inesperado ao atualizar a tarefa.", "error");
    }
  };

  if (!formData) return null;

  return (
    <GenericModal
      title="Editar Tarefa"
      textButton="Salvar"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      handleClose={closeModal}
    >
      <InputField
        error={errors.titulo}
        label="Título da tarefa"
        name="titulo"
        onChange={handleSimpleChange}
        value={formData.titulo}
      />
      <div className="mt-2">
        <label htmlFor="descricao" className="block mb-2 text-sm font-medium">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows="3"
          className="w-full rounded-lg border p-2.5 text-sm"
          onChange={handleSimpleChange}
          value={formData.descricao}
        />
      </div>
      <InputField
        error={errors.data_inicio}
        label="Data de início"
        name="data_inicio"
        onChange={handleSimpleChange}
        value={formData.data_inicio}
        type="datetime-local"
      />
      <InputField
        error={errors.data_limite}
        label="Data limite"
        name="data_limite"
        onChange={handleSimpleChange}
        value={formData.data_limite}
        type="datetime-local"
      />
      <div className="mt-2">
        <label className="block text-sm font-medium">Prioridade</label>
        <select
          name="prioridade"
          value={formData.prioridade}
          onChange={handleSimpleChange}
          className="w-full rounded-lg border p-2.5 text-sm"
        >
          <option value="">Selecione uma prioridade</option>
          <option value="Baixa">Baixa</option>
          <option value="Moderada">Moderada</option>
          <option value="Alta">Alta</option>
          <option value="Imediata">Imediata</option>
        </select>
      </div>
      <div className="mt-2">
        <label className="block text-sm font-medium">Multiplicador</label>
        <input
          type="number"
          name="multiplicador"
          value={formData.multiplicador}
          onChange={handleSimpleChange}
          className="w-full rounded-lg border p-2.5 text-sm"
          min={1}
          max={10}
          step={0.1}
        />
      </div>
      <MultiSelectUsers
        label="Responsáveis"
        allUsers={projectUsers}
        selectedUserIds={formData.ids_responsaveis}
        onChange={handleResponsaveisChange}
        error={errors.ids_responsaveis}
        placeholder="Selecione os responsáveis"
        isLoading={isLoadingUsers}
        inputId="edit-tarefa-usuarios"
      />
    </GenericModal>
  );
}

export default ModalEditarTarefa;
