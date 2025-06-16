import { useState, useRef, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import Highcharts from "highcharts"; // Tu importación principal
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/timeline"; // Simplemente importa el módulo para que se ejecute

// import useCompletions from "@presentation/utils/hooks/useCompletions"; // Comentado si no se usa
import useCompletionsGemini from "@presentation/utils/hooks/useGeminiReceipt";
import { useI18n } from "@presentation/utils/use-i18n";

// Componente de animación de puntos de carga responsive
const TypingIndicator = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center space-x-1 p-2 sm:p-3 rounded-lg bg-gray-800 text-gray-100 rounded-bl-none max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] shadow-md">
      <div className="flex items-center justify-center">
        <span className="text-gray-300 mr-2 sm:mr-3 text-xs sm:text-sm">{text}</span>
        <div className="flex space-x-1 items-center">
          <div 
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" 
            style={{ 
              animationDelay: '0ms',
              animationDuration: '1.4s',
              animationIterationCount: 'infinite'
            }}
          ></div>
          <div 
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" 
            style={{ 
              animationDelay: '0.2s',
              animationDuration: '1.4s',
              animationIterationCount: 'infinite'
            }}
          ></div>
          <div 
            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" 
            style={{ 
              animationDelay: '0.4s',
              animationDuration: '1.4s',
              animationIterationCount: 'infinite'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function InfoSearch() {
  const {
    result: { mutate, isPending },
    messages,
  } = useCompletionsGemini();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const hasExecutedAutoSearch = useRef(false);
  const { t } = useI18n();

  // Almacenar datos de gráficos por ID de mensaje
  const [messageCharts, setMessageCharts] = useState<Record<string, {
    title: string;
    description: string;
    highchart: Highcharts.Options;
  }>>({});
  
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
        .filter(msg => msg.role !== "system" && msg.role !== "user")
        .slice(-1)[0];
      
      if (lastAssistantMessage) {
        const messageId = lastAssistantMessage.id || `msg-${Date.now()}`;
        
        // Verificar si este mensaje ya tiene un gráfico asociado
        if (!messageCharts[messageId]) {
          setMessageCharts(prev => ({
            ...prev,
            [messageId]: pendingChartData
          }));
          setPendingChartData(null); // Limpiar datos pendientes
        }
      }
    }
  }, [messages, pendingChartData, messageCharts]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Efecto para hacer scroll al final cuando cambian los mensajes o el estado de pending
  useEffect(() => {
    // Pequeño delay para asegurar que el DOM se haya actualizado
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        const element = chatContainerRef.current;
        setTimeout(() => {
          element.scrollTo({
            top: element.scrollHeight,
            behavior: "smooth",
          });
        }, 100); // 100ms de delay para asegurar que el DOM esté actualizado
      }
    };
    
    scrollToBottom();
  }, [messages, isPending]); // Incluir isPending para hacer scroll cuando aparece/desaparece el typing indicator

  // Efecto para búsqueda automática desde query parameter
  useEffect(() => {
    const searchQuery = searchParams.get('q');
    console.log('🔍 Debug - searchQuery:', searchQuery, 'hasExecuted:', hasExecutedAutoSearch.current);
    
    if (searchQuery && searchQuery.trim() && !hasExecutedAutoSearch.current) {
      console.log('✅ Ejecutando búsqueda automática');
      setInputValue(searchQuery);
      hasExecutedAutoSearch.current = true;
      
      // Pequeño delay para evitar race conditions
      setTimeout(() => {
        mutate(searchQuery, {
          onSuccess: (data) => {
            console.log("Data recibida en búsqueda automática:", data);
            // Limpiar el input después de enviar la consulta automática
            setInputValue("");
            // Almacenar datos pendientes que serán asociados por el useEffect
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
            // Limpiar el input también en caso de error
            setInputValue("");
            // En caso de error usar el mismo sistema
            setPendingChartData({
              title: t.errorCargarDatos,
              description: t.problemaGrafico,
              highchart: {
                title: { text: t.errorCargarDatos },
                series: [{ type: "bar", data: [] }],
              },
            });
          },
        });
      }, 100);
    }
  }, [searchParams, mutate, t]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    mutate(inputValue, {
      onSuccess: (data) => {
        console.log("Data recibida en onSuccess:", data);
        // Usar el mismo sistema que en la búsqueda automática
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
        // En caso de error usar el mismo sistema que en búsqueda automática
        setPendingChartData({
          title: t.errorCargarDatos,
          description: t.problemaGrafico,
          highchart: {
            title: { text: t.errorCargarDatos },
            series: [{ type: "bar", data: [] }],
          },
        });
      },
    });

    setInputValue("");
  };

  return (
    <div
      className="relative min-h-screen w-full opacity-25 blur-sm"
    
    >
     
      <div className="flex flex-col max-w-7xl mx-auto p-2 sm:p-4 bg-transparent mt-16 sm:mt-20 lg:mt-24">
        {/* Chat de ancho completo con altura máxima responsive */}
        <div className="flex flex-col bg-gray-800/60 backdrop-blur-md border border-gray-600/60 rounded-lg p-2 sm:p-4 h-[calc(100vh-100px)] sm:h-[calc(100vh-120px)] lg:h-[calc(100vh-130px)] w-full">
          {/* ... Mapeo de mensajes ... */}
          <div 
            ref={chatContainerRef}
            className="flex flex-col gap-3 mb-4 overflow-y-auto h-full scroll-smooth"
          >
            {/* Mensaje de saludo inicial responsive */}
            <div className="flex items-start mb-2 justify-start">
              <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-green-700 text-white mr-1 sm:mr-2 font-bold text-sm sm:text-lg flex-shrink-0">
                <span role="img" aria-label="asistente">
                  🤖
                </span>
              </div>
              <div className="p-2 sm:p-4 rounded-lg max-w-[95%] sm:max-w-[90%] shadow-md bg-gradient-to-r from-green-800/60 to-green-700/60 text-white rounded-bl-none border border-green-600/40">
                <h2 className="text-lg sm:text-xl font-bold mb-2">{t.saludoAsistente}</h2>
                <p className="text-green-100 mb-3 text-sm sm:text-base">{t.descripcionAsistente}</p>
                <div className="text-xs sm:text-sm text-green-200 bg-green-900/40 rounded-lg p-2 sm:p-3 border border-green-600/30">
                  <p className="font-medium mb-1">{t.ejemplosPreguntas}</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>{t.ejemploTimeline}</li>
                    <li>{t.ejemploHabilidades}</li>
                    <li>{t.ejemploProyectos}</li>
                    <li>{t.ejemploExperiencia}</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {messages
              .filter((msg) => msg.role !== "system") // 'system' no es un rol en tu UIMessageType
              .map((msg, idx) => (
                <div key={msg.id || idx}>
                  <div
                    className={`flex items-end mb-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role !== "user" && ( // Debería ser msg.role === "model"
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-green-700 text-white mr-1 sm:mr-2 font-bold text-sm sm:text-lg flex-shrink-0">
                        <span role="img" aria-label="asistente">
                          🤖
                        </span>
                      </div>
                    )}
                    <div
                      className={`p-2 sm:p-3 rounded-lg max-w-[85%] sm:max-w-[75%] lg:max-w-[70%] whitespace-pre-wrap shadow-md text-sm sm:text-base ${
                        msg.role === "user"
                          ? "bg-sky-600/80 text-white rounded-br-none"
                          : "bg-gray-800 text-gray-100 rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-sky-600 text-white ml-1 sm:ml-2 font-bold text-sm sm:text-lg flex-shrink-0">
                        <span role="img" aria-label="usuario">
                          🧑
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Gráfico dentro del chat después de la respuesta del asistente */}
                  {(() => {
                    const messageId = msg.id || `msg-${idx}`;
                    const messageChart = messageCharts[messageId];
                    
                    // Validar si realmente hay un gráfico válido para mostrar
                    const hasValidChart = messageChart && 
                      messageChart.highchart && 
                      Object.keys(messageChart.highchart).length > 0 &&
                      messageChart.highchart.series &&
                      Array.isArray(messageChart.highchart.series) &&
                      messageChart.highchart.series.length > 0;
                    
                    return msg.role !== "user" && hasValidChart && (
                      <div className="ml-4 sm:ml-6 lg:ml-10 mr-2 sm:mr-4 mb-4 bg-gray-900/40 backdrop-blur-sm border border-gray-500/40 rounded-lg p-2 sm:p-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                          {messageChart.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 mb-4">
                          {messageChart.description}
                        </p>
                        {/* Renderiza HighchartsReact con datos ya validados */}
                        <div className={`w-full ${
                          messageChart.highchart.chart?.type === 'timeline' 
                            ? 'overflow-x-auto overflow-y-hidden min-h-[300px] sm:min-h-[400px]' 
                            : 'overflow-hidden'
                        }`}>
                          <HighchartsReact
                            key={`chart-${messageId}-${messageChart.highchart.chart?.type || 'default'}`} // Key única para cada mensaje
                            highcharts={Highcharts} // Pasa la instancia de Highcharts
                            options={(() => {
                              const isTimeline = messageChart.highchart.chart?.type === 'timeline';
                              console.log('🎯 Tipo de gráfico detectado:', messageChart.highchart.chart?.type, 'isTimeline:', isTimeline);
                              console.log('📊 Datos completos del gráfico:', messageChart.highchart);
                              
                              if (isTimeline) {
                                // Configuraciones específicas para timeline
                                const timelineOptions = {
                                  ...messageChart.highchart,
                                  chart: {
                                    ...messageChart.highchart.chart,
                                    height: 450,
                                    scrollablePlotArea: {
                                      minWidth: Math.max(
                                        1200,
                                        Array.isArray(messageChart.highchart.series) &&
                                          messageChart.highchart.series[0] &&
                                          'data' in messageChart.highchart.series[0] &&
                                          Array.isArray((messageChart.highchart.series[0] as any).data)
                                            ? ((messageChart.highchart.series[0] as any).data.length || 5) * 200
                                            : 5 * 200
                                      ),
                                      scrollPositionX: 1
                                    },
                                    marginLeft: 20,
                                    marginRight: 20
                                  },
                                  plotOptions: {
                                    ...(messageChart.highchart.plotOptions || {}),
                                    timeline: {
                                      ...(messageChart.highchart.plotOptions?.timeline || {}),
                                      dataLabels: {
                                        ...(messageChart.highchart.series?.[0] && 'dataLabels' in messageChart.highchart.series[0]
                                          ? (messageChart.highchart.series[0] as any).dataLabels
                                          : {}),
                                        enabled: true,
                                        allowOverlap: false,
                                        style: {
                                          fontSize: '11px',
                                          textOutline: 'none',
                                          fontWeight: 'normal'
                                        },
                                        distance: 25
                                      }
                                    }
                                  }
                                };
                                console.log('⚡ Opciones para timeline:', timelineOptions);
                                return timelineOptions;
                              } else {
                                // Configuraciones seguras para otros tipos de gráficos
                                const originalOptions = messageChart.highchart;
                                const chartType = originalOptions.chart?.type || 'bar';
                                
                                // Crear opciones seguras
                                const safeOptions = {
                                  chart: {
                                    type: chartType,
                                    backgroundColor: "transparent",
                                    marginTop: 60,
                                  },
                                  title: originalOptions.title || { text: "" },
                                  xAxis: originalOptions.xAxis || {},
                                  yAxis: originalOptions.yAxis || {},
                                  legend: originalOptions.legend || {},
                                  series: originalOptions.series || [],
                                  plotOptions: {
                                    ...(originalOptions.plotOptions || {}),
                                    // Asegurar que el tipo de gráfico tenga configuración básica
                                    [chartType as keyof Highcharts.PlotOptions]: {
                                      ...((originalOptions.plotOptions?.[chartType as keyof Highcharts.PlotOptions] ?? {}) as Highcharts.Options)
                                    }
                                  }
                                };
                                
                                console.log('🧹 Opciones seguras para gráfico:', safeOptions);
                                return safeOptions;
                              }
                            })()}
                            // constructorType={'chart'} // Opcional, por defecto es 'chart'
                          />
                          {/* Instrucciones para timeline */}
                          {messageChart.highchart.chart?.type === 'timeline' && (
                            <div className="mt-2 text-xs text-gray-400 flex items-center gap-4">
                              <span>{t.scrollHorizontal}</span>
                              <span>{t.ctrlZoom}</span>
                              <span>{t.hoverDetalles}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ))}
            
            {/* Indicador de escritura cuando está cargando responsive */}
            {isPending && (
              <div className="flex items-end mb-2 justify-start">
                <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-green-700 text-white mr-1 sm:mr-2 font-bold text-sm sm:text-lg flex-shrink-0">
                  <span role="img" aria-label="asistente">
                    🤖
                  </span>
                </div>
                <TypingIndicator text={t.escribiendo} />
              </div>
            )}
          </div>

          {/* Input y botón de enviar responsive */}
          <div className="flex mt-auto gap-1 sm:gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 rounded-lg px-2 sm:px-4 py-2 bg-transparent border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder={t.escribeTuPregunta}
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white p-2 rounded-lg flex-shrink-0"
            >
              <BiSend size={16} className="sm:hidden" />
              <BiSend size={20} className="hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
