import { useEffect, useState, useRef, useCallback } from "react";
import Aside from "../components/Aside";
import { useNavigate } from "react-router-dom";
import getProfile from "../api/profile/getProfile";
import editProfile from "../api/profile/editProfile";
import InputField from "../components/InputField";
import handleChange from "../utils/handleChange";
import showToast from "../utils/showToast";
import { MdStar, MdCheckBox, MdWarning, MdEdit } from "react-icons/md";
import handleImageProfile from "../utils/handleImageProfile";
import Header from "../components/Header";

// Função auxiliar para converter um arquivo para Base64 usando Promises
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Perfil() {
  console.log("%cRenderizando a página: PERFIL", "color: white; font-weight: bold;");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: "",
    nome_usuario: "",
    email: "",
    senha: "",
    foto_perfil: "",
    pontuacao: 0,
    tarefas_concluidas: 0,
    tarefas_em_atraso: 0,
  });

  const handleGetProfile = useCallback(async () => {
    const data = await getProfile();
    if (data) {
      setUser(data);
      setFormData({
        nome_completo: data.nome_completo || "",
        nome_usuario: data.nome_usuario || "",
        email: data.email || "",
        senha: "",
        foto_perfil: handleImageProfile(data.foto_perfil),
        pontuacao: data.pontuacao || 0,
        tarefas_concluidas: data.tarefas_concluidas || 0,
        tarefas_em_atraso: data.tarefas_em_atraso || 0,
      });
    }
  }, []);

  // Efeito para buscar os dados do perfil ao carregar a página
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(localStorage.getItem("user")))
    handleGetProfile();
  }, [navigate, handleGetProfile]);

  // Função para validar o formulário
  function validate() {
    // ... sua lógica de validação aqui ...
    const newErrors = {};
    if (!formData.nome_completo) newErrors.nome_completo = "O nome completo é obrigatório";
    if (!formData.nome_usuario) newErrors.nome_usuario = "O nome de usuário é obrigatório";
    if (!formData.email) newErrors.email = "O email é obrigatório";
    return newErrors;
  }

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const dadosParaApi = {
      nome_completo: formData.nome_completo,
      nome_usuario: formData.nome_usuario,
      email: formData.email,
    };

    if (formData.senha) {
      dadosParaApi.senha = formData.senha;
    }

    if (formData.foto_perfil instanceof File) {
      try {
        dadosParaApi.foto_perfil = await toBase64(formData.foto_perfil);
      } catch (error) {
        showToast("Erro ao processar a imagem.", "error");
        console.warn(error);
        return;
      }
    }

    const result = await editProfile(dadosParaApi);

    if (result.mensagem) {
      const updatedUserData = result.usuario;
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      setUser(updatedUserData); // Atualiza os dados originais

      setFormData(prev => ({
        ...prev,
        nome_completo: updatedUserData.nome_completo,
        nome_usuario: updatedUserData.nome_usuario,
        email: updatedUserData.email,
        foto_perfil: handleImageProfile(updatedUserData.foto_perfil),
        senha: ""
      }));

      setImagePreview(null);
      showToast(result.mensagem, "success");
      setIsEditing(false); // Desativa o modo de edição após salvar
    } else {
      showToast(result.erro);
    }
  };

  // Funções para o upload da imagem
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, foto_perfil: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancelEdit = () => {
    // Restaura os dados do formulário para os originais
    if (user) {
      setFormData({
        nome_completo: user.nome_completo || "",
        nome_usuario: user.nome_usuario || "",
        email: user.email || "",
        senha: "",
        foto_perfil: handleImageProfile(user.foto_perfil),
        pontuacao: user.pontuacao || 0,
        tarefas_concluidas: user.tarefas_concluidas || 0,
        tarefas_em_atraso: user.tarefas_em_atraso || 0,
      });
    }
    setImagePreview(null); // Limpa o preview da imagem
    setErrors({}); // Limpa os erros
    setIsEditing(false); // Sai do modo de edição
  };

  // Limpeza de memória para o preview
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  return (
    <div className="flex gap-2 lg:gap-4 h-screen">
      <Aside />
      <main className="flex-1 w-full lg:mr-4 mr-2 flex flex-col overflow-y-auto">
        <Header titleHeader={"Perfil"} user={user}/>
        <section className="bg-white flex justify-center rounded-lg items-center shadow-md">
          <form className="max-w-5xl w-full p-3 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="relative group w-52 h-52 rounded-full m-auto">
                <img
                  className="w-full h-full object-cover rounded-full"
                  // Ponto Chave 3: Priorizando o preview da nova imagem
                  src={imagePreview || formData.foto_perfil || "/images/usuario.png"}
                  alt="Foto de perfil do usuário"
                />
                {isEditing && (
                  <>
                    <div
                      className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={handleImageClick}
                    >
                      <MdEdit size={24} className="text-gray-700" />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/png, image/jpeg, image/gif"
                    />
                  </>
                )}
              </div>

              <div className="w-full">
                <InputField
                  disabled={!isEditing}
                  error={errors.nome_completo}
                  label={"Nome completo"}
                  name={"nome_completo"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"Informe seu nome completo"}
                  value={formData.nome_completo || ""}
                />
                <InputField
                  disabled={!isEditing}
                  error={errors.nome_usuario}
                  label={"Usuário"}
                  name={"nome_usuario"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"Informe seu nome de usuário"}
                  value={formData.nome_usuario || ""}
                />
                <InputField
                  disabled={!isEditing}
                  error={errors.email}
                  label={"E-mail"}
                  name={"email"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"Informe seu e-mail"}
                  value={formData.email || ""}
                  type="email"
                />
                <InputField
                  disabled={!isEditing}
                  error={errors.senha}
                  label={"Nova Senha (opcional)"}
                  name={"senha"}
                  onChange={(e) => handleChange(e, setFormData, formData)}
                  placeholder={"Deixe em branco para não alterar"}
                  value={formData.senha || ""}
                  type="password"
                />
              </div>
            </div>
            {/* Seus cards de pontuação ... */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="bg-blue-200 shadow-md border border-blue-300 p-4 rounded-lg font-semibold flex items-center flex-col w-full">
                <MdStar size={20}/>
                <p className="text-md">Pontuação total</p>
                <span className="text-2xl font-medium">{ formData.pontuacao }</span>
              </div>
              <div className="bg-green-200 shadow-md border border-green-300 p-4 rounded-lg font-semibold flex items-center flex-col w-full">
                <MdCheckBox size={20}/>
                <p className="text-md">Tarefas concluídas</p>
                <span className="text-2xl font-medium">{ formData.tarefas_concluidas }</span>
              </div>
              <div className="bg-red-200 shadow-md border border-red-300 p-4 rounded-lg font-semibold flex items-center flex-col w-full">
                <MdWarning size={20}/>
                <p className="text-md">Tarefas atrasadas</p>
                <span className="text-2xl font-medium">{ formData.tarefas_em_atraso}</span>
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 font-medium transition-all py-2 px-6"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-600 font-medium transition-all py-2 px-6"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-amber-500 text-white rounded-md cursor-pointer hover:bg-amber-600 font-medium transition-all py-2 px-6 flex items-center gap-2"
                >
                  <MdEdit /> Editar Perfil
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Perfil;