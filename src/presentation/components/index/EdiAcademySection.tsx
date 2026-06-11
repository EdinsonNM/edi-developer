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
      className="relative z-10 py-24 px-4 md:px-6 bg-white/[0.02] border-t border-white/10"
    >
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4" data-reveal>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-acid mb-4">
            08 — Academy
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
            {t.ediAcademyTitle}{" "}
            <span className="text-acid">{t.ediAcademyTitleHighlight}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
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
                data-reveal
                className={cn(
                  "group relative rounded-2xl overflow-hidden p-6 flex flex-col transition-all duration-300",
                  profile.isWide &&
                    "md:row-span-2 justify-between min-h-[400px] p-8",
                  !profile.isWide && "min-h-[190px]",
                  "bg-white/[0.04] border border-white/10 hover:border-acid/40"
                )}
              >
                {/* Background blur effects */}
                {isBlue && (
                  <>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-acid/10 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-40"></div>
                  </>
                )}
                {isPurple && (
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-acid/10 rounded-full blur-2xl opacity-50"></div>
                )}

                <div className="relative z-10 h-full flex flex-col">
                  {profile.isWide ? (
                    <div>
                      <div
                        className={cn(
                          "w-16 h-16 mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"
                        )}
                      >
                        <Icon className="w-8 h-8 text-acid" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-acid uppercase tracking-wider">
                        {profile.label}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10 bg-white/5"
                        )}
                      >
                        <Icon className="w-6 h-6 text-acid" />
                      </div>
                      <span
                        className={cn(
                          "font-mono text-xs font-semibold uppercase tracking-wider text-acid"
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
                        "font-display font-bold transition-colors text-white group-hover:text-acid",
                        profile.isWide ? "text-3xl mb-4" : "text-2xl mb-2"
                      )}
                    >
                      {profile.title}
                    </h3>
                    <p
                      className={cn(
                        "text-white/60 leading-relaxed",
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
          <div
            data-reveal
            className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-acid/40 p-6 transition-colors"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={cn(
                    "space-y-2",
                    index !== 0 && "border-x border-white/10"
                  )}
                >
                  <div
                    className={cn(
                      "font-display text-4xl font-bold text-acid"
                    )}
                  >
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-white/40 uppercase tracking-wider">
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
            className="inline-flex items-center gap-2 rounded-full bg-acid text-ink px-8 py-4 text-base font-medium hover:bg-acid-dim transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-ink"
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
