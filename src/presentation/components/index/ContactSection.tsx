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
      className="relative z-10 py-24 px-4 md:px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            {t.letsWorkTogether}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.contactSubtitle}
          </p>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t.contactTitle}</CardTitle>
            <CardDescription>
              {t.contactDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700 text-left block"
                >
                  {t.nameLabel}
                  <span className="text-red-500 ml-1" aria-label="required">*</span>
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
                  className="border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700 text-left block"
                >
                  {t.emailLabel}
                  <span className="text-red-500 ml-1" aria-label="required">*</span>
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
                  className="border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-700 text-left block"
                >
                  {t.messageLabel}
                  <span className="text-red-500 ml-1" aria-label="required">*</span>
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
                  className="border-slate-200 resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-full bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700"
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
                  className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
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
