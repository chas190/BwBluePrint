
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Home, DollarSign, Percent, Briefcase, PiggyBank, Target, Wrench, Rocket, CheckCircle, ArrowRight, Utensils, Car, Package, X, Play } from 'lucide-react';

const Icon_Goals = () => {
  const [selectedYear, setSelectedYear] = useState(1);
  const [currentStep, setCurrentStep] = useState(0); // 0: first intro, 1: what's next, 2: demo goals
  const [showVideoDialog, setShowVideoDialog] = useState(false);

  const year1Goals = [{
    id: 'Q1',
    title: 'Online Spending Goal',
    description: 'Track and optimize your online purchases to maximize rewards and cashback opportunities.',
    progress: '15% saved this quarter',
    icon: ShoppingCart,
    gradient: 'from-purple-500 to-pink-500'
  }, {
    id: 'Q2',
    title: 'Food Goal',
    description: 'Reduce food expenses while maintaining quality through smart shopping and meal planning.',
    progress: '12% reduction achieved',
    icon: Percent,
    gradient: 'from-green-500 to-teal-500'
  }, {
    id: 'Q3',
    title: 'Shopping Goal',
    description: 'Implement strategic shopping habits to cut unnecessary expenses and find better deals.',
    progress: '8% savings target',
    icon: ShoppingCart,
    gradient: 'from-blue-500 to-cyan-500'
  }, {
    id: 'Q4',
    title: 'Automotive Part 1',
    description: 'Optimize vehicle expenses including gas, maintenance, and insurance costs.',
    progress: '20% gas savings goal',
    icon: DollarSign,
    gradient: 'from-orange-500 to-red-500'
  }];
  const year2Goals = [{
    id: 'Q5',
    title: 'Automotive Part 2',
    description: 'Advanced vehicle cost optimization and exploring alternative transportation options.',
    progress: 'Advanced savings phase',
    icon: DollarSign,
    gradient: 'from-indigo-500 to-purple-500'
  }, {
    id: 'Q6',
    title: 'Housing 20%',
    description: 'Achieve 20% savings on housing costs through optimization and smart investments.',
    progress: 'ROI improvement target',
    icon: Home,
    gradient: 'from-emerald-500 to-green-500'
  }, {
    id: 'Q7',
    title: 'Wealth Creation Step 1',
    description: 'Begin building long-term wealth through strategic investments and savings.',
    progress: 'Foundation building',
    icon: PiggyBank,
    gradient: 'from-yellow-500 to-orange-500'
  }, {
    id: 'Q8',
    title: 'Profit Share & Investment Stage 1',
    description: 'Start generating passive income through profit sharing and investment opportunities.',
    progress: 'Investment phase active',
    icon: Briefcase,
    gradient: 'from-rose-500 to-pink-500'
  }];
  const currentGoals = selectedYear === 1 ? year1Goals : year2Goals;

  // Step 0: Initial intro content
  if (currentStep === 0) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 px-0">
        <div className="container mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-6">Your Tribe Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Turn Everyday Spending Into Cashflow Value</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Over 85% of your lifetime expenses fall into 5 categories:
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
                    <Utensils className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">Food</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Online Shopping</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                    <Car className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Auto</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg">
                    <Home className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Home</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <Package className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Essentials</span>
                  </div>
                </div>

                <p className="text-xl font-semibold text-blue-600 mb-6">
                  BucksUp App - Flips costs into recurring revenue
                </p>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Target className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-green-600">Your First Goal:</h3>
                  </div>
                  <h4 className="text-lg font-semibold mb-3">Start With Online Shopping:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Use your BucksUp every time you shop on Amazon and other partnered online stores.
                    Every dollar you spend builds cashback-based assets to create value that grows month over month.
                  </p>
                </div>

                <Button onClick={() => setCurrentStep(1)} className="gradient-tribe text-white px-8 py-3 text-lg">
                  What's Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>;
  }

  // Step 1: What's Next content
  if (currentStep === 1) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 px-0">
          <div className="container mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center mb-6">Your Tribe Goals</CardTitle>
                <div className="flex justify-center mb-4">
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
                    onClick={() => setShowVideoDialog(true)}
                  >
                    <Play className="w-4 h-4" />
                    Watch Video
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Wrench className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-blue-600">What Comes Next?</h2>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6">Once online shopping value credits get started, other wealth creation options will start becoming available. New programs and benefits with a focus on helping offset other life expenses:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-700">Food & Grocery</h4>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700">Car, Gas & Insurance</h4>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700">Utilities, Rent, or Mortgage</h4>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-700">Insurance & Other Essentials</h4>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 mb-6">Each new goal is a step closer to recurring revenue. New capital to grow household income overtime to matches and then beat the rising real-world expenses, projected for the future.</p>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Rocket className="w-6 h-6 text-orange-600" />
                      <h3 className="text-xl font-bold text-orange-600">Coming Soon: Payoff Programs</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">Use BucksUp regularly and new programs will appear specifically designed to focus on paying car or home payments faster with smart strategies tied to your goals progress.</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-green-600">Want to See a Sample Plan?</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Click here to explore example goals by quarter.
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      Your future is funded by your own spending.
                    </p>
                    <p className="text-gray-700">Start with a simple click, begin leveraging your online spend — and let your dollars build your better financial tomorrow. A much better result than compared to the old way, where every click & purchase makes money for someone else, focused local hard earned income some place other than local where overtime can .</p>
                  </div>

                  <Button onClick={() => setCurrentStep(2)} className="gradient-prosperity text-white px-8 py-3 text-lg">
                    See Demo Goals
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Dialog */}
        <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
          <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
            <DialogHeader className="p-4 pb-0">
              <div className="flex items-center justify-between">
                <DialogTitle>BucksUp Goals Overview</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVideoDialog(false)}
                  className="h-6 w-6 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="flex-1 p-4 pt-0">
              <iframe
                src="https://www.youtube.com/embed/5Ag7X-FwzR8?rel=0"
                title="BucksUp Goals Overview"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Step 2: Original demo goals content
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 px-0">
      <div className="container mx-auto">
        {/* Current Years Goals Parent Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">Current Years Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Year Selection Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              <Button variant={selectedYear === 1 ? "default" : "outline"} onClick={() => setSelectedYear(1)} className={`px-6 py-2 ${selectedYear === 1 ? 'bg-blue-600 text-white' : ''}`}>
                Year 1
              </Button>
              <Button variant={selectedYear === 2 ? "default" : "outline"} onClick={() => setSelectedYear(2)} className={`px-6 py-2 ${selectedYear === 2 ? 'bg-blue-600 text-white' : ''}`}>
                Year 2
              </Button>
            </div>

            {/* Goal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentGoals.map(goal => {
              const IconComponent = goal.icon;
              return <Card key={goal.id} className={`bg-gradient-to-br ${goal.gradient} text-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-lg">Goal: {goal.id}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-bold text-xl mb-3">{goal.title}</h3>
                      <p className="text-white/90 mb-4 leading-relaxed">
                        {goal.description}
                      </p>
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="font-semibold text-white">
                          {goal.progress}
                        </p>
                      </div>
                    </CardContent>
                  </Card>;
            })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};

export default Icon_Goals;

