import { Award, Eye, MessageSquare, CheckCircle, Heart } from "lucide-react";
import { useI18n } from "@/presentation/utils/use-i18n";
import { cn } from "@/lib/utils";

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
    <section id="por-que-trabajar-conmigo" className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            {t.whyWorkWithMeTitle}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.whyWorkWithMeSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const isBlue = index % 2 === 1; // alternar colores como en EdiAcademy
            const isPurple = !isBlue;

            return (
              <div
                key={index}
                className={cn(
                  "group relative rounded-3xl overflow-hidden p-6 flex flex-col transition-all duration-300 min-h-[190px]",
                  isBlue &&
                    "bg-gradient-to-br from-blue-50 via-blue-50/50 to-white border border-blue-200/60 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100",
                  isPurple &&
                    "bg-gradient-to-br from-purple-50 via-purple-50/30 to-white border border-purple-200/60 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100"
                )}
              >
                {isBlue && (
                  <>
                    <div className="absolute top-0 right-0 w-28 h-28 bg-blue-200/30 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl opacity-40" />
                  </>
                )}
                {isPurple && (
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl opacity-50" />
                )}

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border-2 shadow-sm",
                        isBlue &&
                          "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300/50",
                        isPurple &&
                          "bg-gradient-to-br from-purple-100 to-purple-50 border-purple-300/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6",
                          isBlue && "text-blue-600",
                          isPurple && "text-purple-600"
                        )}
                      />
                    </div>
                  </div>

                  <h3
                    className={cn(
                      "font-bold transition-colors text-slate-900 text-2xl mb-2",
                      isBlue && "group-hover:text-blue-600",
                      isPurple && "group-hover:text-purple-600"
                    )}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
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

