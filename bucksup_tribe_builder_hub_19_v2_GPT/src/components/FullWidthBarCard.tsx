import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, ResponsiveContainer, Cell, Tooltip, XAxis } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import TribeSliderCard from '@/components/TribeSliderCard';

interface FullWidthBarCardProps {
  startingTribes: number[];
  onStartingTribesChange: (value: number[]) => void;
}

const FullWidthBarCard = ({ startingTribes, onStartingTribesChange }: FullWidthBarCardProps) => {
  const isMobile = useIsMobile();
  const [selectedYear, setSelectedYear] = useState(1);
  
  // Calculate tribe revenue for each bar based on yearly spend
  const calculateTribeRevenue = (tribes: number, yearlySpend: number) => {
    // Calculate T1M and T2M indexes based on the yearly spend for this specific bar
    const t1mIndex = 2.2 * (yearlySpend / 1000);
    const t2mIndex = 1.1 * (yearlySpend / 1000);
    
    const t1m = tribes * 15; // Tier 1 Members
    const t2Tribes = t1m * 0.8; // 80% of T1M for Tier 2 tribes
    const t2m = t2Tribes * 15; // Tier 2 Members
    
    const tribe1Rev = t1m * t1mIndex;
    const tribe2Rev = t2m * t2mIndex;
    
    return Math.round(tribe1Rev + tribe2Rev);
  };

  // Year 1 data (first 4 bars) - Updated values
  const year1SpendValues = [4000, 6000, 8000, 10000];
  
  // Year 2 data (bar 5 + 3 others: bars 6, 7, 8) - Updated values
  const year2SpendValues = [12000, 16000, 20000, 25000];
  
  // Gradient colors for each bar
  const gradientColors = [
    'url(#gradient1)',
    'url(#gradient2)',
    'url(#gradient3)',
    'url(#gradient4)',
    'url(#gradient5)',
    'url(#gradient6)',
    'url(#gradient7)',
    'url(#gradient8)'
  ];

  const getChartData = () => {
    if (selectedYear === 1) {
      return year1SpendValues.map((spend, index) => {
        const tribesForBar = startingTribes[0] + (index * 5); // Increment tribes for each bar
        const tribeRevenue = calculateTribeRevenue(tribesForBar, spend);
        const percentOfSpend = ((spend / 150000) * 100).toFixed(1);
        
        return {
          spend: `$${(spend / 1000).toFixed(0)}k`,
          spendValue: spend,
          tribes: tribesForBar,
          tribeRevenue: tribeRevenue,
          percentOfTotal: ((spend / 150000) * 100).toFixed(1),
          percentOfSpend: percentOfSpend,
          color: gradientColors[index]
        };
      });
    } else {
      // Year 2: bars 5, 6, 7, 8 (add 10 tribes from bar 4 to 5, then continue incrementing)
      const bar4Tribes = startingTribes[0] + (3 * 5); // Bar 4 tribes
      return year2SpendValues.map((spend, index) => {
        const tribesForBar = bar4Tribes + 10 + (index * 5); // Start from bar 4 + 10, then increment
        const tribeRevenue = calculateTribeRevenue(tribesForBar, spend);
        const percentOfSpend = ((spend / 150000) * 100).toFixed(1);
        
        return {
          spend: `$${(spend / 1000).toFixed(0)}k`,
          spendValue: spend,
          tribes: tribesForBar,
          tribeRevenue: tribeRevenue,
          percentOfTotal: ((spend / 150000) * 100).toFixed(1),
          percentOfSpend: percentOfSpend,
          color: gradientColors[4 + index] // Use colors 5-8
        };
      });
    }
  };

  const data = getChartData();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black text-white p-3 rounded-lg shadow-lg border z-50" style={{ zIndex: 1000 }}>
          <p className="font-semibold">{`Yearly Spend: ${label}`}</p>
          <p className="text-sm">{`Tribes: ${data.tribes}`}</p>
          <p className="text-sm">{`Yearly Rev: $${data.tribeRevenue.toLocaleString()}`}</p>
          <p className="text-sm">{`Percent of Yr. Spend: ${data.percentOfSpend}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate font size with 20% increase for mobile
  const baseFontSize = isMobile ? 10 : 12;
  const tickFontSize = Math.round(baseFontSize * 1.3);
  const revenueFontSize = Math.round(baseFontSize * (isMobile ? 1.5 : 1.3)); // 20% bigger for mobile

  return (
    <Card className="border shadow-lg bg-slate-100">
      <CardHeader>
        <CardTitle className="text-center">
          Yr.{selectedYear} Tribe Revenue Goals
        </CardTitle>
        <div className="flex justify-center gap-2 mt-2">
          <Button
            onClick={() => setSelectedYear(1)}
            variant={selectedYear === 1 ? "default" : "outline"}
            size="sm"
            className="px-4 py-1"
          >
            Yr1 Goals
          </Button>
          <Button
            onClick={() => setSelectedYear(2)}
            variant={selectedYear === 2 ? "default" : "outline"}
            size="sm"
            className="px-4 py-1"
          >
            Yr2 Goals
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className={`${isMobile ? 'h-96' : 'h-72'} w-full relative`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 30 }}>
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
                <linearGradient id="gradient6" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0891B2" />
                </linearGradient>
                <linearGradient id="gradient7" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#84CC16" />
                  <stop offset="100%" stopColor="#65A30D" />
                </linearGradient>
                <linearGradient id="gradient8" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="spend" 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: tickFontSize,
                  fill: '#374151'
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="tribeRevenue" 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Revenue text overlays - different positioning for mobile vs desktop */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
            {data.map((entry, index) => (
              <div
                key={index}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${(index * (100 / data.length)) + (100 / data.length / 2) - 10}%`,
                  top: isMobile ? '60%' : '50%',
                  width: `${100 / data.length}%`,
                  height: isMobile ? '30%' : '40%',
                }}
              >
                <span 
                  className={`text-white font-bold text-xs whitespace-nowrap ${isMobile ? 'transform -rotate-90' : ''}`}
                  style={{ 
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    fontSize: revenueFontSize
                  }}
                >
                  ${entry.tribeRevenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* TribeSliderCard as child component */}
        <div className="px-6">
          <TribeSliderCard 
            startingTribes={startingTribes}
            onStartingTribesChange={onStartingTribesChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FullWidthBarCard;

