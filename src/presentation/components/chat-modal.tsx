import { useState, useRef, useEffect, Fragment } from "react";
import { BiSend, BiX } from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/timeline";

import useCompletionsGemini, {
  Role,
} from "@presentation/utils/hooks/useGeminiReceipt";
import { useI18n } from "@presentation/utils/use-i18n";

// Componente de animación de puntos de carga responsive
const TypingIndicator = ({ text }: { text: string }) => {
  return (
    <div
      className={`flex items-center space-x-1 p-3 sm:p-4 rounded-2xl rounded-tl-sm max-w-[85%] sm:max-w-[80%] bg-white/20 backdrop-blur-md text-gray-900 border border-white/30 shadow-lg`}
    >
      <div className="flex items-center justify-center">
        <span className="text-gray-700 mr-2 sm:mr-3 text-xs sm:text-sm">
          {text}
        </span>
        <div className="flex space-x-1 items-center">
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"
            style={{
              animationDelay: "0ms",
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          ></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"
            style={{
              animationDelay: "0.2s",
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          ></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"
            style={{
              animationDelay: "0.4s",
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function ChatModal({
  isOpen,
  onClose,
  initialQuery,
}: ChatModalProps) {
  const {
    result: { mutate, isPending },
    messages,
  } = useCompletionsGemini();
  const [inputValue, setInputValue] = useState("");
  const hasExecutedAutoSearch = useRef(false);
  const { t } = useI18n();

  // Almacenar datos de gráficos por ID de mensaje
  const [messageCharts, setMessageCharts] = useState<
    Record<
      string,
      {
        title: string;
        description: string;
        highchart: Highcharts.Options;
      }
    >
  >({});

  // Estado temporal para almacenar datos de gráfico pendientes de asociar
  const [pendingChartData, setPendingChartData] = useState<{
    title: string;
    description: string;
    highchart: Highcharts.Options;
  } | null>(null);

  // Efecto para asociar datos pendientes con nuevos mensajes del asistente
  useEffect(() => {
    if (pendingChartData && messages.length > 0) {
      const lastAssistantMessage = messages
        .filter((msg) => msg.role !== "system" && msg.role !== "user")
        .slice(-1)[0];

      if (lastAssistantMessage) {
        const messageId = lastAssistantMessage.id || `msg-${Date.now()}`;

        // Verificar si este mensaje ya tiene un gráfico asociado
        if (!messageCharts[messageId]) {
          setMessageCharts((prev) => ({
            ...prev,
            [messageId]: pendingChartData,
          }));
          setPendingChartData(null); // Limpiar datos pendientes
        }
      }
    }
  }, [messages, pendingChartData, messageCharts]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll al final cuando cambian los mensajes o el estado de pending
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        const element = chatContainerRef.current;
        setTimeout(() => {
          element.scrollTo({
            top: element.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    };

    scrollToBottom();
  }, [messages, isPending]);

  // Efecto para hacer scroll al final cuando se abre el modal con conversaciones existentes
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Pequeño delay para asegurar que el modal esté completamente renderizado
      const scrollToBottom = () => {
        if (chatContainerRef.current) {
          const element = chatContainerRef.current;
          setTimeout(() => {
            element.scrollTo({
              top: element.scrollHeight,
              behavior: "smooth",
            });
          }, 300); // Delay más largo para asegurar que las animaciones del modal terminen
        }
      };

      scrollToBottom();
    }
  }, [isOpen]); // Solo se ejecuta cuando cambia isOpen

  // Efecto para búsqueda automática con initialQuery
  useEffect(() => {
    if (
      initialQuery &&
      initialQuery.trim() &&
      !hasExecutedAutoSearch.current &&
      isOpen
    ) {
      console.log(
        "✅ Ejecutando búsqueda automática con initialQuery:",
        initialQuery
      );
      setInputValue(initialQuery);
      hasExecutedAutoSearch.current = true;

      setTimeout(() => {
        mutate(initialQuery, {
          onSuccess: (data) => {
            console.log("Data recibida en búsqueda automática:", data);
            setInputValue("");
            if (data) {
              setPendingChartData({
                title: data?.title ?? "",
                description: data?.description ?? "",
                highchart: data?.highchart ?? {},
              });
            }
          },
          onError: (error) => {
            console.error("Error en búsqueda automática:", error);
            setInputValue("");
            // No establecer pendingChartData para errores, dejar que el hook maneje el mensaje amigable
          },
        });
      }, 100);
    }
  }, [initialQuery, isOpen, mutate, t]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    mutate(inputValue, {
      onSuccess: (data) => {
        console.log("Data recibida en onSuccess:", data);
        if (data) {
          setPendingChartData({
            title: data?.title ?? "",
            description: data?.description ?? "",
            highchart: data?.highchart ?? {},
          });
        }
      },
      onError: (error) => {
        console.error("Error en la mutación handleSend:", error);
        // No establecer pendingChartData para errores, dejar que el hook maneje el mensaje amigable
      },
    });

    setInputValue("");
  };

  // Reset cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      hasExecutedAutoSearch.current = false;
      setInputValue("");
    }
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="fixed inset-0 w-full h-full max-w-none max-h-none sm:static sm:mx-auto sm:my-8 sm:max-w-4xl sm:w-full sm:h-[80vh] sm:max-h-[90vh] transition-all">
                <div className="flex flex-col h-full w-full sm:h-[80vh] sm:max-w-4xl sm:mx-auto sm:my-8">
                  {/* Card wrapper: one rounded window */}
                  <div className="flex flex-col h-full w-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg overflow-hidden">
                    {/* Header fijo para mobile y desktop */}
                    <div className="sticky top-0 z-20 bg-white/20 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-white/30">
                      <span className="text-gray-900 font-semibold text-lg drop-shadow-sm">
                        {t.saludoAsistente}
                      </span>
                      <button
                        type="button"
                        className="rounded-md p-2 text-gray-700 hover:text-gray-900 bg-white/20 hover:bg-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                        onClick={onClose}
                      >
                        <span className="sr-only">{t.cerrarMenu}</span>
                        <BiX className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Chat Content */}
                    <div className="flex flex-col h-full w-full max-w-7xl mx-auto p-0 sm:p-0 bg-transparent pt-0">
                      {/* Messages */}
                      <div
                        ref={chatContainerRef}
                        className="flex flex-col gap-3 mb-2 overflow-y-auto flex-1 scroll-smooth px-2 sm:px-4 py-2 pt-[72px] sm:pt-[72px] pb-[60px] sm:pb-2"
                      >
                        {/* Mensaje de saludo inicial */}
                        <div className="flex items-start mb-4 justify-start">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-2 sm:mr-3 font-bold text-sm sm:text-lg flex-shrink-0 shadow-lg">
                            <span role="img" aria-label="asistente">
                              🤖
                            </span>
                          </div>
                          <div className="relative">
                            {/* Burbuja principal */}
                            <div className="bg-white/20 backdrop-blur-md rounded-2xl rounded-tl-sm p-3 sm:p-4 max-w-[85%] sm:max-w-[80%] shadow-lg border border-white/30">
                              <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                                {t.saludoAsistente}
                              </h2>
                              <p className="text-gray-700 mb-3 text-sm sm:text-base">
                                {t.descripcionAsistente}
                              </p>
                            </div>
                            {/* Burbuja de ejemplos */}
                            <div className="mt-2 bg-white/15 backdrop-blur-sm rounded-xl rounded-tl-sm p-3 sm:p-4 max-w-[85%] sm:max-w-[80%] shadow-md border border-white/25">
                              <div className="flex items-center mb-2">
                                <span className="text-yellow-500 mr-2">💡</span>
                                <p className="font-medium text-gray-800 text-sm">
                                  {t.ejemplosPreguntas}
                                </p>
                              </div>
                              <ul className="space-y-1 text-xs text-gray-700">
                                <li>• {t.ejemploTimeline}</li>
                                <li>• {t.ejemploHabilidades}</li>
                                <li>• {t.ejemploProyectos}</li>
                                <li>• {t.ejemploExperiencia}</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Messages from conversation */}
                        {messages
                          .filter((msg) => msg.role !== Role.SYSTEM)
                          .map((msg, idx) => (
                            <div key={msg.id || idx}>
                              <div
                                className={`flex items-end mb-2 ${
                                  msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                {msg.role !== "user" && (
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-2 sm:mr-3 font-bold text-sm sm:text-lg flex-shrink-0 shadow-lg">
                                    <span role="img" aria-label="asistente">
                                      🤖
                                    </span>
                                  </div>
                                )}
                                <div
                                  className={`relative text-left p-3 sm:p-4 whitespace-pre-wrap text-sm sm:text-base shadow-lg border ${
                                    msg.role === "user"
                                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400 rounded-2xl rounded-tr-sm max-w-[85%] sm:max-w-[80%] ml-auto"
                                      : "bg-white/20 backdrop-blur-md text-gray-900 border-white/30 rounded-2xl rounded-tl-sm max-w-[85%] sm:max-w-[80%]"
                                  }`}
                                >
                                  {msg.content}
                                </div>
                                {msg.role === "user" && (
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-600 text-white ml-2 sm:ml-3 font-bold text-sm sm:text-lg flex-shrink-0 shadow-lg">
                                    <span role="img" aria-label="usuario">
                                      🧑
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Gráfico dentro del chat */}
                              {(() => {
                                const messageId = msg.id || `msg-${idx}`;
                                const messageChart = messageCharts[messageId];

                                const hasValidChart =
                                  messageChart &&
                                  messageChart.highchart &&
                                  Object.keys(messageChart.highchart).length >
                                    0 &&
                                  messageChart.highchart.series &&
                                  Array.isArray(
                                    messageChart.highchart.series
                                  ) &&
                                  messageChart.highchart.series.length > 0;

                                return (
                                  msg.role !== "user" &&
                                  hasValidChart && (
                                    <div className="ml-12 sm:ml-14 mr-2 sm:mr-4 mb-4 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl rounded-tl-sm p-3 sm:p-4 shadow-md">
                                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                                        {messageChart.title}
                                      </h3>
                                      <p className="text-xs sm:text-sm text-gray-700 mb-4">
                                        {messageChart.description}
                                      </p>
                                      <div
                                        className={`w-full ${
                                          messageChart.highchart.chart?.type ===
                                          "timeline"
                                            ? "overflow-x-auto overflow-y-hidden min-h-[300px] sm:min-h-[400px]"
                                            : "overflow-hidden"
                                        }`}
                                      >
                                        <HighchartsReact
                                          key={`chart-${messageId}-${
                                            messageChart.highchart.chart
                                              ?.type || "default"
                                          }`}
                                          highcharts={Highcharts}
                                          options={(() => {
                                            const isTimeline =
                                              messageChart.highchart.chart
                                                ?.type === "timeline";

                                            if (isTimeline) {
                                              const timelineOptions = {
                                                ...messageChart.highchart,
                                                chart: {
                                                  ...messageChart.highchart
                                                    .chart,
                                                  height: 450,
                                                  scrollablePlotArea: {
                                                    minWidth: Math.max(
                                                      1200,
                                                      Array.isArray(
                                                        messageChart.highchart
                                                          .series
                                                      ) &&
                                                        messageChart.highchart
                                                          .series[0] &&
                                                        "data" in
                                                          messageChart.highchart
                                                            .series[0] &&
                                                        Array.isArray(
                                                          (
                                                            messageChart
                                                              .highchart
                                                              .series[0] as any
                                                          ).data
                                                        )
                                                        ? ((
                                                            messageChart
                                                              .highchart
                                                              .series[0] as any
                                                          ).data.length || 5) *
                                                            200
                                                        : 5 * 200
                                                    ),
                                                    scrollPositionX: 1,
                                                  },
                                                  marginLeft: 20,
                                                  marginRight: 20,
                                                },
                                                plotOptions: {
                                                  ...(messageChart.highchart
                                                    .plotOptions || {}),
                                                  timeline: {
                                                    ...(messageChart.highchart
                                                      .plotOptions?.timeline ||
                                                      {}),
                                                    dataLabels: {
                                                      enabled: true,
                                                      allowOverlap: false,
                                                      style: {
                                                        fontSize: "11px",
                                                        textOutline: "none",
                                                        fontWeight: "normal",
                                                      },
                                                      distance: 25,
                                                    },
                                                  },
                                                },
                                              };
                                              return timelineOptions;
                                            } else {
                                              const originalOptions =
                                                messageChart.highchart;
                                              const chartType =
                                                originalOptions.chart?.type ||
                                                "bar";

                                              const safeOptions = {
                                                chart: {
                                                  type: chartType,
                                                  backgroundColor:
                                                    "transparent",
                                                  marginTop: 60,
                                                },
                                                title:
                                                  originalOptions.title || {
                                                    text: "",
                                                  },
                                                xAxis:
                                                  originalOptions.xAxis || {},
                                                yAxis:
                                                  originalOptions.yAxis || {},
                                                legend:
                                                  originalOptions.legend || {},
                                                series:
                                                  originalOptions.series || [],
                                                plotOptions: {
                                                  ...(originalOptions.plotOptions ||
                                                    {}),
                                                  [chartType as keyof Highcharts.PlotOptions]:
                                                    {
                                                      ...((originalOptions
                                                        .plotOptions?.[
                                                        chartType as keyof Highcharts.PlotOptions
                                                      ] ??
                                                        {}) as Highcharts.Options),
                                                    },
                                                },
                                              };

                                              return safeOptions;
                                            }
                                          })()}
                                        />
                                        {messageChart.highchart.chart?.type ===
                                          "timeline" && (
                                          <div className="mt-2 text-xs text-gray-400 flex items-center gap-4">
                                            <span>{t.scrollHorizontal}</span>
                                            <span>{t.ctrlZoom}</span>
                                            <span>{t.hoverDetalles}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                );
                              })()}
                            </div>
                          ))}

                        {/* Typing indicator */}
                        {isPending && (
                          <div className="flex items-start mb-4 justify-start">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-2 sm:mr-3 font-bold text-sm sm:text-lg flex-shrink-0 shadow-lg">
                              <span role="img" aria-label="asistente">
                                🤖
                              </span>
                            </div>
                            <TypingIndicator text={t.escribiendo} />
                          </div>
                        )}
                      </div>

                      {/* Input */}
                      <div className="flex mt-auto gap-3 sm:gap-4 bg-white/15 backdrop-blur-lg p-4 sm:p-5 sticky bottom-0 z-10 border-t border-white/20">
                        <input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSend()}
                          className="flex-1 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 bg-white/25 backdrop-blur-sm border border-white/35 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/35 transition-all duration-200 text-sm sm:text-base shadow-lg"
                          placeholder={t.escribeTuPregunta}
                        />
                        <button
                          onClick={handleSend}
                          className="bg-gradient-to-br from-blue-500 to-blue-600 backdrop-blur-sm text-white p-3 sm:p-4 rounded-2xl flex-shrink-0 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <BiSend size={18} className="sm:hidden" />
                          <BiSend size={22} className="hidden sm:block" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
