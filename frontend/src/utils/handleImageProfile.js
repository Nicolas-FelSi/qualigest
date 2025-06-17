import URL_BASE_IMAGE from "../api/urlBaseImage";

function handleImageProfile(imageProfile) {
    // 1. Verificamos se o usuário tem uma foto de perfil.
    const temFoto = imageProfile;

    // 2. Definimos a URL da imagem com base na condição.
    const imagemSrc = temFoto
        ? `${URL_BASE_IMAGE}/${imageProfile}` 
        : '/images/usuario.png'; 
        
    return imagemSrc;
}

export default handleImageProfile;