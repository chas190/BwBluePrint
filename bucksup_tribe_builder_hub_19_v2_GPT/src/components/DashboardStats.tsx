
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Users, Circle } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Rank Progress',
      value: '78%',
      subtitle: 'To Team Founder',
      icon: Circle,
      gradient: 'gradient-main',
      change: '+15% this month'
    },
    {
      title: 'My Tribe Size',
      value: '47',
      subtitle: 'Active Members',
      icon: Users,
      gradient: 'gradient-tribe',
      change: '+12 this month'
    },
    {
      title: 'Monthly Savings',
      value: '$1,234',
      subtitle: 'Through Deals',
      icon: Circle,
      gradient: 'gradient-prosperity',
      change: '+23% from last month'
    },
    {
      title: 'Team Earnings',
      value: '$892',
      subtitle: 'Commission',
      icon: Circle,
      gradient: 'gradient-wealth',
      change: '+$156 this week'
    }
  ];

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">
        Example: Tribe Dashboard Details
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg">
            <div className={`absolute top-0 left-0 w-full h-1 ${stat.gradient}`}></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                {stat.title}
                <stat.icon className="w-4 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground mb-2">{stat.subtitle}</p>
              <p className="text-xs text-prosperity-600 font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;

