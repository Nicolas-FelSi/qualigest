import { useEffect, useState } from "react";
import getUsers from "../../api/getUsers";
import getProjects from "../../api/projects/getProjects"
import createProject from "../../api/projects/createProject";
import showToast from "../../utils/showToast";
import GenericModal from "./GenericModal";
import InputField from "../InputField"
import Select from "react-select"

function ModalCriarProjeto({ isOpen, closeModal, setProjects }) {
  const [error, setError] = useState("");
  const [participantesOptions, setParticipantesOptions] = useState([]); // Opções para o react-select
  const [formData, setFormData] = useState({
    nome_projeto: "",
    participantes: [],
    selectedParticipants: []
  });

  function validate() {
      const newErrors = {};

      if (formData.nome_projeto == "") newErrors.nome_projeto = "O nome do projeto é obrigatório";

      return newErrors;
  }

  const resetForm = async () => {
    setFormData({
      nome_projeto: "",
      selectedParticipants: [],
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

    const participantIds = formData.selectedParticipants.map(p => p.value);

    const data = await createProject({
      nome_projeto: formData.nome_projeto,
      participantes: participantIds, // Envia apenas os IDs
    });

    if (data.status === "sucesso") {
      handleClose();
      showToast(data.mensagem, "success");
    } else {
      showToast(data.mensagem);
    }
    const updatedProjects = await getProjects();
    setProjects(updatedProjects.projetos);
  };

  // Função para lidar com a mudança no Select
  const handleSelectChange = (selectedOptions) => {
    setFormData((prev) => ({
        ...prev,
        selectedParticipants: selectedOptions || [] // Garante que seja sempre um array
    }));
  }

   // Carrega os usuários e formata para o react-select
  useEffect(() => {
    const handleUsers = async () => {
      const users = await getUsers();
      if (Array.isArray(users)) {
        // Formata os usuários para o padrão { value: 'id', label: 'nome' }
        const options = users.map(user => ({
          value: user.id_usuario,
          label: user.nome_usuario,
        }));
        setParticipantesOptions(options);
      } else {
        setParticipantesOptions([]);
      }
    };
    if (isOpen) { // Carrega apenas quando o modal for aberto (ou na primeira vez)
        handleUsers();
    }
  }, [isOpen]); // Recarrega se o modal abrir (opcional)

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
        onChange={(e) => {
          setFormData((participantes) => ({
            ...participantes,
            nome_projeto: e.target.value
          })
        )}}
        error={error.nome_projeto}
      />
      <div className="mt-2">
        <label
          htmlFor="participantes"
          className="mb-2 text-sm font-medium"
        >
          Participantes
        </label>
        <Select
          id="participantes"
          name="participantes"
          options={participantesOptions} // Passa as opções formatadas
          isMulti // Habilita a seleção múltipla
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Selecione participantes..."
          value={formData.selectedParticipants} // Valor controlado
          onChange={handleSelectChange} // Função para atualizar o estado
          noOptionsMessage={() => "Nenhum participante encontrado"}
          styles={{ // Exemplo básico de estilização (opcional)
            control: (base) => ({
              ...base,
              borderColor: '#d1d5db', // Cor da borda similar ao seu select antigo
              '&:hover': {
                borderColor: '#9ca3af',
              },
            }),
          }}
        />
      </div>
    </GenericModal>
  )        
}

export default ModalCriarProjeto;
