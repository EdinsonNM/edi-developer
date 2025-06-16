import { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import Highcharts from "highcharts"; // Tu importación principal
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/timeline"; // Simplemente importa el módulo para que se ejecute

import Particles from "@/components/ui/particles";
// import useCompletions from "@presentation/utils/hooks/useCompletions"; // Comentado si no se usa
import useCompletionsGemini from "@presentation/utils/hooks/useGeminiReceipt";
import useCompletions from "@presentation/utils/hooks/useCompletions";

export default function InfoSearch() {
  const {
    result: { mutate },
    messages,
  } = useCompletionsGemini();
  const [inputValue, setInputValue] = useState("");

  const [chartData, setChartData] = useState<{
    title: string;
    description: string;
    highchart: Highcharts.Options; // Asegúrate que Highcharts.Options sea el tipo correcto si usas el global
  } | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll al final cuando cambian los mensajes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]); // Asume que tienes un estado 'messages' que contiene los mensajes del chat

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    mutate(inputValue, {
      onSuccess: (data) => {
        // Asegúrate que 'data' y 'data.highchart' no sean null o undefined antes de usarlos
        // Tu tipo AssistantMessageStructure ya maneja los null para title, description, highchart
        setChartData({
          title: data?.title ?? "", // Usar ?? para manejar null y undefined
          description: data?.description ?? "",
          highchart: data?.highchart ?? {}, // Si highchart es null de la API, usa un objeto vacío o DEFAULT_HIGHCHART
        });
        console.log("Data recibida en onSuccess:", data);
      },
      // Considera añadir onError aquí también para manejar errores de la mutación
      onError: (error) => {
        console.error("Error en la mutación handleSend:", error);
        // Podrías establecer un estado de error o limpiar chartData
        setChartData({
          title: "Error al cargar datos",
          description:
            "Hubo un problema al obtener la información del gráfico.",
          highchart: {
            // Un gráfico vacío o un mensaje de error
            title: { text: "Error" },
            series: [{ type: "bar", data: [] }], // Asegúrate que 'type' esté en series para HighchartsReact
          },
        });
      },
    });

    setInputValue("");
  };

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1e6641 0%, #13232f 60%, #111926 100%)",
      }}
    >
      <div className="absolute w-full h-full left-0 top-0">
        <Particles />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mt-40">
        {/* ... Título y descripción ... */}
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
          Buscador de Información de Edinson
        </h1>
        <p className="text-lg text-gray-200/90 mb-2">
          Haz preguntas y explora visualizaciones interactivas sobre Edinson.
          Descubre datos y respuestas de forma visual y sencilla.
        </p>
      </div>
      <div className="flex flex-col md:flex-row h-full max-h-[calc(100vh-444px)] max-w-7xl mx-auto p-4 gap-6 bg-transparent mt-10">
        {/* Chat izquierdo */}
        <div className="flex flex-col bg-gray-800/60 backdrop-blur-md border border-gray-600/60 rounded-lg p-4 max-h-[90vh]  w-full md:max-w-[550px] md:w-[550px]">
          {/* ... Mapeo de mensajes ... */}
          <div className="flex flex-col gap-3 mb-4 overflow-y-auto h-full">
            {messages
              .filter((msg) => msg.role !== "system") // 'system' no es un rol en tu UIMessageType
              .map((msg, idx) => (
                <div
                  key={msg.id || idx} // Usa msg.id si lo tienes, sino el índice como fallback
                  className={`flex items-end mb-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role !== "user" && ( // Debería ser msg.role === "model"
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-700 text-white mr-2 font-bold text-lg">
                      <span role="img" aria-label="asistente">
                        🤖
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-[70%] whitespace-pre-wrap shadow-md ${
                      msg.role === "user"
                        ? "bg-sky-600/80 text-white rounded-br-none"
                        : "bg-gray-800 text-gray-100 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-600 text-white ml-2 font-bold text-lg">
                      <span role="img" aria-label="usuario">
                        🧑
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* ... Input y botón de enviar ... */}
          <div className="flex mt-auto gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 rounded-lg px-4 py-2 bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Escribe tu pregunta aquí..."
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white p-2 rounded-lg"
            >
              <BiSend size={20} />
            </button>
          </div>
        </div>

        {/* Espacio del gráfico */}
        <div className="flex-1 flex flex-col bg-transparent border border-gray-600 rounded-lg p-4 max-h-[90vh] overflow-y-auto">
          {chartData ? (
            <>
              <h3 className="text-lg font-semibold text-white">
                {chartData.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {chartData.description}
              </p>
              {/* Renderiza HighchartsReact solo si chartData.highchart es un objeto con contenido */}
              {chartData.highchart &&
                Object.keys(chartData.highchart).length > 0 && ( // Verifica que no sea un objeto vacío
                  <HighchartsReact
                    highcharts={Highcharts} // Pasa la instancia de Highcharts
                    options={chartData.highchart} // Pasa las opciones del gráfico
                    // constructorType={'chart'} // Opcional, por defecto es 'chart'
                  />
                )}
            </>
          ) : (
            <p className="text-gray-400">El gráfico aparecerá aquí...</p>
          )}
          <div ref={chatContainerRef}></div>
        </div>
      </div>
    </div>
  );
}
