import { useEffect, useState } from "react";
import getUsers from "../../api/getUsers";
import createProject from "../../api/projects/createProject";
import showToast from "../../utils/showToast";
import GenericModal from "./GenericModal";
import InputField from "../InputField";
import MultiSelectUsers from "../MultiSelectUsers"; 

function ModalCriarProjeto({ isOpen, closeModal, refreshProjects }) {
  const [error, setError] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  
  const [formData, setFormData] = useState({
    nome_projeto: "",
    participantes: [], // Este array conterá apenas os IDs ['1', '2', '3']
  });

  function validate() {
    const newErrors = {};
    if (!formData.nome_projeto) newErrors.nome_projeto = "O nome do projeto é obrigatório";
    return newErrors;
  }

  const resetForm = () => {
    setFormData({
      nome_projeto: "",
      participantes: [],
    });
    setError({});
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const validationError = validate();

    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }

    const data = await createProject({
      nome_projeto: formData.nome_projeto,
      participantes: formData.participantes, // Envia diretamente o array de IDs
    });

    if (data.status === "sucesso") {
      handleClose();
      showToast(data.mensagem, "success");
      if (refreshProjects) {
        await refreshProjects();
      }
    } else {
      showToast(data.mensagem);
    }
  };

  const handleParticipantsChange = (selectedIds) => {
    setFormData((prev) => ({
      ...prev,
      participantes: selectedIds,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      const usersData = await getUsers();
      if (Array.isArray(usersData)) {
        setAllUsers(usersData);
      }
      setIsLoadingUsers(false);
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <GenericModal
      title={"Criar projeto"}
      textButton={"Criar projeto"}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <InputField
        label={"Nome do projeto"}
        name={"nome_projeto"}
        placeholder={"Informe o nome do projeto"}
        value={formData.nome_projeto}
        onChange={(e) => setFormData((prev) => ({ ...prev, nome_projeto: e.target.value }))}
        error={error.nome_projeto}
      />
      
      <MultiSelectUsers
        label="Participantes"
        allUsers={allUsers}
        selectedUserIds={formData.participantes}
        onChange={handleParticipantsChange}
        isLoading={isLoadingUsers}
        placeholder="Selecione os participantes..."
      />
    </GenericModal>
  );
}

export default ModalCriarProjeto;