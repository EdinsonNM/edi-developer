import { useState, useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/timeline";

import useCompletionsGemini, {
  Role,
} from "@presentation/utils/hooks/useGeminiReceipt";
import { useI18n } from "@presentation/utils/use-i18n";

// Componente de animación de puntos de carga
const TypingIndicator = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center space-x-1 p-2 sm:p-3 rounded-lg rounded-tl-sm max-w-[85%] bg-gray-800/50 border border-gray-700/50 font-mono">
      <div className="flex items-center justify-center">
        <span className="text-gray-400 mr-2 text-xs sm:text-sm">{text}</span>
        <div className="flex space-x-1 items-center">
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce"
            style={{
              animationDelay: "0ms",
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          ></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce"
            style={{
              animationDelay: "0.2s",
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          ></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-bounce"
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

export function AboutChatPanel() {
  const {
    result: { mutate, isPending },
    messages,
  } = useCompletionsGemini();
  const [inputValue, setInputValue] = useState("");
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
        .filter((msg) => msg.role !== Role.SYSTEM && msg.role !== Role.USER)
        .slice(-1)[0];

      if (lastAssistantMessage) {
        const messageId = lastAssistantMessage.id || `msg-${Date.now()}`;

        // Verificar si este mensaje ya tiene un gráfico asociado
        if (!messageCharts[messageId]) {
          setMessageCharts((prev) => ({
            ...prev,
            [messageId]: pendingChartData,
          }));
          setPendingChartData(null);
        }
      }
    }
  }, [messages, pendingChartData, messageCharts]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll al final cuando cambian los mensajes
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

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    mutate(inputValue, {
      onSuccess: (data) => {
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
      },
    });

    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border border-gray-800 rounded-lg overflow-hidden font-mono shadow-2xl">
      {/* Header estilo macOS */}
      <div className="bg-[#2d2d2d] px-3 py-2 border-b border-gray-700/50 rounded-t-lg">
        <div className="flex items-center gap-2 mb-2">
          {/* Botones de colores macOS */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#34c759] transition-colors cursor-pointer"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1">
          <div className="w-5 h-5 flex items-center justify-center rounded text-green-500 text-xs font-bold">
            <span>▸</span>
          </div>
          <span className="text-gray-300 font-medium text-xs uppercase tracking-wider">
            {t.chatWithEdinson}
          </span>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex flex-col flex-1 min-h-0 bg-[#1e1e1e] rounded-b-lg">
        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex flex-col gap-3 overflow-y-auto flex-1 scroll-smooth px-4 py-4 bg-[#1e1e1e]"
        >
          {/* Mensaje de saludo inicial */}
          {messages.length === 0 && (
            <div className="flex items-start justify-start">
              <span className="text-gray-600 text-xs mr-3 font-mono">1</span>
              <div className="flex-1">
                <div className="bg-[#252526] rounded border border-gray-700/30 p-3">
                  <p className="text-gray-300 text-sm font-mono leading-relaxed">
                    <span className="text-gray-500">// </span>
                    <span className="text-gray-400">
                      {t.descripcionAsistente}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Messages from conversation */}
          {messages
            .filter((msg) => msg.role !== Role.SYSTEM)
            .map((msg, idx) => {
              const lineNumber = idx + 2;
              const messageId = msg.id || `msg-${idx}`;
              const messageChart = messageCharts[messageId];

              const hasValidChart =
                messageChart &&
                messageChart.highchart &&
                Object.keys(messageChart.highchart).length > 0 &&
                messageChart.highchart.series &&
                Array.isArray(messageChart.highchart.series) &&
                messageChart.highchart.series.length > 0;

              return (
                <div key={msg.id || idx}>
                  <div className="flex items-start">
                    <span className="text-gray-600 text-xs mr-3 font-mono select-none">
                      {lineNumber}
                    </span>
                    <div className="flex-1">
                      <div
                        className={`relative text-left p-3 whitespace-pre-wrap text-sm font-mono leading-relaxed border rounded-lg ${
                          msg.role === Role.USER
                            ? "bg-[#0d1117] text-gray-200 border-gray-700/50"
                            : "bg-[#252526] text-gray-300 border-gray-700/30"
                        }`}
                      >
                        {msg.role === Role.USER ? (
                          <span>
                            <span className="text-gray-500">const </span>
                            <span className="text-blue-400">question</span>
                            <span className="text-gray-500"> = </span>
                            <span className="text-green-400">
                              "{msg.content}"
                            </span>
                            <span className="text-gray-500">;</span>
                          </span>
                        ) : (
                          <span>
                            <span className="text-gray-500">// </span>
                            <span className="text-gray-300">{msg.content}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico dentro del chat */}
                  {msg.role !== Role.USER && hasValidChart && (
                    <div className="ml-10 mr-2 mb-3 bg-[#252526] border border-gray-700/30 rounded-lg p-3">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1 font-mono">
                        <span className="text-gray-500">// </span>
                        {messageChart.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2 font-mono">
                        {messageChart.description}
                      </p>
                      <div
                        className={`w-full ${
                          messageChart.highchart.chart?.type === "timeline"
                            ? "overflow-x-auto overflow-y-hidden min-h-[250px]"
                            : "overflow-hidden"
                        }`}
                      >
                        <HighchartsReact
                          key={`chart-${messageId}-${
                            messageChart.highchart.chart?.type || "default"
                          }`}
                          highcharts={Highcharts}
                          options={(() => {
                            const isTimeline =
                              messageChart.highchart.chart?.type === "timeline";

                            if (isTimeline) {
                              const timelineOptions = {
                                ...messageChart.highchart,
                                chart: {
                                  ...messageChart.highchart.chart,
                                  height: 350,
                                  scrollablePlotArea: {
                                    minWidth: Math.max(
                                      1000,
                                      Array.isArray(
                                        messageChart.highchart.series
                                      ) &&
                                        messageChart.highchart.series[0] &&
                                        "data" in
                                          messageChart.highchart.series[0] &&
                                        Array.isArray(
                                          (
                                            messageChart.highchart
                                              .series[0] as any
                                          ).data
                                        )
                                        ? ((
                                            messageChart.highchart
                                              .series[0] as any
                                          ).data.length || 5) * 180
                                        : 5 * 180
                                    ),
                                    scrollPositionX: 1,
                                  },
                                  marginLeft: 20,
                                  marginRight: 20,
                                },
                                plotOptions: {
                                  ...(messageChart.highchart.plotOptions || {}),
                                  timeline: {
                                    ...(messageChart.highchart.plotOptions
                                      ?.timeline || {}),
                                    dataLabels: {
                                      enabled: true,
                                      allowOverlap: false,
                                      style: {
                                        fontSize: "10px",
                                        textOutline: "none",
                                        fontWeight: "normal",
                                      },
                                      distance: 20,
                                    },
                                  },
                                },
                              };
                              return timelineOptions;
                            } else {
                              const originalOptions = messageChart.highchart;
                              const chartType =
                                originalOptions.chart?.type || "bar";

                              const safeOptions = {
                                chart: {
                                  type: chartType,
                                  backgroundColor: "transparent",
                                  marginTop: 40,
                                  height: 250,
                                },
                                title: originalOptions.title || {
                                  text: "",
                                },
                                xAxis: originalOptions.xAxis || {},
                                yAxis: originalOptions.yAxis || {},
                                legend: originalOptions.legend || {},
                                series: originalOptions.series || [],
                                plotOptions: {
                                  ...(originalOptions.plotOptions || {}),
                                  [chartType as keyof Highcharts.PlotOptions]: {
                                    ...((originalOptions.plotOptions?.[
                                      chartType as keyof Highcharts.PlotOptions
                                    ] ?? {}) as Highcharts.Options),
                                  },
                                },
                              };

                              return safeOptions;
                            }
                          })()}
                        />
                        {messageChart.highchart.chart?.type === "timeline" && (
                          <div className="mt-2 text-xs text-gray-500 flex items-center gap-3 flex-wrap font-mono">
                            <span className="text-gray-600">
                              // {t.scrollHorizontal}
                            </span>
                            <span className="text-gray-600">
                              // {t.ctrlZoom}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Typing indicator */}
          {isPending && (
            <div className="flex items-start justify-start">
              <span className="text-gray-600 text-xs mr-3 font-mono select-none">
                {messages.filter((msg) => msg.role !== Role.SYSTEM).length + 2}
              </span>
              <div className="flex-1">
                <TypingIndicator text={t.escribiendo} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-[#252526] p-3 border-t border-gray-700/50 rounded-b-lg">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-xs font-mono select-none">
              ▸
            </span>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 bg-[#1e1e1e] border border-gray-700/50 text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all duration-200 text-sm font-mono px-3 py-2 rounded-lg"
              placeholder={t.escribeTuPregunta}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
