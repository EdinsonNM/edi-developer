import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
// Asumo que systemPrompt ya tiene el edinsonProfile.json stringificado e inyectado
// Si no, necesitarías una función que lo haga antes de pasarlo a la API.
import { systemPrompt } from "./system-prompt"; // Asegúrate que este es el string final
import { useI18n } from "@presentation/utils/use-i18n";

// Definición de Roles (sin cambios)
export enum Role {
  USER = "user",
  MODEL = "model", // Cambiado de ASSISTANT a MODEL para coincidir con la API de Gemini
  // SYSTEM no se usa en el array de mensajes de chat, se envía por separado
  SYSTEM = "system",
}

// Tipo para los mensajes en el estado local (para la UI)
type UIMessageType = {
  role: Role.USER | Role.MODEL | Role.SYSTEM; // Solo roles de conversación
  content: string; // Contenido textual para mostrar
  id: string; // Para key en React
  highchart?: Highcharts.Options; // Opcional, si quieres mostrar el gráfico en la UI
  title?: string;
  description?: string;
};

// Tipo para el objeto JSON esperado de la respuesta del asistente (sin cambios)
export type AssistantMessageStructure = {
  response: string;
  title: string | null; // Permitir null como en tu prompt de sistema para off-topic
  description: string | null; // Permitir null
  highchart: Highcharts.Options | null; // Permitir null
};

const DEFAULT_HIGHCHART: Highcharts.Options = {
  chart: { type: "column", backgroundColor: "transparent", marginTop: 60 },
  title: { text: "" },
  xAxis: { categories: [], labels: { style: { color: "#ccc" } } },
  yAxis: {
    title: { text: "", style: { color: "#ccc" } },
    labels: { style: { color: "#ccc" } },
  },
  legend: { itemStyle: { color: "#ccc" } },
  series: [],
};

// Contenido que se envía a la API de Gemini
type GeminiContent = {
  role: Role.USER | Role.MODEL;
  parts: Array<{ text: string }>;
};

function sanitizeGeminiResponse(parsedJson: any, language: 'es' | 'en'): AssistantMessageStructure {
  const messages = {
    es: {
      errorProcessing: "Hubo un problema al procesar la respuesta del asistente.",
      offTopicDefault: "Hola, este chat está diseñado exclusivamente para responder preguntas sobre Edinson Nuñez More...",
      noResponse: "Sin respuesta."
    },
    en: {
      errorProcessing: "There was a problem processing the assistant response.",
      offTopicDefault: "Hello, this chat is designed exclusively to answer questions about Edinson Nuñez More...",
      noResponse: "No response."
    }
  };
  
  const lang = messages[language];
  
  // Si parsedJson es null o undefined, devuelve la estructura de "fuera de tema" o una por defecto.
  if (!parsedJson) {
    return {
      response: lang.errorProcessing,
      title: null,
      description: null,
      highchart: DEFAULT_HIGHCHART, // O null si prefieres no mostrar gráfico
    };
  }

  // Si la respuesta coincide con el formato "fuera de tema"
  if (
    parsedJson.response &&
    parsedJson.title === null &&
    parsedJson.description === null &&
    parsedJson.highchart === null
  ) {
    return {
      response: parsedJson.response ?? lang.offTopicDefault,
      title: null,
      description: null,
      highchart: null, // O DEFAULT_HIGHCHART si quieres mostrar uno vacío
    };
  }

  // Para respuestas válidas sobre Edinson
  return {
    response: parsedJson.response ?? lang.noResponse,
    title: parsedJson.title ?? "", // O null si el schema lo permite y tiene sentido
    description: parsedJson.description ?? "", // O null
    highchart: parsedJson.highchart ?? DEFAULT_HIGHCHART,
  };
}

// Función para generar prompt dinámico según el idioma
const generateDynamicPrompt = (language: 'es' | 'en'): string => {
  const languageInstructions = {
    es: {
      responseInstruction: 'IMPORTANTE: Debes responder SIEMPRE en español. Todos los textos en el campo "response" deben estar en español.',
      offTopicResponse: 'Hola, este chat está diseñado exclusivamente para responder preguntas sobre Edinson Nuñez More. Puedes preguntarme sobre su experiencia, habilidades, proyectos, charlas o cualquier aspecto profesional relacionado con él.',
      errorMessage: 'Hubo un problema al procesar la respuesta del asistente.'
    },
    en: {
      responseInstruction: 'IMPORTANT: You must ALWAYS respond in English. All texts in the "response" field must be in English.',
      offTopicResponse: 'Hello, this chat is designed exclusively to answer questions about Edinson Nuñez More. You can ask me about his experience, skills, projects, talks, or any professional aspect related to him.',
      errorMessage: 'There was a problem processing the assistant response.'
    }
  };

  const lang = languageInstructions[language];
  
  // Crear el prompt con instrucciones de idioma
  const dynamicPrompt = `${lang.responseInstruction}

---

${systemPrompt.replace(
    '"Hola, este chat está diseñado exclusivamente para responder preguntas sobre Edinson Nuñez More. Puedes preguntarme sobre su experiencia, habilidades, proyectos, charlas o cualquier aspecto profesional relacionado con él."',
    `"${lang.offTopicResponse}"`
  )}`;
  
  return dynamicPrompt;
};

