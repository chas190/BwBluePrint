import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, DollarSign, Users, Send } from 'lucide-react';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('messages');

  // Sample messages data
  const messages = [
    { id: 1, sender: 'John Smith', message: 'Hey! Are you interested in that new restaurant deal?', time: '2 min ago', unread: true },
    { id: 2, sender: 'Sarah Johnson', message: 'Thanks for sharing the grocery store coupon!', time: '5 min ago', unread: true },
    { id: 3, sender: 'Mike Chen', message: 'The electronics deal you posted saved me $200!', time: '15 min ago', unread: false },
    { id: 4, sender: 'Lisa Wong', message: 'Can you share more details about the gym membership?', time: '1 hour ago', unread: true },
    { id: 5, sender: 'David Brown', message: 'Your tribe is growing fast! Congratulations!', time: '2 hours ago', unread: false },
    { id: 6, sender: 'Emma Davis', message: 'I just joined your tribe through your referral link', time: '3 hours ago', unread: false },
    { id: 7, sender: 'Alex Wilson', message: 'The cashback from last month was amazing!', time: '4 hours ago', unread: false },
    { id: 8, sender: 'Maria Garcia', message: 'Question about the travel deals you mentioned', time: '5 hours ago', unread: true },
    { id: 9, sender: 'Tom Anderson', message: 'Thanks for inviting me to BucksUp Tribe!', time: '6 hours ago', unread: false },
    { id: 10, sender: 'Jennifer Lee', message: 'Your deal recommendations are always spot on', time: '8 hours ago', unread: false },
    { id: 11, sender: 'Robert Kim', message: 'Can we schedule a call about partnership opportunities?', time: '12 hours ago', unread: false },
    { id: 12, sender: 'Amanda Taylor', message: 'The home improvement deals were perfect timing!', time: '1 day ago', unread: false },
    { id: 13, sender: 'Chris Martinez', message: 'Your tribe benefits exceeded my expectations', time: '1 day ago', unread: false },
    { id: 14, sender: 'Nicole White', message: 'Looking forward to more exclusive deals!', time: '2 days ago', unread: false },
  ];

  // Sample opportunities data
  const opportunities = [
    { id: 1, title: 'Restaurant Partnership - 25% Commission', company: 'Golden Spoon Bistro', value: '$500-2000/month', status: 'new' },
    { id: 2, title: 'Fitness Center Referral Program', company: 'PowerFit Gym', value: '$50 per referral', status: 'pending' },
    { id: 3, title: 'Electronics Store Affiliate', company: 'TechMart', value: '8% commission', status: 'active' },
    { id: 4, title: 'Grocery Chain Partnership', company: 'FreshMart', value: '$1000 signing bonus', status: 'new' },
    { id: 5, title: 'Travel Agency Collaboration', company: 'Wanderlust Travel', value: '12% on bookings', status: 'pending' },
    { id: 6, title: 'Fashion Brand Ambassador', company: 'StyleHub', value: '$300/post', status: 'active' },
    { id: 7, title: 'Home Improvement Deals', company: 'BuildRight', value: '15% commission', status: 'new' },
    { id: 8, title: 'Beauty Products Partnership', company: 'GlowUp Cosmetics', value: '$25 per sale', status: 'pending' },
    { id: 9, title: 'Automotive Service Referrals', company: 'QuickFix Auto', value: '$75 per referral', status: 'active' },
    { id: 10, title: 'Streaming Service Promotion', company: 'StreamMax', value: '$10 per signup', status: 'new' },
    { id: 11, title: 'Insurance Partnership', company: 'SecureLife', value: '$200 per policy', status: 'pending' },
    { id: 12, title: 'Pet Store Collaboration', company: 'PawPals', value: '10% commission', status: 'active' },
    { id: 13, title: 'Book Store Affiliate Program', company: 'ReadMore Books', value: '5% commission', status: 'new' },
    { id: 14, title: 'Coffee Shop Partnership', company: 'BrewMasters', value: '$2 per referral', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-orange-50">
      <Navigation />
      
      <main className="pt-20 md:pt-24 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Messages & Opportunities
              </h1>
              <p className="text-muted-foreground">
                Stay connected with your tribe and explore new opportunities
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="messages" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Messages
                  <Badge variant="destructive" className="ml-1">4</Badge>
                </TabsTrigger>
                <TabsTrigger value="opportunities" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Opps
                  <Badge variant="secondary" className="ml-1">14</Badge>
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="messages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Recent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{msg.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm text-gray-900">{msg.sender}</p>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                            {msg.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="opportunities" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Business Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {opportunities.map((opp) => (
                      <div key={opp.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{opp.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{opp.company}</p>
                            <p className="text-sm font-medium text-green-600">{opp.value}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(opp.status)}>
                              {opp.status.charAt(0).toUpperCase() + opp.status.slice(1)}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="space-y-4">
                <Card className="h-96">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Tribe Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            <p className="text-sm">Welcome everyone to the BucksUp Tribe chat!</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 justify-end">
                          <div className="bg-blue-500 text-white p-2 rounded-lg shadow-sm">
                            <p className="text-sm">Excited to be part of this community!</p>
                          </div>
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex items-start gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>MW</AvatarFallback>
                          </Avatar>
                          <div className="bg-white p-2 rounded-lg shadow-sm">
                            <p className="text-sm">Looking forward to sharing great deals with everyone!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;

