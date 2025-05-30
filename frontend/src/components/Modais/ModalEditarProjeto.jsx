import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import editProject from "../../api/projects/editProject";
import getProjects from "../../api/projects/getProjects";
import showToast from "../../utils/showToast";
import GenericModal from "./GenericModal";
import InputField from "../InputField";
import getUsersByProject from "../../api/getUsersByProject";
import getUsers from "../../api/getUsers";
import MultiSelectUsers from "../MultiSelectUsers"

function ModalEditarProjeto({ isOpen, closeModal, data, setProjects }) {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [formData, setFormData] = useState({
    id_projeto: "",
    lideres: [],
    nome_projeto: "",
    participantes: [],
  });

  // Inicializa o formData quando 'data' muda
  useEffect(() => {
    if (data && isOpen) {
      setFormData({
        id_projeto: data.id_projeto || "",
        lideres: data.id_lider ? [String(data.id_lider)] : [],
        nome_projeto: data.nome_projeto || "",
        participantes: [], // Inicialmente vazio, será populado pelo useEffect abaixo
      });
    }
  }, [data, isOpen]);

  // Busca usuários e participantes quando o modal abre
  useEffect(() => {
    if (isOpen && data?.id_projeto) {
      const fetchUsers = async () => {
        const [allUsersResponse, projectUsersResponse] = await Promise.all([
          getUsers(),
          getUsersByProject(data.id_projeto),
        ]);

        // Garante que allUsersResponse seja um array
        const users = Array.isArray(allUsersResponse) ? allUsersResponse : [];
        setAllUsers(users);

        // Converte IDs de participantes para strings
        const projectUserIds = Array.isArray(projectUsersResponse)
          ? projectUsersResponse.map((user) => String(user.id_usuario))
          : [];

        setFormData((prev) => ({
          ...prev,
          participantes: projectUserIds,
        }));
      };

      fetchUsers();
    }
  }, [isOpen, data?.id_projeto]);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.nome_projeto.trim())
      newErrors.nome_projeto = "O nome do projeto é obrigatório";
    return newErrors;
  }, [formData.nome_projeto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast("Preencha todos os campos obrigatórios.", "error");
      return;
    }

    try {
      const result = await editProject({
        ...formData,
        participantes: formData.participantes.map((id) => parseInt(id, 10)),
        lideres: formData.lideres.map((id) => parseInt(id, 10)),
      });

      if (result.status === "sucesso") {
        showToast(result.messages || "Projeto editado com sucesso!", "success");
        closeModal();

        // Atualiza a lista de projetos
        const updatedProjectsResponse = await getProjects();
        const updatedProjects = updatedProjectsResponse?.projetos || [];
        setProjects(updatedProjects);
      } else {
        showToast(result.messages || "Erro ao editar o projeto.", "error");
        if (result.status === 401) {
          localStorage.removeItem("isLoggedIn");
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Erro ao submeter:", err);
      showToast(
        `Erro: ${err.message || "Falha na requisição ao servidor."}`,
        "error"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleParticipantsChange = (selectedIds) => {
    const leadersIds = formData.lideres;

    const allIds = [...leadersIds, ...selectedIds];
    setFormData((prev) => ({ ...prev, participantes: allIds }));
    setError((prev) => ({ ...prev, participantes: undefined }));
  };

  if (!isOpen || !data) return null;

  return (
    <GenericModal
      handleClose={closeModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      textButton={"Salvar Alterações"}
      title={"Editar Projeto"}
    >
      <InputField
        label={"Nome do projeto"}
        error={error.nome_projeto}
        name={"nome_projeto"}
        placeholder={"Informe o nome do projeto"}
        value={formData.nome_projeto}
        onChange={handleInputChange}
      />

      <MultiSelectUsers
        label="Participantes"
        allUsers={allUsers}
        selectedUserIds={formData.participantes}
        onChange={handleParticipantsChange}
        error={error.participantes}
      />
    </GenericModal>
  );
}

export default ModalEditarProjeto;
