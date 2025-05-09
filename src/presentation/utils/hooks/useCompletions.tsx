import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Role = {
  role: "user" | "system";
  content: string;
};
const systemMessage: Role = {
  role: "system",
  content: "You are a helpful assistant.",
};
export default function useCompletions() {
  const [messages, setMessages] = useState<Role[]>([systemMessage]);
  const result = useMutation({
    mutationFn: async (message: string) => {
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });

      const gptData = await gptRes.json();

      // Verificar si hubo error en la respuesta de GPT
      if (!gptData.choices || gptData.choices.length === 0) {
        console.error("Error en la respuesta de GPT:", gptData);
        return;
      }
      const gptReply = gptData.choices[0].message.content;
      setMessages((prev) => [...prev, { role: "system", content: gptReply }]);
      return gptReply;
    },
  });

  return { messages, result };
}
