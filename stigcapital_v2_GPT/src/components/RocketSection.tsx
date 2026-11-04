import rocketImage from "@/assets/rocket-growth.jpg";

const RocketSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${rocketImage})` }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/70 backdrop-blur-sm p-12 rounded-2xl border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Acceleration You Deserve!
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Launch your business to new heights with strategic guidance, capital investment, 
              and operational expertise. We provide the fuel your venture needs to achieve 
              breakthrough momentum and sustainable success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RocketSection;
