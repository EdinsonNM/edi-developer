import { GraduationCap, Code, Building2, ExternalLink } from "lucide-react";
import { useI18n } from "@/presentation/utils/use-i18n";
import { cn } from "@/lib/utils";

export function EdiAcademySection() {
  const { t } = useI18n();

  const profiles = [
    {
      icon: GraduationCap,
      label: t.ediAcademyProfile1Label,
      title: t.ediAcademyProfile1Title,
      description: t.ediAcademyProfile1Desc,
      color: "blue",
      isWide: true,
    },
    {
      icon: Code,
      label: t.ediAcademyProfile2Label,
      title: t.ediAcademyProfile2Title,
      description: t.ediAcademyProfile2Desc,
      color: "purple",
      isWide: false,
    },
    {
      icon: Building2,
      label: t.ediAcademyProfile3Label,
      title: t.ediAcademyProfile3Title,
      description: t.ediAcademyProfile3Desc,
      color: "blue",
      isWide: false,
    },
  ];

  const metrics = [
    {
      value: t.ediAcademyMetric1Value,
      label: t.ediAcademyMetric1Label,
      color: "blue",
    },
    {
      value: t.ediAcademyMetric2Value,
      label: t.ediAcademyMetric2Label,
      color: "purple",
    },
    {
      value: t.ediAcademyMetric3Value,
      label: t.ediAcademyMetric3Label,
      color: "blue",
    },
  ];

  return (
    <section
      id="edi-academy"
      className="relative z-10 py-24 px-4 md:px-6 bg-gradient-to-b from-white to-slate-50/30 border-t border-slate-100"
    >
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            {t.ediAcademyTitle}{" "}
            <span className="text-blue-600">{t.ediAcademyTitleHighlight}</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t.ediAcademyDescription}
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            const isBlue = profile.color === "blue";
            const isPurple = profile.color === "purple";

            return (
              <div
                key={index}
                className={cn(
                  "group relative rounded-3xl overflow-hidden p-6 flex flex-col transition-all duration-300",
                  profile.isWide &&
                    "md:row-span-2 justify-between min-h-[400px] p-8",
                  !profile.isWide && "min-h-[190px]",
                  isBlue &&
                    "bg-gradient-to-br from-blue-50 via-blue-50/50 to-white border border-blue-200/60 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100",
                  isPurple &&
                    "bg-gradient-to-br from-purple-50 via-purple-50/30 to-white border border-purple-200/60 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100"
                )}
              >
                {/* Background blur effects */}
                {isBlue && (
                  <>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl opacity-40"></div>
                  </>
                )}
                {isPurple && (
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl opacity-50"></div>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  {profile.isWide ? (
                    <div>
                      <div
                        className={cn(
                          "w-16 h-16 mb-6 rounded-2xl border-2 border-blue-300/50 bg-gradient-to-br from-blue-100 to-blue-50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                        )}
                      >
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-xs font-semibold text-blue-600/80 uppercase tracking-wider">
                        {profile.label}
                      </span>
                    </div>
                  ) : (
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
                      <span
                        className={cn(
                          "text-xs font-semibold uppercase tracking-wider",
                          isBlue && "text-blue-600/80",
                          isPurple && "text-purple-600/80"
                        )}
                      >
                        {profile.label}
                      </span>
                    </div>
                  )}

                  <div
                    className={cn("relative z-10", profile.isWide && "mt-auto")}
                  >
                    <h3
                      className={cn(
                        "font-bold transition-colors text-slate-900",
                        profile.isWide ? "text-3xl mb-4" : "text-2xl mb-2",
                        isBlue && "group-hover:text-blue-600",
                        isPurple && "group-hover:text-purple-600"
                      )}
                    >
                      {profile.title}
                    </h3>
                    <p
                      className={cn(
                        "text-slate-600 leading-relaxed",
                        profile.isWide ? "text-lg" : "text-sm"
                      )}
                    >
                      {profile.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Metrics Card */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-3 gap-4 text-center">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={cn(
                    "space-y-2",
                    index !== 0 && "border-x border-slate-200"
                  )}
                >
                  <div
                    className={cn(
                      "text-4xl font-bold",
                      metric.color === "blue" && "text-blue-600",
                      metric.color === "purple" && "text-purple-600"
                    )}
                  >
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="https://edi-academy.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-base font-medium hover:from-blue-700 hover:to-blue-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={t.ediAcademyButtonLabel}
          >
            <span>{t.ediAcademyButton}</span>
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
