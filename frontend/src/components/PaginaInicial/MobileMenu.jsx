import { MdMenu } from "react-icons/md";

function MobileMenu({ isOpen, onToggle, onOpenLogin, onOpenCadastro }) {
  return (
    <button
      className="sm:hidden relative"
      onClick={onToggle}
      aria-label="Abrir menu de navegação"
    >
      <MdMenu className="text-4xl text-amber-600" />
      {isOpen && (
        <div className="absolute right-0 top-full bg-gray-100 shadow-lg rounded-lg z-10">
          <p
            className="py-3 px-8 hover:bg-gray-500 hover:text-white rounded-t-lg transition-all"
            onClick={onOpenLogin}
          >
            Entrar
          </p>
          <hr className="border-gray-200" />
          <p
            className="py-3 px-8 hover:bg-gray-500 hover:text-white rounded-b-lg transition-all"
            onClick={onOpenCadastro}
          >
            Cadastrar
          </p>
        </div>
      )}
    </button>
  );
}

export default MobileMenu;