import { useEffect, useState } from "react";
import getUsers from "../../api/getUsers";
import getProjects from "../../api/projects/getProjects"
import createProject from "../../api/projects/createProject";
import showToast from "../../utils/showToast";
import GenericModal from "./GenericModal";
import InputField from "../InputField"

function ModalCriarProjeto({ isOpen, closeModal, setProjects }) {
  const [error, setError] = useState("");
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
      participantes: await getUsers()
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
      ...formData,
      participantes: formData.selectedParticipants,
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

  useEffect(() => {
    const handleUsers = async () => {
      const users = await getUsers();
      setFormData({
        ...formData, 
        participantes: Array.isArray(users) ? users : []
      })
    }
    handleUsers();
  }, [])

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
        <div className="flex">
          <select
            id="participantes"
            className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
            name="paticipantes"
            value={formData.selectedParticipants}
            multiple
            onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              selectedParticipants: Array.from(e.target.selectedOptions, (option) => option.value)
            }))
          }
          >
            <option disabled>Selecione participantes</option>
            {Array.isArray(formData.participantes) &&
              formData.participantes.map((participante) => (
                <option
                  key={participante.id_usuario}
                  value={participante.id_usuario}
                >
                  {participante.nome_completo}
                </option>
              ))
            }
          </select>
        </div>
      </div>
    </GenericModal>
  )        
}

export default ModalCriarProjeto;
