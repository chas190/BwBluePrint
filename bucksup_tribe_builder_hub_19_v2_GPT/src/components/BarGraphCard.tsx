import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface BarGraphCardProps {
  startingTribes: number[];
}

const BarGraphCard = ({ startingTribes }: BarGraphCardProps) => {
  const isMobile = useIsMobile();
  
  // Get indexes from estimates (matching TribeSection calculations)
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

  // Data for the chart with new yearly spend values
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

  const chartConfig = {
    tribes: {
      label: "Tribes",
      color: "hsl(var(--chart-1))",
    },
  };

  // Calculate Y-axis domains
  const maxTribes = Math.max(...data.map(d => d.tribes));
  const maxRevenue = Math.max(...data.map(d => d.tribeRevenue));
  const yAxisMaxTribes = Math.ceil(maxTribes * 1.2 / 10) * 10;
  const yAxisMaxRevenue = Math.ceil(maxRevenue * 1.2 / 1000) * 1000;

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{`Yearly Spend: $${data.spendValue.toLocaleString()}`}</p>
          <p className="text-blue-600">{`Tribes: ${data.tribes}`}</p>
          <p className="text-green-600">{`Tribe Revenue: $${data.tribeRevenue.toLocaleString()}`}</p>
          <p className="text-purple-600">{`Percent of Total: ${data.percentOfTotal}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom label component for revenue text on bars
  const CustomLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const revenue = data.find(d => d.tribes === value)?.tribeRevenue || 0;
    
    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={isMobile ? "12" : "14"}
        fontWeight="bold"
        transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`}
      >
        ${revenue.toLocaleString()}
      </text>
    );
  };

  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Tier 1 Tribes vs Yearly Spend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className={`${isMobile ? 'h-[46.8rem]' : 'h-80'} ${isMobile ? 'px-1' : 'px-4'}`}>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data} 
                margin={{ 
                  top: isMobile ? 50 : 20, 
                  right: isMobile ? 20 : 60, 
                  left: isMobile ? 20 : 60, 
                  bottom: isMobile ? 20 : 60 
                }}
              >
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
                <YAxis 
                  yAxisId="revenue"
                  domain={[0, yAxisMaxRevenue]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  tickCount={8}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  label={{ 
                    value: isMobile ? 'Rev.' : 'Tribe Revenue', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: isMobile ? -10 : 0,
                    style: { 
                      textAnchor: 'start', 
                      transform: `translateY(20%) rotate(-90deg)`,
                      transformOrigin: 'center'
                    }
                  }}
                />
                <YAxis 
                  yAxisId="tribes"
                  orientation="right"
                  domain={[0, yAxisMaxTribes]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  tickCount={8}
                  label={{ 
                    value: 'Tribes', 
                    angle: -90, 
                    position: 'insideRight',
                    offset: isMobile ? -10 : 0,
                    style: { 
                      textAnchor: 'end', 
                      transform: `translateY(20%) rotate(-90deg)`,
                      transformOrigin: 'center'
                    }
                  }}
                />
                <ChartTooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                />
                <Bar 
                  yAxisId="tribes"
                  dataKey="tribes" 
                  radius={[4, 4, 0, 0]}
                  name="Number of Tribes"
                  label={<CustomLabel />}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Revenue calculation info */}
        <div className="text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">Tribe Revenue Calculation</p>
          <p>T1M Index: {t1mIndex.toFixed(1)} | T2M Index: {t2mIndex.toFixed(1)}</p>
          <p className="text-xs mt-1">Revenue = (Tribes × 15 × T1M Index) + (Tribes × 15 × 0.8 × 15 × T2M Index)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarGraphCard;

