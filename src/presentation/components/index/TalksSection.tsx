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
      className="relative z-10 py-24 px-4 md:px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
            <Mic className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            {t.talksTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            {t.talksSubtitle}
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
            {t.topicsITeach}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm border-slate-200 hover:bg-slate-50 transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base"
          >
            {t.inviteMeToTalk}
            <Mic className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
