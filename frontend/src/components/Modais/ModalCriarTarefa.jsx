import { useState } from "react";
import { toast } from "react-toastify";

function ModalCriarTarefa({ isOpen, closeModal }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data_inicio: "",
    data_limite: "",
    prioridade: "",
    id_projeto: "",
  });

  const resetForm = () => {
    setFormData({
      ...formData,
      titulo: "",
      descricao: "",
      data_limite: "",
      prioridade: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate(formData, formData.confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = await handleRegister({
      nome_completo: formData.nome_completo,
      nome_usuario: formData.nome_usuario,
      email: formData.email,
      senha: formData.senha,
    });

    if (data.status === "sucesso") {
      showToast(data.mensagem, "success");
      resetForm();
      closeModal();
    } else {
      showToast(data.mensagem || data.mensagens);
    }
  };

  const handleSwitchToLogin = () => {
    resetForm();
    closeModal();
    openModalLogin();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.nome_completo == "" ||
      formData.nome_usuario == "" ||
      formData.email == "" ||
      formData.senha == "" ||
      confirmPassword == ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!(formData.senha == confirmPassword)) {
      alert("Senhas diferentes!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost${
          port != 80 ? `:${port}` : ""
        }${urlBase}/cadastroUsuario.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status === "sucesso") {
        closeModal();
        setFormData({
          nome_completo: "",
          nome_usuario: "",
          email: "",
          senha: "",
        });

        const notify = () => toast.success(data.mensagem);
        notify();

        setConfirmPassword("");
      } else {
        if (data.mensagem) {
          const notify = () => toast.error(data.mensagem);
          notify();
        } else {
          const notify = () => {
            data.mensagens.forEach((mensagem) => {
              toast.error(mensagem);
            });
          };
          notify();
        }
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  if (isOpen) {
    return (
      <div
        className="inset-0 bg-black/75 fixed flex items-center justify-center"
        onClick={closeModal}
      >
        <form
          className="bg-white p-5 rounded-lg w-lg mx-2"
          noValidate
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl text-gray-900 font-semibold">Criar tarefa</h2>
          <hr className="mx-[-1.3rem] opacity-15 mt-4" />
          <div className="mt-2">
            <label
              htmlFor="tituloTarefaId"
              className="mb-2 text-sm font-medium"
            >
              Título da tarefa
            </label>
            <div className="flex">
              <input
                type="text"
                id="tituloTarefaId"
                className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                placeholder="Informe um título para a tarefa"
                name="titulo"
                value={formData.nome_completo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="descricaoTarefaId1"
              className="mb-2 text-sm font-medium"
            >
              Descrição da tarefa
            </label>
            <div className="flex">
              <textarea
                type="text"
                id="descricaoTarefaId1"
                className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                placeholder="Informe uma descrição para a tarefa"
                name="descricao"
                value={formData.nome_usuario}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="dataEntregaId" className="mb-2 text-sm font-medium">
              Data de entrega
            </label>
            <div className="flex">
              <input
                type="date"
                id="dataEntregaId"
                className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                name="data_entrega"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="prioridadeTarefaId"
              className="mb-2 text-sm font-medium"
            >
              Prioridade
            </label>
            <div className="flex">
              <select
                id="prioridadeTarefaId"
                className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                name="prioridade"
                value={formData.senha}
                onChange={handleChange}
              >
                <option className="text-body-tertiary" defaultValue={true}>
                  Selecione uma prioridade
                </option>
                <option value="Baixa">Baixa</option>
                <option value="Moderada">Moderada</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="responsavelTarefaId"
              className="mb-2 text-sm font-medium"
            >
              Responsável
            </label>
            <div className="flex">
              <select
                id="responsavelTarefaId"
                className="rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                name="responsavel"
                value={formData.senha}
                onChange={handleChange}
              >
                <option className="text-body-tertiary" defaultValue={true}>
                  Selecione um responsável
                </option>
              </select>
            </div>
          </div>
          <hr className="mx-[-1.3rem] mt-5 opacity-15" />
          <div>
            <button
              type="submit"
              className="bg-black w-full rounded-sm mt-4 p-2 text-white cursor-pointer hover:bg-black/85 transition-all"
            >
              Criar tarefa
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ModalCriarTarefa;
