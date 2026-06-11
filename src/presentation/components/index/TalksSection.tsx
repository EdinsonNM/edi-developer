import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic } from "lucide-react";
import { useI18n } from "@/presentation/utils/use-i18n";

export function TalksSection() {
  const { t } = useI18n();

  const topics = [
    t.aiForDevelopers,
    t.technicalStorytelling,
    t.modernSoftwareEngineering,
    t.threeDWithReact,
    t.educationalInnovation,
    t.technologyWithPurpose,
  ];
  return (
    <section
      id="charlas"
      className="relative z-10 py-24 px-4 md:px-6 bg-transparent border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-acid mb-4">
            05 — Talks
          </p>
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/5 border border-white/10 mb-6">
            <Mic className="h-8 w-8 text-acid" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {t.talksTitle}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            {t.talksSubtitle}
          </p>
        </div>

        <div className="mb-12" data-reveal>
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            {t.topicsITeach}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm border-white/20 text-white/60 hover:border-acid hover:text-acid transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-center" data-reveal>
          <Button
            size="lg"
            className="rounded-full bg-acid text-ink hover:bg-acid-dim px-8 py-6 text-base focus:ring-acid focus:ring-offset-ink"
          >
            {t.inviteMeToTalk}
            <Mic className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
