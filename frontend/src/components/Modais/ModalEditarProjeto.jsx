import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import editProject from "../../api/projects/editProject";
import getProjects from "../../api/projects/getProjects";
import showToast from "../../utils/showToast";
import GenericModal from "./GenericModal";
import InputField from "../InputField";
import getUsersByProject from "../../api/getUsersByProject";
import getUsers from "../../api/getUsers";

const MultiSelectUsers = ({ label, allUsers = [], selectedUserIds = [], onChange, error }) => {
  return (
    <div className="mt-2">
      <label htmlFor="participantes" className="mb-2 text-sm font-medium">
        {label}
      </label>
      <div className="flex">
        <select
          id="participantes"
          className={`rounded-lg bg-gray-50 border text-gray-900 w-full text-sm p-2.5 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          name="participantes"
          value={selectedUserIds}
          multiple
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            onChange(selectedOptions);
          }}
        >
          <option disabled value="">
            Selecione participantes
          </option>
          {allUsers.map((user) => (
            <option key={user.id_usuario} value={String(user.id_usuario)}>
              {user.nome_completo}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

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
        try {
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
        } catch (err) {
          console.error("Erro ao buscar usuários:", err);
          showToast("Erro ao carregar dados dos usuários.", "error");
        }
      };

      fetchUsers();
    }
  }, [isOpen, data?.id_projeto]);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.nome_projeto.trim()) newErrors.nome_projeto = "O nome do projeto é obrigatório";
    if (formData.participantes.length === 0)
      newErrors.participantes = "Selecione pelo menos um participante";
    return newErrors;
  }, [formData.nome_projeto, formData.participantes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showToast("Preencha todos os campos obrigatórios.", "error");
      return;
    }
    console.log("Dados enviados para editProject:", {
      ...formData,
      participantes: formData.participantes.map((id) => parseInt(id, 10)),
      lideres: formData.lideres.map((id) => parseInt(id, 10)),
    });
    try {
      const result = await editProject({
        ...formData,
        participantes: formData.participantes.map((id) => parseInt(id, 10)),
        lideres: formData.lideres.map((id) => parseInt(id, 10)),
      });

      console.log("Resposta editProject:", result);

      if (result.status === "sucesso") {
        showToast(result.messages || "Projeto editado com sucesso!", "success");
        closeModal();

        // Atualiza a lista de projetos
        const updatedProjectsResponse = await getProjects();
        console.log("Resposta getProjects:", updatedProjectsResponse);
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
      showToast(`Erro: ${err.message || "Falha na requisição ao servidor."}`, "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleParticipantsChange = (selectedIds) => {
    setFormData((prev) => ({ ...prev, participantes: selectedIds }));
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