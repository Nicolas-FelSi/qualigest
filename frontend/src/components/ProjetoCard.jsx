function ProjetoCard({ project }) {
  return (
    <div className="bg-white shadow-sm">
      <h2 className="border-b border-gray-300 p-2 text-2xl text-amber-600">
        { project.nome_projeto }
      </h2>
      <div className="py-2 px-5 text-center flex flex-col">
        <p className="bg-gray-500 py-0.5 px-3 rounded-md text-white">
          5 tarefas designadas para você
        </p>
        <p className="bg-amber-300 text-sm mt-2 py-0.5 px-3 rounded-md">
          1 tarefa está atrasada
        </p>
        <ul className="flex justify-end mt-4">
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa1.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa2.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa3.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa4.jpg"
              alt=""
            />
          </li>
          <li>
            <img
              className="w-8 h-8 rounded-lg object-cover border border-gray-400"
              src="/images/pessoa5.jpg"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className="flex gap-5 border-t border-gray-300 p-2">
        <button className="bg-amber-300 rounded-sm hover:bg-amber-500 cursor-pointer transition-all font-semibold p-2 w-full">
          Editar
        </button>
        <button className="bg-red-500 rounded-sm hover:bg-red-700 cursor-pointer transition-all font-semibold p-2 w-full">
          Deletar
        </button>
      </div>
    </div>
  );
}

export default ProjetoCard;
