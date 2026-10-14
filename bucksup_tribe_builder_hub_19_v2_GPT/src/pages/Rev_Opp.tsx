
import Navigation from '@/components/Navigation';
import BucksUpMemberCard from '@/components/BucksUpMemberCard';
import ReadyToLevelUp from '@/components/ReadyToLevelUp';
import { Card, CardContent } from '@/components/ui/card';

const Rev_Opp = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 space-y-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Revenue Opportunities</h1>
          
          {/* BucksUp Member Card Section */}
          <section className="mb-12">
            <BucksUpMemberCard />
          </section>

          {/* Ready to Level Up Section */}
          <section>
            <Card className="w-[90%] mx-auto overflow-hidden">
              <CardContent className="p-0">
                <ReadyToLevelUp />
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="pb-12" />
      </main>
    </div>
  );
};

export default Rev_Opp;

