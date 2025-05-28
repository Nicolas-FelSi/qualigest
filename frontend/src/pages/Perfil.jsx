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
    <div className="flex gap-2 lg:gap-4">
      <Aside />
      <main className="h-screen w-full lg:mr-4 mr-2">
        <div className="p-3 bg-white shadow-sm rounded-lg mb-2 lg:mb-4">
          <h2 className="text-2xl font-medium uppercase">Perfil</h2>
        </div>
        <section className="bg-white flex justify-center rounded-lg items-center shadow-md">
          <form className="max-w-5xl w-full p-3 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="relative group w-52 h-52 rounded-full m-auto">
                <img
                  className="w-full h-full object-cover rounded-full" src="/images/pessoa1.jpg"
                  alt="Foto de perfil do usuário"
                />
                <div
                  className="absolute inset-0 w-full h-full rounded-full bg-gray-800 bg-opacity-60
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        cursor-pointer"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
              </div>
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
              <div className="bg-blue-200 shadow-md border border-blue-300 p-4 rounded-4xl font-semibold flex items-center flex-col w-full">
                ⭐️
                <p className="text-md">Pontuação total</p>
                <span className="text-2xl font-medium">{ formData.pontuacao }</span>
              </div>
              <div className="bg-green-200 shadow-md border border-green-300 p-4 rounded-4xl font-semibold flex items-center flex-col w-full">
                ✅
                <p className="text-md">Tarefas concluídas</p>
                <span className="text-2xl font-medium">{ formData.tarefas_concluidas }</span>
              </div>
              <div className="bg-red-200 shadow-md border border-red-300 p-4 rounded-4xl font-semibold flex items-center flex-col w-full">
                ⚠️
                <p className="text-md">Tarefas atrasadas</p>
                <span className="text-2xl font-medium">{ formData.tarefas_em_atraso}</span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-orange-400 text-gray-900 rounded-md cursor-pointer hover:bg-amber-600 font-medium transition-all py-2 px-4"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Perfil;
