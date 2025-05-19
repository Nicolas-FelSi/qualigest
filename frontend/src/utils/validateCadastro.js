function validateCadastro(formData, confirmPassword) {
    const newErrors = {};

    if(formData.nome_completo == "") newErrors.nome = "O nome completo é obrigatório";
    else if(!/^[a-zA-ZÀ-ú\s]+$/u.test(formData.nome_completo)) newErrors.nome = "O nome completo deve conter apenas letras e espaços";

    if(formData.nome_usuario == "") newErrors.usuario = "O nome de usuário é obrigatório";
    else if(formData.nome_usuario.includes("@")) newErrors.usuario = ['O nome de usuário não pode conter "@"'];
    else if(!/^[a-zA-Z0-9._-]+$/.test(formData.nome_usuario)) newErrors.usuario = "O nome de usuário só pode conter letras, números, ponto, hífen e underline";

    if(formData.email == "") newErrors.email = "O email é obrigatório";

    if(formData.senha == "") newErrors.senha = "A senha é obrigatório";
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(formData.senha)) newErrors.senha = ['A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número'];

    if(confirmPassword == "") newErrors.confirmSenha = "A confirmação de senha é obrigatório";
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(confirmPassword)) newErrors.confirmSenha = ['A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, uma minúscula e um número'];
    else if(!(formData.senha == confirmPassword)) newErrors.confirmSenha = "Senhas diferentes";

    return newErrors;
}

export default validateCadastro;