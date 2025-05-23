function GenericModal({ isOpen, handleSubmit, title, handleClose, children, textButton }) {
  if (!isOpen) return null;

  return (
    <div
      className="inset-0 bg-black/75 fixed flex items-center justify-center"
    >
      <form
        className="bg-white p-5 rounded-lg w-lg mx-2"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-900 font-semibold">{ title }</h2>
          <button
            type="button"
            onClick={() => handleClose()}
            className="text-gray-500 hover:text-gray-700 text-2xl font-extrabold cursor-pointer"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>
        <hr className="mx-[-1.3rem] opacity-15 mt-4" />
        { children }
        <hr className="mx-[-1.3rem] mt-5 opacity-15" />
        <div>
          <button
            type="submit"
            className="bg-black w-full rounded-sm mt-4 p-2 text-white cursor-pointer hover:bg-black/85 transition-all"
          >
            { textButton }
          </button>
        </div>
      </form>
    </div>
  );
}

export default GenericModal;

