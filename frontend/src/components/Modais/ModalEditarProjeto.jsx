import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import editProject from "../../api/projects/editProject";
import getProjects from "../../api/projects/getProjects";
import showToast from "../../utils/showToast";
import GenericModal from "./GenericModal";
import InputField from "../InputField";
import getUsersByProject from "../../api/getUsersByProject";
import getUsers from "../../api/getUsers";

// Componente de Select Múltiplo (Opcional, mas melhora organização)
// Se preferir, pode manter o <select> diretamente no modal.
const MultiSelectUsers = ({ label, allUsers = [], selectedUserIds = [], onChange, error }) => {
  return (
    <div className="mt-2">
      <label
        htmlFor="participantes"
        className="mb-2 text-sm font-medium"
      >
        {label}
      </label>
      <div className="flex">
        <select
          id="participantes"
          className={`rounded-lg bg-gray-50 border text-gray-900 w-full text-sm p-2.5 ${error ? 'border-red-500' : 'border-gray-300'}`}
          name="participantes"
          value={selectedUserIds} // O valor deve ser um array de IDs
          multiple
          onChange={(e) => {
            // Extrai os valores selecionados e passa para a função onChange
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            onChange(selectedOptions);
          }}
        >
          <option disabled value="">Selecione participantes</option>
          {allUsers.map((user) => (
            <option
              key={user.id_usuario}
              value={user.id_usuario} // O valor da opção é o ID
            >
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
  const [allUsers, setAllUsers] = useState([]); // Estado para todos os usuários
  const [formData, setFormData] = useState({
    id_projeto: '',
    lideres: [],
    nome_projeto: '',
    participantes: [], // Armazenará os IDs dos usuários selecionados
  });

  // Inicializa o formData quando 'data' muda (modal abre/projeto muda)
  useEffect(() => {
    if (data) {
        setFormData({
            id_projeto: data.id_projeto || '',
            lideres: data.id_lider || [],
            nome_projeto: data.nome_projeto || '',
            participantes: [], // Inicializa vazio, será preenchido abaixo
        });
    }
  }, [data]); // Depende apenas de 'data'


  // Busca usuários (todos e os do projeto) quando o modal abre ou o ID do projeto muda
  useEffect(() => {
    // Só executa se o modal estiver aberto e tiver um ID de projeto
    if (isOpen && data?.id_projeto) {
        const fetchUsers = async () => {
            try {
                // Busca todos os usuários e os usuários do projeto em paralelo
                const [allUsersResponse, projectUsersResponse] = await Promise.all([
                    getUsers(),
                    getUsersByProject(data.id_projeto),
                ]);

                // Define a lista de todos os usuários
                setAllUsers(Array.isArray(allUsersResponse) ? allUsersResponse : []);

                // Extrai os IDs dos usuários do projeto e atualiza o formData
                const projectUserIds = Array.isArray(projectUsersResponse)
                    ? projectUsersResponse.map(user => String(user.id_usuario)) // Converte IDs para string para o <select>
                    : [];

                setFormData(prev => ({
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
  }, [isOpen, data?.id_projeto]); // Depende de isOpen e data.id_projeto

  // Função de validação
  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.nome_projeto.trim()) newErrors.nome_projeto = "O nome do projeto é obrigatório";
    // Poderia adicionar validação para participantes se necessário
    return newErrors;
  }, [formData.nome_projeto]);


  // Função para lidar com a submissão
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
        // Certifique-se que 'editProject' espera um objeto com 'id_projeto', 'nome_projeto' e 'participantes' (array de IDs)
        const result = await editProject(formData);

        if (result.status === "sucesso") {
            closeModal();
            showToast(result.messages, "success");
            // Atualiza a lista de projetos na página principal
            const updatedProjects = await getProjects();
            setProjects(updatedProjects);
        } else {
            showToast(result.messages || "Ocorreu um erro ao editar.", "error");
            if (result.status === 401) {
                localStorage.removeItem("isLoggedIn");
                navigate("/");
            }
        }
    } catch (err) {
        console.error("Erro ao submeter:", err);
        showToast("Ocorreu um erro inesperado.", "error");
    }
  };

  // Função para atualizar o formData quando o nome muda
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro do campo ao digitar
    if (error[name]) {
        setError(prev => ({...prev, [name]: undefined}));
    }
  };

  // Função para atualizar os participantes selecionados
  const handleParticipantsChange = (selectedIds) => {
    setFormData((prev) => ({ ...prev, participantes: selectedIds }));
  };

  // Não renderiza nada se o modal estiver fechado
  if (!isOpen) return null;

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
        onChange={handleInputChange} // Usa o handler geral
      />

      <MultiSelectUsers
          label="Participantes"
          allUsers={allUsers}
          selectedUserIds={formData.participantes}
          onChange={handleParticipantsChange}
          error={error.participantes} // Se houver erro de validação para participantes
      />

    </GenericModal>
  );
}

export default ModalEditarProjeto;