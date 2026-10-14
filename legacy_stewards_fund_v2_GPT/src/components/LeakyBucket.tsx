import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingDown, DollarSign, ArrowRight } from "lucide-react";

const LeakyBucket = () => {
  return (
    <section id="problem" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-destructive/10 rounded-full mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            The <span className="text-destructive">Leaky Bucket</span> Problem
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every community loses 85-90% of its economic power through a phenomenon economists call "economic leakage." Your town is bleeding wealth—and most residents don't even know it's happening.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* The Problem Card */}
          <Card className="p-8 bg-destructive/5 border-2 border-destructive/20 shadow-elegant">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingDown className="w-8 h-8 text-destructive" />
              <h3 className="font-serif text-2xl font-bold text-foreground">How Money Leaves</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-destructive/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Shopping online</strong> instead of local stores drains millions annually
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-destructive/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Chain restaurants</strong> extract profits back to corporate headquarters
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-destructive/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Big box retailers</strong> replace local businesses, eliminating community ownership
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-destructive/20 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                </div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Remote services</strong> send your money to distant cities where it never returns
                </p>
              </div>
            </div>
          </Card>

          {/* The False Savings Card */}
          <Card className="p-8 bg-card border-border shadow-elegant">
            <div className="flex items-center space-x-3 mb-6">
              <DollarSign className="w-8 h-8 text-secondary" />
              <h3 className="font-serif text-2xl font-bold text-foreground">The $5 Mistake</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Saving $5 at a big box store feels smart—but it's costing your community millions. Here's why:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Money spent locally:</span>
                <span className="font-bold text-secondary text-lg">$100</span>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground mx-auto" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stays in community:</span>
                <span className="font-bold text-secondary text-lg">$68</span>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">vs. money spent at chains:</p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Stays in community:</span>
                  <span className="font-bold text-destructive text-lg">$43</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6 italic">
              Every dollar spent locally multiplies through your community 3-4 times before leaving. Chain store dollars? They leave immediately.
            </p>
          </Card>
        </div>

        {/* The Reality */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-accent/5 border-2 border-accent/20">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4 text-center">
              The Devastating Reality
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-destructive mb-2">85-90%</div>
                <div className="text-sm text-muted-foreground">Economic Leakage Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-destructive mb-2">$Millions</div>
                <div className="text-sm text-muted-foreground">Lost Annually Per Town</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-destructive mb-2">45 Years</div>
                <div className="text-sm text-muted-foreground">Of Wealth Erosion</div>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6 leading-relaxed">
              But here's the extraordinary part: <strong className="text-foreground">this is completely fixable</strong>. Not through government programs or massive investments—but through leadership and community awareness.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeakyBucket;
