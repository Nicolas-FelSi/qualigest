import handleImageProfile from "../utils/handleImageProfile"; 

function Header({ titleHeader, user }) {

    // Se o usuário ainda não foi carregado, exibe um placeholder ou nada
    if (!user) {
        return (
            <div className="p-3 bg-white shadow-sm rounded-lg mb-2 lg:mb-4">
                <h2 className="text-2xl font-medium uppercase">{titleHeader}</h2>
            </div>
        );
    }
    
    // Constrói o caminho da imagem usando a função utilitária
    const imagemSrc = handleImageProfile(user.fotoPerfil);

    return (
        <div className="p-3 bg-white shadow-sm rounded-lg mb-2 lg:mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-medium uppercase">{titleHeader}</h2>
            
            <div className="flex items-center gap-3">
                <img 
                    src={imagemSrc} 
                    alt={`Foto de perfil de ${user.nomeCompleto}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                    <p className="font-semibold text-gray-800 leading-tight">{user.nomeCompleto}</p>
                    <p className="text-sm text-gray-500 leading-tight">@{user.nomeUsuario}</p>
                </div>
            </div>
        </div>
    )
}

export default Header;