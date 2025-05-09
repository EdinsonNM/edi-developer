import { useState } from "react";
import { BiSend } from "react-icons/bi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Particles from "@/components/ui/particles";
import useCompletions from "@presentation/utils/hooks/useCompletions";

export default function InfoSearch() {
  const { result, messages } = useCompletions();
  const [inputValue, setInputValue] = useState("");

  const [chartData, setChartData] = useState<{
    title: string;
    description: string;
    highchart: Highcharts.Options;
  } | null>(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Simulación de respuesta (reemplaza por fetch real a tu API con OpenAI)
    const mockResponse = {
      title: "Años de experiencia por tecnología",
      description:
        "Este gráfico muestra los años de experiencia que Edinson tiene trabajando con cada tecnología clave.",
      highchart: {
        chart: {
          type: "bar",
          backgroundColor: "transparent",
          marginTop: 60, // Espacio superior para evitar que tape el menú
        },
        title: {
          text: "Experiencia por Tecnología",
          style: { color: "#ffffff" },
        },
        xAxis: {
          categories: ["Angular", "React", "Node.js", "Flutter"],
          labels: { style: { color: "#ccc" } },
        },
        yAxis: {
          title: {
            text: "Años de experiencia",
            style: { color: "#ccc" },
          },
          labels: { style: { color: "#ccc" } },
        },
        legend: {
          itemStyle: { color: "#ccc" },
        },
        series: [
          {
            name: "Edinson Nuñez",
            data: [6, 5, 3, 2],
            color: "#10b981",
          },
        ],
      },
    };

    // Actualiza mensajes y datos
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputValue },
      {
        role: "assistant",
        content: `${mockResponse.title}\n${mockResponse.description}`,
      },
    ]);

    setChartData(mockResponse);
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
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
          Buscador de Información de Edinson
        </h1>
        <p className="text-lg text-gray-200/90 mb-2">
          Haz preguntas y explora visualizaciones interactivas sobre Edinson.
          Descubre datos y respuestas de forma visual y sencilla.
        </p>
      </div>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-444px)] max-w-7xl mx-auto p-4 gap-6 bg-transparent mt-10">
        {/* Chat izquierdo */}
        <div className="flex flex-col bg-gray-800/60 backdrop-blur-md border border-gray-600/60 rounded-lg p-4 max-h-[90vh] overflow-y-auto w-full md:max-w-[550px] md:w-[550px]">
          <div className="flex flex-col gap-3 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end mb-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role !== "user" && (
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
              <HighchartsReact
                highcharts={Highcharts}
                options={chartData.highchart}
              />
            </>
          ) : (
            <p className="text-gray-400">El gráfico aparecerá aquí...</p>
          )}
        </div>
      </div>
    </div>
  );
}