export default function useCompletionsGemini() {
  // messagesForApi: Almacena el historial en el formato que Gemini espera para `contents`
  const [messagesForApi, setMessagesForApi] = useState<GeminiContent[]>([]);
  // uiMessages: Almacena los mensajes para mostrar en la UI
  const [uiMessages, setUiMessages] = useState<UIMessageType[]>([]);
  const { language } = useI18n();

  const result = useMutation<
    AssistantMessageStructure, // Lo que la mutación devuelve
    Error, // Tipo del error
    string // Tipo del input (userInput)
  >({
    mutationFn: async (
      userInput: string
    ): Promise<AssistantMessageStructure> => {
      const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!GOOGLE_API_KEY) {
        throw new Error("VITE_GOOGLE_API_KEY no está configurada.");
      }
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;
      // Nota: Considera usar gemini-1.5-pro-latest o gemini-1.5-flash-latest para tener las últimas mejoras.
      // gemini-2.0-flash no es un modelo estándar conocido; podría ser gemini-1.0-pro, gemini-1.5-flash, etc.
      // He usado gemini-1.5-flash como ejemplo, ajusta según el modelo que uses.

      // Añadir mensaje del usuario a la UI inmediatamente
      const userUIMessage: UIMessageType = {
        id: `user-${Date.now()}`,
        role: Role.USER,
        content: userInput,
      };
      setUiMessages((prev) => [...prev, userUIMessage]);

      // Preparar el historial para la API
      const currentTurnUserContent: GeminiContent = {
        role: Role.USER,
        parts: [{ text: userInput }],
      };
      const historyForApi = [...messagesForApi, currentTurnUserContent];

      const requestBody = {
        systemInstruction: {
          parts: [{ text: generateDynamicPrompt(language) }], // Usar prompt dinámico según idioma
        },
        contents: historyForApi,
        generationConfig: {
          responseMimeType: "application/json",

          // temperature: 0.2,
          // maxOutputTokens: 2048,
        },
        // safetySettings: { ... } // Puedes añadir configuraciones de seguridad
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Error de la API: ${response.status} ${response.statusText} - ${errorBody}`
        );
      }

      const data = await response.json();

      // El texto JSON crudo está en data.candidates[0].content.parts[0].text
      const rawJsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawJsonText) {
        throw new Error(
          "La API de Gemini no devolvió contenido de texto válido en la estructura esperada."
        );
      }

      let parsedAssistantJson: any;
      try {
        parsedAssistantJson = JSON.parse(rawJsonText);
      } catch (e) {
        console.error("Error al parsear JSON de Gemini:", rawJsonText);
        throw new Error(
          "La respuesta de Gemini no fue un JSON válido: " +
            (e as Error).message
        );
      }

      const assistantMessageStructure =
        sanitizeGeminiResponse(parsedAssistantJson, language);

      // Añadir respuesta del asistente a la UI
      const assistantUIMessage: UIMessageType = {
        id: `assistant-${Date.now()}`,
        role: Role.MODEL,
        content: assistantMessageStructure.response, // Solo el texto para la UI
        highchart: assistantMessageStructure.highchart ?? undefined, // Pasa el gráfico para la UI
        title: assistantMessageStructure.title ?? undefined,
        description: assistantMessageStructure.description ?? undefined,
      };
      setUiMessages((prev) => [...prev, assistantUIMessage]);

      // Actualizar el historial para la API con el turno del usuario y la respuesta COMPLETA del modelo (el JSON crudo)
      setMessagesForApi([
        ...historyForApi, // Esto ya incluye el último turno del usuario
        { role: Role.MODEL, parts: [{ text: rawJsonText }] }, // La respuesta JSON cruda del modelo
      ]);

      return assistantMessageStructure;
    },
    onError: (error: Error) => {
      console.error("Error en la mutación:", error);
      // Podrías añadir un mensaje de error a uiMessages aquí
      const errorUIMessage: UIMessageType = {
        id: `error-${Date.now()}`,
        role: Role.MODEL, // O un rol 'SYSTEM_ERROR' si lo prefieres
        content: `Error: ${error.message}`,
      };
      setUiMessages((prev) => [...prev, errorUIMessage]);
    },
  });

  // Devolvemos uiMessages para renderizar en el chat
  return { messages: uiMessages, result };
}
