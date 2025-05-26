import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import { useNavigate } from "react-router-dom";
import getProfile from "../api/profile/getProfile"
import InputField from "../components/InputField";
import handleChange from "../utils/handleChange";
import showToast from "../utils/showToast";
import editProfile from "../api/profile/editProfile"

function Perfil() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    email: "",
    senha: "",
    foto: "",
    pontuacao: 0,
    tarefas_concluidas: 0,
    tarefas_em_atraso: 0
  });

  function validate() {
    const newErrors = {};

    if(formData.nome_completo == "") newErrors.nome = "O nome completo é obrigatório";
    else if(!/^[a-zA-ZÀ-ú\s]+$/u.test(formData.nome_completo)) newErrors.nome = "O nome completo deve conter apenas letras e espaços";

    if(formData.nome_usuario == "") newErrors.usuario = "O nome de usuário é obrigatório";
    else if(formData.nome_usuario.includes("@")) newErrors.usuario = ['O nome de usuário não pode conter "@"'];
    else if(!/^[a-zA-Z0-9._-]+$/.test(formData.nome_usuario)) newErrors.usuario = "O nome de usuário só pode conter letras, números, ponto, hífen e underline";

    if(formData.email == "") newErrors.email = "O email é obrigatório";

    // if(formData.senha == "") newErrors.senha = "A senha é obrigatório";
    // else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(formData.senha)) newErrors.senha = ['A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número'];

    return newErrors;
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const data = await editProfile({
        nome_completo:  formData.nome_completo,
        nome_usuario: formData.nome_usuario,
        email:  formData.email,
        foto: formData.foto,
        senha: formData.senha
      });

      if (data.mensagem) {
        showToast(data.mensagem, "success");
      } else {
        showToast(data.erro);
      }
    };

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const handleGetProfile = async () => {
      const data = await getProfile();
      setFormData(data);
    }
    handleGetProfile();
  }, [])

  return (
    <div className="flex gap-1 lg:gap-3">
      <Aside />
      <main className="h-screen w-full">
        <div className="p-3 bg-white shadow-md mb-1 lg:mb-3">
          <h2 className="text-2xl">Perfil</h2>
        </div>
        <section className="bg-white flex justify-center items-center shadow-md">
          <form className="max-w-5xl w-full p-3 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5">
              <img
                className="w-52 h-52 object-cover rounded-full m-auto border border-gray-500"
                src="/images/pessoa1.jpg"
                alt=""
              />
              <div className="w-full">
                <InputField
                  error={errors.nome_completo}
                  label={"Nome completo"}
                  name={"nome_completo"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"Informe seu nome completo"}
                  value={formData.nome_completo}
                />
                <InputField
                  error={errors.nome_usuario}
                  label={"Usuário"}
                  name={"nome_usuario"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"Informe seu nome de usuário"}
                  value={formData.nome_usuario}
                />
                <InputField
                  error={errors.email}
                  label={"E-mail"}
                  name={"email"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"Informe seu e-mail"}
                  value={formData.email}
                  type="email"
                />
                <InputField
                  error={errors.senha}
                  label={"Senha"}
                  name={"senha"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"********"}
                  value={formData.senha}
                  type="password"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full">
                <p className="text-md">Pontuação total</p>
                <span className="text-lg font-normal">{ formData.pontuacao }</span>
              </div>
              <div className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full">
                <p className="text-md">Tarefas concluídas</p>
                <span className="text-lg font-normal">{ formData.tarefas_concluidas }</span>
              </div>
              <div className="bg-blue-200 border border-blue-300 p-4 rounded-2xl font-semibold flex items-center flex-col w-full">
                <p className="text-md">Tarefas atrasadas</p>
                <span className="text-lg font-normal">{ formData.tarefas_em_atraso}</span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-black text-white rounded-md cursor-pointer hover:bg-black/80 transition-all w-full p-2"
              >
                Editar perfil
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Perfil;
