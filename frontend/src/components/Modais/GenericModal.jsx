function GenericModal({ isOpen, handleSubmit, title, handleClose, children, textButton }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    e.stopPropagation(); // Impede propagação do clique para elementos fora do modal
  };

  return (
    <div
      className="inset-0 bg-black/75 fixed flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <form
        className="bg-white p-5 rounded-lg w-full max-w-lg mx-2 max-h-[98vh] overflow-y-auto"
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900 font-semibold">{title}</h2>
          <button
            type="button"
            onClick={() => {
              if (handleClose) {
                handleClose();
              }
            }}
            className="text-gray-500 hover:text-gray-700 text-2xl font-extrabold cursor-pointer"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        <hr className="mx-[-1.3rem] opacity-15 mt-4" />
        {children}
        { textButton && (
          <div>
            <hr className="mx-[-1.3rem] mt-5 opacity-15" />
            <button
              type="submit"
              className="bg-amber-600 w-full rounded-sm mt-4 p-2 text-gray-900 cursor-pointer hover:bg-amber-700 font-medium transition-all"
            >
              {textButton}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default GenericModal;