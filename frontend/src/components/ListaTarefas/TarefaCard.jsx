import { format, parseISO } from "date-fns";

function TarefaCard({ task }) {
  return (
    <div className="w-full bg-white border-gray-400 border p-4 rounded-md shadow-md hover:scale-[1.02] transition-all cursor-pointer">
      <div className="flex justify-between">
        <h3 className="text-lg mr-1 font-medium mb-2">{task.titulo}</h3>
        <p>Pontos: {task.pontuacao_Tarefa}</p>
      </div>
      <p className="text-sm md:text-lg">{task.descricao}</p>
      <p className="bg-gray-500 text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium">
        {task.status}
      </p>
      <p
        className={`${
          task.prioridade == "baixa"
            ? "bg-slate-400"
            : task.prioridade == "moderada"
            ? "bg-yellow-400"
            : task.prioridade == "alta"
            ? "bg-red-400"
            : "bg-red-700"
        } text-white rounded-md py-0 px-3 inline-block my-3 text-sm font-medium ml-2`}
      >
        {task.prioridade}
      </p>
      <p>Inicia em: {format(parseISO(task.data_inicio.replace(" ", "T")), "dd/MM/yyyy HH:mm")}</p>
      <p>Termina em: {format(parseISO(task.data_limite.replace(" ", "T")), "dd/MM/yyyy HH:mm")}</p>
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
