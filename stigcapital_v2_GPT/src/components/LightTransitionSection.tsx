import { TrendingUp, Users, Lightbulb, Target } from "lucide-react";

const LightTransitionSection = () => {
  const highlights = [
    {
      icon: TrendingUp,
      title: "Proven Growth",
      description: "Track record of successful IPOs and acquisitions"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Battle-tested leadership with decades of experience"
    },
    {
      icon: Lightbulb,
      title: "Strategic Innovation",
      description: "Cutting-edge technology and AI-driven insights"
    },
    {
      icon: Target,
      title: "Focused Results",
      description: "Clear path to multi-million dollar success"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LightTransitionSection;
