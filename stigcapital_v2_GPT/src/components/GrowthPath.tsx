import dashboardImg from "@/assets/dashboard.png";

const stages = [
  {
    level: "Level 1-2",
    title: "Early Stage",
    revenue: "$0 - $500K",
    focus: "Product-market fit, initial traction",
    program: "Business Incubator"
  },
  {
    level: "Level 3-4",
    title: "Growth Stage",
    revenue: "$500K - $5M",
    focus: "Scaling operations, market expansion",
    program: "Business Accelerator"
  },
  {
    level: "Level 5-6",
    title: "Scale Stage",
    revenue: "$5M - $25M",
    focus: "Optimization, strategic partnerships",
    program: "Business Consulting"
  },
  {
    level: "Level 7+",
    title: "Enterprise",
    revenue: "$25M+",
    focus: "Market leadership, exit strategy",
    program: "Business Investment"
  }
];

const GrowthPath = () => {
  return (
    <section id="process" className="py-24 bg-gradient-to-br from-[hsl(var(--navy-dark))] via-[hsl(var(--navy-medium))] to-[hsl(var(--navy-dark))] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">
            Your Path to <span className="text-gradient-accent">Multi-Million Dollar Success</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We meet you wherever you are in your journey and provide the exact resources, 
            capital, and expertise needed to reach the next level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Dashboard Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl" />
              <img 
                src={dashboardImg} 
                alt="Growth analytics" 
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

          {/* Growth Stages */}
          <div className="order-1 lg:order-2 space-y-6">
            {stages.map((stage, index) => (
              <div 
                key={index}
                className="group relative backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:bg-white/10"
              >
                {/* Connector line */}
                {index < stages.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-primary to-transparent" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primary">{stage.level}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                        {stage.program}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{stage.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{stage.revenue} annual revenue</p>
                    <p className="text-sm text-gray-300">{stage.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Accelerate?
              <br />
              Growth Business Value Fast!
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Let's discuss where you are today and create a customized plan to reach your multi-million dollar goals.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary-glow text-white font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,149,0,0.4)] transition-all duration-300">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthPath;
