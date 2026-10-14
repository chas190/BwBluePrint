
import { Card, CardContent } from "@/components/ui/card";

interface GreetingCardsProps {
  showBlueCard: boolean;
  showTopSpacerCard: boolean;
  greenCardColor: boolean;
}

const GreetingCards = ({ showBlueCard, showTopSpacerCard, greenCardColor }: GreetingCardsProps) => {
  return (
    <>
      {/* Green Card Section with ~ title */}
      <div className="w-full px-0 my-0">
        <div className="w-[94vw] mx-auto">
          <Card className={`w-full ${greenCardColor ? 'bg-gradient-to-br from-green-500 to-green-700' : 'bg-white bg-opacity-0'} border-0 shadow-lg`}>
            <CardContent className="p-3 py-0 px-0">
              <div className="p-30 px-[14px] py-0">
                <h1 className={`text-xl font-semibold my-0 py-[10px] ${greenCardColor ? 'text-white' : 'text-transparent'}`}>~</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Yellow Card Section with topspacer title - Conditionally rendered */}
      {showTopSpacerCard && (
        <div className="w-full mb-[5px] px-0 my-[4px]">
          <div className="w-[94vw] mx-auto">
            <Card className="w-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-0 shadow-lg">
              <CardContent className="p-3 py-0 px-0">
                <div className="p-30 py-[7px] px-[14px]">
                  <h1 className="text-white text-xl font-semibold">topspacer</h1>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* New Blue Gradient Card with Greeting - Conditionally rendered */}
      {showBlueCard && (
        <div className="w-full mb-[5px] px-0 my-[4px]">
          <div className="w-[94vw] mx-auto">
            <Card className="w-full bg-gradient-to-br from-blue-600 to-blue-800 border-0 shadow-lg">
              <CardContent className="p-3 py-0 px-0">
                <div className="p-30 py-[7px] px-[14px]">
                  <p className="text-white text-sm mb-1">Good morning! Amigo</p>
                  <h1 className="text-white text-xl font-semibold">Welcome back</h1>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default GreetingCards;

