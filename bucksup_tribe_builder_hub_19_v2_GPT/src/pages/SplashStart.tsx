
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SplashStart = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/main');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto text-center space-y-8">
        {/* Logo/Brand Section */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">
            BucksUp<span className="text-blue-600">Tribe</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the ultimate community where earning, sharing, and growing together creates lasting success
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Your Tribe</h3>
              <p className="text-gray-600">Connect with like-minded individuals and grow together</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Together</h3>
              <p className="text-gray-600">Discover opportunities and maximize your earning potential</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Level Up</h3>
              <p className="text-gray-600">Unlock exclusive benefits and reach new heights</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={handleSignIn}
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 mt-12">
          Welcome to the future of collaborative success
        </div>
      </div>
    </div>
  );
};

export default SplashStart;

