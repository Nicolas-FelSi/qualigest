import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import editProject from "../../api/projects/editProject";
import getProjects from "../../api/projects/getProjects";
import showToast from "../../utils/showToast";
import GenericModal from "./GenericModal";
import InputField from "../InputField";
import getUsersByProject from "../../api/getUsersByProject";
import getUsers from "../../api/getUsers";

function ModalEditarProjeto({ isOpen, closeModal, data, setProjects }) {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    id_projeto: data.id_projeto,
    nome_projeto: data.nome_projeto,
    participantes: [],
    selectedParticipants: []
  });

  function validate() {
    const newErrors = {};

    if (formData.nome_projeto == "") newErrors.nome_projeto = "O nome do projeto é obrigatório";

    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(validate()).length > 0) {
      setError(validate());
      return;
    }

    const data = await editProject(formData);
    
    if (data.status === "sucesso") {
      closeModal();

      showToast(data.messages, "success");
    } else {
      showToast(data.messages);

      if (data.status === 401) {
        localStorage.removeItem("isLoggedIn");
        navigate("/"); 
      }
    }

    const updatedProjects = await getProjects();
    setProjects(updatedProjects);
  };

  useEffect(() => {
    const handleUsersByProject = async () => {
      const users = await getUsersByProject(data.id_projeto);
      setFormData({
        ...formData, 
        selectedParticipants: Array.isArray(users) ? users : []
      })
    }
    
    const handleUsers = async () => {
      const users = await getUsers();
        setFormData({
          ...formData, 
          participantes: Array.isArray(users) ? users : []
        })
    }
  
    handleUsers();
    handleUsersByProject();
  }, [])

  if (!isOpen) return null;

  return (
    <GenericModal
      handleClose={closeModal}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      textButton={"Editar projeto"}
      title={"Editar projeto"}
    >
      <InputField
        label={"Nome do projeto"}
        error={error.nome_projeto}
        name={"nome_projeto"}
        placeholder={"Informe o nome do projeto"}
        value={formData.nome_projeto}
        onChange={(e) => setFormData((prev) => ({ ...prev, nome_projeto: e.target.value}))}
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
            setSelectedParticipants(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
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
  );
}

export default ModalEditarProjeto;
