function TarefaCard({ task }) {
  return (
    <div className="w-full bg-white border-gray-400 border p-3 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer">
      <div className="flex justify-between">
        <h3 className="text-lg mr-1 font-medium mb-2">
          { task.titulo }
        </h3>
        <p>Pontos: { task.pontuacao_tarefa }</p>
      </div>
      <p className="text-sm md:text-lg">
       { task.descricao }
      </p>
      <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium">
        { task.status }
      </p>
      <p className="bg-red-700 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium ml-2">
        { task.prioridade }
      </p>
      <p>Criada em: { task.data_inicio }</p>
      <p>Entrega em: { task.data_limite }</p>
      <div className="flex mt-2">
        <img
          className="w-7 h-7 object-cover rounded-full border border-gray-600"
          src="/images/pessoa1.jpg"
          alt=""
        />
        <img
          className="w-7 h-7 object-cover rounded-full border border-gray-600"
          src="/images/pessoa2.jpg"
          alt=""
        />
        <img
          className="w-7 h-7 object-cover rounded-full border border-gray-600"
          src="/images/pessoa3.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default TarefaCard;