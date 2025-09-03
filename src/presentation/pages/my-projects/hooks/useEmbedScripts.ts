import { useEffect } from "react";

export const useEmbedScripts = () => {
  useEffect(() => {
    const load = (src: string, onload?: () => void) => {
      const existing = document.querySelector(
        `script[src="${src}"]`
      ) as HTMLScriptElement | null;
      if (existing) {
        onload?.();
        return;
      }
      const s = document.createElement("script");
      s.async = true;
      s.src = src;
      if (onload) s.onload = onload;
      document.body.appendChild(s);
    };

    // Ensure TikTok transforms run once the script is loaded
    load("https://www.tiktok.com/embed.js", () => {
      // @ts-ignore
      (window as any)?.tiktokEmbedLoad?.();
    });

    // Embedly
    load("https://cdn.embedly.com/widgets/platform.js");
  }, []);
};
