const AboutStigSection = () => {
  const metrics = [
    { label: "ACCESS TO CAPITAL", value: 85, colorStart: "#ef4444", colorEnd: "#f97316" },
    { label: "MANAGEMENT EXPERIENCE", value: 91, colorStart: "#22c55e", colorEnd: "#10b981" },
    { label: "TECHNOLOGY LEVERAGE", value: 88, colorStart: "#3b82f6", colorEnd: "#06b6d4" },
    { label: "PARTNERSHIP RELATIONSHIPS", value: 95, colorStart: "#eab308", colorEnd: "#f97316" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[hsl(var(--navy-dark))] via-[hsl(var(--navy-medium))] to-[hsl(var(--navy-dark))] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-accent mb-4">
            ABOUT -STIG CAPITAL
          </h2>
          <p className="text-lg text-gray-300">
            | STIG Provides The Match |
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Quote */}
          <div>
            <h3 className="text-3xl md:text-4xl font-light text-white leading-tight">
              Success is not like spontaneous combustion.
              <br />
              You must set yourself on fire.
              <br />
              <br />
              - <span className="text-gradient-accent font-bold">Stig Capital</span> provides the match.
            </h3>
          </div>

          {/* Right Column - Description */}
          <div>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Stig Capital was founded by five seasoned private equity veterans who realized 
                combining their expertise, networks, and controlled companies creates a unique 
                market advantage.
              </p>
              <p>
                Our Roll-Up Group brings together pre-IPO companies, preserving mid-market agility 
                while leveraging Stig's management, partnerships, and technology to drive growth. 
                Over the next 30 months, we aim to roll up cloud and telecom companies into a $1.5B 
                revenue network, while acquiring key players to boost customer relationships, revenue, 
                and profitability.
              </p>
              <p>
                With a track record of multiple IPOs, 50+ acquisitions, and global experience, Stig 
                Capital is ready to repeat—and amplify—its success. Join us on the path to the next 
                big IPO.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {/* Circular Progress */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - metric.value / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={metric.colorStart} />
                      <stop offset="100%" stopColor={metric.colorEnd} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{metric.value}</span>
                </div>
              </div>
              {/* Label */}
              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wide text-center">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStigSection;
