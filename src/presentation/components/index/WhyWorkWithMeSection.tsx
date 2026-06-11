import { Award, Eye, MessageSquare, CheckCircle, Heart } from "lucide-react";
import { useI18n } from "@/presentation/utils/use-i18n";

export function WhyWorkWithMeSection() {
  const { t } = useI18n();

  const reasons = [
    {
      icon: Award,
      title: t.yearsExperience,
      description: t.yearsExperienceDesc,
    },
    {
      icon: Eye,
      title: t.completeVision,
      description: t.completeVisionDesc,
    },
    {
      icon: MessageSquare,
      title: t.clearCommunication,
      description: t.clearCommunicationDesc,
    },
    {
      icon: CheckCircle,
      title: t.qualityDelivery,
      description: t.qualityDeliveryDesc,
    },
    {
      icon: Heart,
      title: t.humanApproach,
      description: t.humanApproachDesc,
    },
  ];
  return (
    <section id="por-que-trabajar-conmigo" className="relative z-10 py-24 px-4 md:px-6 bg-white/[0.02] border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-acid mb-4">
            04 — Why me
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            {t.whyWorkWithMeTitle}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t.whyWorkWithMeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={index}
                data-reveal
                className="group relative rounded-2xl overflow-hidden p-6 flex flex-col transition-all duration-300 min-h-[190px] bg-white/[0.04] border border-white/10 hover:border-acid/40"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform bg-white/5 border border-white/10">
                      <Icon className="w-6 h-6 text-acid" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold transition-colors text-white text-2xl mb-2 group-hover:text-acid">
                    {reason.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
