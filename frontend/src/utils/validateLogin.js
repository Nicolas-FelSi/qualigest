function validateLogin(formData) {
    const newErrors = {};

    if (formData.email == "") newErrors.email = "O email é obrigatório";
    if (formData.senha == "") newErrors.senha = "A senha é obrigatório";

    return newErrors;
}

export default validateLogin;