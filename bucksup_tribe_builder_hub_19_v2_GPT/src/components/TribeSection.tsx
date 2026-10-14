
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Users, Star, TrendingUp, ChevronDown, Plus, Calculator, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const TribeSection = () => {
  const [isEstimatesOpen, setIsEstimatesOpen] = useState(false);
  const [roundUpEnabled, setRoundUpEnabled] = useState(false);

  // Calculation variables
  const averageTribeSpend = 4000; // (AVTS)
  const tribesTier1 = 25;
  const aveTribeMembers = 15; // (ATM)

  // Calculated variables - now affected by roundUpEnabled
  const baseTribe1Members = aveTribeMembers * tribesTier1; // (T1M)
  const baseTribe2Members = baseTribe1Members * 0.8 * 15; // (T2M) - Fixed calculation: 80% of T1M × 15
  
  // Apply rounding if enabled
  const tribe1Members = roundUpEnabled ? Math.round(baseTribe1Members) : baseTribe1Members;
  const tribe2Members = roundUpEnabled ? Math.round(baseTribe2Members) : baseTribe2Members;

  // Indexes - now affected by roundUpEnabled
  const baseT1mIndex = 2.2 * (averageTribeSpend / 1000);
  const baseT2mIndex = 1.1 * (averageTribeSpend / 1000);
  
  const t1mIndex = roundUpEnabled ? Math.round(baseT1mIndex) : baseT1mIndex;
  const t2mIndex = roundUpEnabled ? Math.round(baseT2mIndex) : baseT2mIndex;

  // Mock data for demonstration
  const tribeMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      level: "Level 2",
      role: "Team Founder",
      status: "Active",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Mike Chen",
      level: "Level 1", 
      role: "Team Member",
      status: "New",
      avatar: "MC"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      level: "Level 3",
      role: "Team Member", 
      status: "Active",
      avatar: "LR"
    },
    {
      id: 4,
      name: "David Kim",
      level: "Level 1",
      role: "Team Member",
      status: "Active", 
      avatar: "DK"
    },
    {
      id: 5,
      name: "Emma Wilson",
      level: "Level 2",
      role: "Team Member",
      status: "New",
      avatar: "EW"
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    return role === "Team Founder" ? "gradient-tribe" : "gradient-prosperity";
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === "Active" ? "default" : "secondary";
  };

  return (
    <div className="space-y-8">
      {/* Estimates Collapsible Card */}
      <Collapsible open={isEstimatesOpen} onOpenChange={setIsEstimatesOpen}>
        <Card className="border shadow-lg">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <div className="flex flex-col">
                    <span>Estimates</span>
                    <span className="text-sm font-normal text-gray-600">(For Tribe Calculator)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://bucksupcalculator.my.canva.site/dagok7mz4oe', '_blank');
                    }}
                    className="gradient-tribe"
                  >
                    See Calc
                  </Button>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isEstimatesOpen ? 'rotate-180' : ''}`} />
                </div>
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {/* Base Variables Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">(AVTS) Average Tribe Spend</div>
                  <div className="text-2xl font-bold text-blue-600">${averageTribeSpend.toLocaleString()}</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Tribes Tier 1</div>
                  <div className="text-2xl font-bold text-green-600">{tribesTier1}</div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">(ATM) Ave. Tribe Members</div>
                  <div className="text-2xl font-bold text-purple-600">{aveTribeMembers}</div>
                </div>
              </div>

              {/* Round Up Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">Round Up</div>
                    <div className="text-sm text-gray-600">Round calculated values to whole numbers</div>
                  </div>
                  {roundUpEnabled && (
                    <div className="text-red-600 text-sm font-medium">
                      Grows Tribe Rev. By 30%
                    </div>
                  )}
                </div>
                <Switch
                  checked={roundUpEnabled}
                  onCheckedChange={setRoundUpEnabled}
                />
              </div>

              {/* Calculated Variables Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Calculated Variables</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">(T1M) Tribe 1 Members</div>
                    <div className="text-xl font-bold text-orange-600">{tribe1Members.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">(T2M) Tribe2 Members</div>
                    <div className="text-xl font-bold text-red-600">{tribe2Members.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Indexes Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Indexes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">T1M Index</div>
                      <div className="text-xl font-bold text-indigo-600">
                        {t1mIndex.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">T2M Index</div>
                      <div className="text-xl font-bold text-cyan-600">
                        {t2mIndex.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* My Tribe Expandable Parent Card */}
      <Card className="border shadow-lg bg-slate-100">
        <Accordion type="single" collapsible>
          <AccordionItem value="tribe-members" className="border-none">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold">My Tribe</h2>
                </div>
                <Link to="/join-my-tribe" className="mr-4">
                  <Button 
                    size="sm" 
                    className="gradient-tribe rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Members
                  </Button>
                </Link>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tribeMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{member.name}</h3>
                          <p className="text-xs text-muted-foreground">{member.level}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <Badge variant={getStatusBadgeVariant(member.status)} className="text-xs">
                          {member.status}
                        </Badge>
                        
                        <Badge className={`${getRoleBadgeColor(member.role)} text-xs`}>
                          {member.role === "Team Founder" && <Crown className="w-3 h-3 mr-1" />}
                          {member.role}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">New Members This Month</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Retention Rate</span>
                <span className="font-semibold text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Avg. Member Level</span>
                <span className="font-semibold">1.8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Team Score</span>
                <span className="font-semibold">8.9/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Rate</span>
                <span className="font-semibold text-green-600">80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Growth</span>
                <span className="font-semibold text-blue-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TribeSection;

