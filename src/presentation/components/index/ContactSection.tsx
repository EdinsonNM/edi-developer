import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/presentation/utils/use-i18n";

export function ContactSection() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/mdkbwwro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Resetear el mensaje de éxito después de 5 segundos
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        // Resetear el mensaje de error después de 5 segundos
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      // Resetear el mensaje de error después de 5 segundos
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contacto"
      className="relative z-10 py-24 px-4 md:px-6 bg-white/[0.02] border-t border-white/10"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12" data-reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-acid mb-4">
            09 — Contact
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {t.letsWorkTogether}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t.contactSubtitle}
          </p>
        </div>

        <Card
          data-reveal
          className="bg-white/[0.04] border border-white/10 rounded-2xl hover:border-acid/40 transition-colors shadow-none"
        >
          <CardHeader>
            <CardTitle className="font-display text-2xl text-white">{t.contactTitle}</CardTitle>
            <CardDescription className="text-white/60">
              {t.contactDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-white/60 text-left block"
                >
                  {t.nameLabel}
                  <span className="text-acid ml-1" aria-label="required">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-acid focus:ring-offset-ink"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white/60 text-left block"
                >
                  {t.emailLabel}
                  <span className="text-acid ml-1" aria-label="required">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  autoComplete="email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-acid focus:ring-offset-ink"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white/60 text-left block"
                >
                  {t.messageLabel}
                  <span className="text-acid ml-1" aria-label="required">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none focus:ring-2 focus:ring-acid focus:ring-offset-ink"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-full bg-acid text-ink hover:bg-acid-dim disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-ink"
                aria-label={t.sendButton}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2" aria-hidden="true">⏳</span>
                    <span aria-live="polite">{t.sending}</span>
                  </>
                ) : (
                  <>
                    {t.sendButton}
                    <Send className="h-4 w-4 ml-2" aria-hidden="true" />
                  </>
                )}
              </Button>

              {/* Mensajes de estado con aria-live para lectores de pantalla */}
              {submitStatus === "success" && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2 p-4 bg-acid/10 border border-acid/30 rounded-lg text-acid"
                >
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {t.messageSentSuccess}
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                >
                  <AlertCircle className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">
                    {t.messageError}
                  </span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
