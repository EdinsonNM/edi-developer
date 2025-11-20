import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            return (
              <Card
                key={index}
                className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <CardTitle className="text-xl">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

