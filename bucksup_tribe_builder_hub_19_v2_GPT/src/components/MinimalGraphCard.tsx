import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface MinimalGraphCardProps {
  startingTribes: number[];
}

const MinimalGraphCard = ({ startingTribes }: MinimalGraphCardProps) => {
  const isMobile = useIsMobile();
  
  // Get indexes from estimates (matching BarGraphCard calculations)
  const averageTribeSpend = 4000; // (AVTS)
  const t1mIndex = 2.2 * (averageTribeSpend / 1000);
  const t2mIndex = 1.1 * (averageTribeSpend / 1000);

  // Calculate tribe revenue for each bar
  const calculateTribeRevenue = (tribes: number) => {
    const t1m = tribes * 15; // Tier 1 Members
    const t2Tribes = t1m * 0.8; // 80% of T1M for Tier 2 tribes
    const t2m = t2Tribes * 15; // Tier 2 Members
    
    const tribe1Rev = t1m * t1mIndex;
    const tribe2Rev = t2m * t2mIndex;
    
    return Math.round(tribe1Rev + tribe2Rev);
  };

  // Data for the chart with yearly spend values
  const yearlySpendValues = [4000, 8000, 16000, 24000, 45000];
  
  // Gradient colors for each bar
  const gradientColors = [
    'url(#gradient1)',
    'url(#gradient2)',
    'url(#gradient3)',
    'url(#gradient4)',
    'url(#gradient5)'
  ];

  const data = yearlySpendValues.map((spend, index) => {
    const tribesForBar = startingTribes[0] + (index * 5); // Increment tribes for each bar
    const tribeRevenue = calculateTribeRevenue(tribesForBar);
    
    return {
      spend: `$${(spend / 1000).toFixed(0)}k`,
      spendValue: spend,
      tribes: tribesForBar,
      tribeRevenue: tribeRevenue,
      percentOfTotal: ((spend / 150000) * 100).toFixed(1),
      color: gradientColors[index]
    };
  });

  // Calculate proportional heights
  const minValue = Math.min(...data.map(d => d.tribes));
  const maxValue = Math.max(...data.map(d => d.tribes));
  const range = maxValue - minValue;
  const minHeight = 20; // 20% for smallest bar
  const maxHeight = 80; // Maximum height for largest bar

  const dataWithHeights = data.map(item => ({
    ...item,
    displayValue: minHeight + ((item.tribes - minValue) / range) * (maxHeight - minHeight)
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black text-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{`Yearly Spend: ${label}`}</p>
          <p className="text-sm">{`Tribes: ${data.tribes}`}</p>
          <p className="text-sm">{`Revenue: $${data.tribeRevenue.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Growth Trend</CardTitle>
      </CardHeader>
      <CardContent className={`${isMobile ? 'px-2' : 'px-4'}`}>
        <div className="h-84 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataWithHeights} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="gradient5" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="spend" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                interval={0}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="displayValue" 
                radius={[4, 4, 0, 0]}
              >
                {dataWithHeights.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Revenue text overlays - moved left by 50% of one bar width */}
          <div className="absolute inset-0 pointer-events-none">
            {dataWithHeights.map((entry, index) => (
              <div
                key={index}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${(index * 20) + 10 - 10}%`, // Moved left by 10% (50% of 20% bar width)
                  top: '20%',
                  width: '20%',
                  height: '60%',
                }}
              >
                <span 
                  className="text-white font-bold text-xs transform -rotate-90 whitespace-nowrap"
                  style={{ 
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    fontSize: isMobile ? '10px' : '12px'
                  }}
                >
                  ${entry.tribeRevenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinimalGraphCard;

