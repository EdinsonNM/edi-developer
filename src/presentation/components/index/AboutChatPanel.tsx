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
    <div className="flex items-center space-x-1 p-2 sm:p-3 rounded-lg rounded-tl-sm max-w-[85%] bg-white/[0.04] border border-white/10 font-mono">
      <div className="flex items-center justify-center">
        <span className="text-white/60 mr-2 text-xs sm:text-sm">{text}</span>
        <div className="flex space-x-1 items-center">
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-acid rounded-full animate-bounce"
            style={{
              animationDelay: "0ms",
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          ></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-acid rounded-full animate-bounce"
            style={{
              animationDelay: "0.2s",
              animationDuration: "1.4s",
              animationIterationCount: "infinite",
            }}
          ></div>
          <div
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-acid rounded-full animate-bounce"
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
    <div className="flex flex-col h-full bg-ink-soft border border-white/10 rounded-2xl overflow-hidden font-mono">
      {/* Header estilo macOS */}
      <div className="bg-white/[0.06] px-3 py-2 border-b border-white/10 rounded-t-2xl">
        <div className="flex items-center gap-2 mb-2">
          {/* Botones de colores macOS */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#34c759] transition-colors cursor-pointer"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1">
          <div className="w-5 h-5 flex items-center justify-center rounded text-acid text-xs font-bold">
            <span>▸</span>
          </div>
          <span className="text-white/60 font-medium text-xs uppercase tracking-wider">
            {t.chatWithEdinson}
          </span>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex flex-col flex-1 min-h-0 bg-ink-soft rounded-b-2xl">
        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex flex-col gap-3 overflow-y-auto flex-1 scroll-smooth px-4 py-4"
        >
          {/* Mensaje de saludo inicial */}
          {messages.length === 0 && (
            <div className="flex items-start justify-start">
              <span className="text-white/30 text-xs mr-3 font-mono">1</span>
              <div className="flex-1">
                <div className="bg-white/[0.04] rounded border border-white/10 p-3">
                  <p className="text-white/70 text-sm font-mono leading-relaxed">
                    <span className="text-white/40">// </span>
                    <span className="text-white/60">
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
                    <span className="text-white/30 text-xs mr-3 font-mono select-none">
                      {lineNumber}
                    </span>
                    <div className="flex-1">
                      <div
                        className={`relative text-left p-3 whitespace-pre-wrap text-sm font-mono leading-relaxed border rounded-lg ${
                          msg.role === Role.USER
                            ? "bg-white/[0.06] text-white/80 border-white/10"
                            : "bg-white/[0.04] text-white/70 border-white/10"
                        }`}
                      >
                        {msg.role === Role.USER ? (
                          <span>
                            <span className="text-white/40">const </span>
                            <span className="text-acid">question</span>
                            <span className="text-white/40"> = </span>
                            <span className="text-acid-dim">
                              "{msg.content}"
                            </span>
                            <span className="text-white/40">;</span>
                          </span>
                        ) : (
                          <span>
                            <span className="text-white/40">// </span>
                            <span className="text-white/70">{msg.content}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Gráfico dentro del chat */}
                  {msg.role !== Role.USER && hasValidChart && (
                    <div className="ml-10 mr-2 mb-3 bg-white/[0.04] border border-white/10 rounded-lg p-3">
                      <h3 className="text-sm font-semibold text-white mb-1 font-mono">
                        <span className="text-white/40">// </span>
                        {messageChart.title}
                      </h3>
                      <p className="text-xs text-white/60 mb-2 font-mono">
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
                          <div className="mt-2 text-xs text-white/40 flex items-center gap-3 flex-wrap font-mono">
                            <span className="text-white/30">
                              // {t.scrollHorizontal}
                            </span>
                            <span className="text-white/30">
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
              <span className="text-white/30 text-xs mr-3 font-mono select-none">
                {messages.filter((msg) => msg.role !== Role.SYSTEM).length + 2}
              </span>
              <div className="flex-1">
                <TypingIndicator text={t.escribiendo} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white/[0.04] p-3 border-t border-white/10 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs font-mono select-none">
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
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-acid/50 focus:ring-1 focus:ring-acid/30 transition-all duration-200 text-sm font-mono px-3 py-2 rounded-lg"
              placeholder={t.escribeTuPregunta}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
