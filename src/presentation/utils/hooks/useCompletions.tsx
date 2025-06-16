import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { systemPrompt } from "./system-prompt";

enum Role {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}

type MessageType = {
  role: Role;
  content: string;
};

const systemMessage: MessageType = {
  role: Role.SYSTEM,
  content: systemPrompt,
};

export type AssistantMessage = {
  response: string;
  title: string;
  description: string;
  highchart: Highcharts.Options;
};

function sanitizeToolCall(args: any): AssistantMessage {
  // Para gráficos de tipo timeline, necesitamos asegurarnos de que la estructura sea adecuada
  const highchartConfig = args.highchart;

  // Si es un gráfico timeline, verifica y ajusta la configuración según las reglas estrictas
  if (highchartConfig?.chart?.type === "timeline") {
    // Asegurarnos de que la configuración de dataLabels es correcta
    if (highchartConfig.series && highchartConfig.series.length > 0) {
      highchartConfig.series[0].dataLabels = highchartConfig.series[0]
        .dataLabels || {
        enabled: true,
        allowOverlap: false,
        useHTML: true,
        format:
          '<div style="font-size:10px;">● <strong>{point.name}</strong><br/><em>{point.label} ({point.x})</em></div>',
        style: { textOutline: "none", fontSize: "10px" },
        padding: 5,
        connectorColor: "silver",
        connectorWidth: 1,
        distance: 20,
      };

      // Asegurarnos de que el tooltip está configurado correctamente
      highchartConfig.tooltip = highchartConfig.tooltip || {
        style: { width: 300 },
        outside: true,
      };

      // Verificar que cada punto de datos tiene la estructura correcta
      if (highchartConfig.series[0].data) {
        highchartConfig.series[0].data = highchartConfig.series[0].data.map(
          (point: any) => {
            // Asegurarse de que cada punto tiene las propiedades esenciales
            if (typeof point === "object") {
              return {
                x: point.x || 0,
                name: point.name || "",
                label: point.label || "",
                description: point.description || "",
              };
            }
            return point;
          }
        );
      }
    }
  }

  return {
    response: args.response ?? "Sin respuesta.",
    title: args.title ?? "",
    description: args.description ?? "",
    highchart: highchartConfig ?? {
      chart: { type: "bar", backgroundColor: "transparent", marginTop: 60 },
      title: { text: "" },
      xAxis: { categories: [], labels: { style: { color: "#ccc" } } },
      yAxis: {
        title: { text: "", style: { color: "#ccc" } },
        labels: { style: { color: "#ccc" } },
      },
      legend: { itemStyle: { color: "#ccc" } },
      series: [],
    },
  };
}
export default function useCompletions() {
  const [messages, setMessages] = useState<MessageType[]>([systemMessage]);

  const result = useMutation({
    mutationFn: async (userInput: string) => {
      // ✅ Mostrar mensaje del usuario inmediatamente
      setMessages((prev) => [...prev, { role: Role.USER, content: userInput }]);

      // ✅ Construcción segura del historial
      const safeMessages = [
        systemMessage,
        ...messages.filter((m) => m.role === Role.USER),
        { role: Role.USER, content: userInput },
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // o "gpt-4.1" si tienes acceso
          messages: safeMessages,
          tool_choice: "required",
          tools: [
            {
              type: "function",
              function: {
                name: "responder_con_grafico",
                description:
                  "Responde preguntas sobre Edinson Nuñez More con texto y un gráfico Highcharts",
                parameters: {
                  type: "object",
                  properties: {
                    response: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    highchart: { type: "object" },
                  },
                  required: ["response", "title", "description", "highchart"],
                },
              },
              strict: true,
            },
          ],
        }),
      });

      const gptData = await res.json();

      const toolCall = gptData?.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall?.function?.arguments) {
        throw new Error("❌ La respuesta no contiene tool_call válida.");
      }

      const args = JSON.parse(toolCall.function.arguments);
      const assistantMessage = sanitizeToolCall(args);

      // ✅ Mostrar mensaje del asistente (solo el texto)
      setMessages((prev) => [
        ...prev,
        { role: Role.ASSISTANT, content: assistantMessage.response },
      ]);

      return assistantMessage;
    },
  });

  return { messages, result };
}
