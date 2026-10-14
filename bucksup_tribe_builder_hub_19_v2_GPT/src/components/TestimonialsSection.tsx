
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [{
    topTitle: "Americans Spend: 16% of house hold income on Car and Gas",
    bottomTitle: "Earn Back 20 to 30% of Gas Costs",
    quote: "BucksUp has completely changed how I think about spending and saving. The tribe community is amazing!",
    name: "Sarah M.",
    role: "Tribe Founder"
  }, {
    topTitle: "44% Of Income Goes To Housing",
    bottomTitle: "Save & Make Back 10% Higher ROI On Your Biggest Investment, Your Home.",
    quote: "I've saved over $2,000 in the first year just by using the platform. Highly recommend!",
    name: "Mike R.",
    role: "Tribe Member"
  }, {
    topTitle: "Food & Shopping Cost Homeowners 30% of Income",
    bottomTitle: "Covering These Costs Brings You Closer To Retirement. Amazing!",
    quote: "The rewards system is fantastic. I'm earning money while helping others save too!",
    name: "Jennifer L.",
    role: "Master Chief"
  }, {
    topTitle: "Entertainment & Travel: 12% of Household Budget",
    bottomTitle: "Turn Fun Expenses Into Investment Opportunities",
    quote: "Who knew that my vacation spending could actually help build my wealth? This platform is incredible!",
    name: "David K.",
    role: "VIP Member"
  }];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Awsome Deals &amp; Vip Perks</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => 
            <Card key={index} className={`border-0 shadow-lg ${index === 3 ? 'hidden md:block lg:hidden xl:block' : ''}`}>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 mb-2 text-xl">{testimonial.topTitle}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => 
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <div className="text-lg font-semibold text-green-600 mb-4">{testimonial.bottomTitle}</div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;

