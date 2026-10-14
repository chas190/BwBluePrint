import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader } from '@/components/ui/drawer';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Search, User, Bell, Plus, Calculator, Tractor, X, CreditCard, ChevronDown, Home, BarChart, Eye, EyeOff, Store, Zap, Award, Settings } from 'lucide-react';
import BucksUpMemberCard from '@/components/BucksUpMemberCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isDealsPopupOpen, setIsDealsPopupOpen] = useState(false);
  const [isCalcDrawerOpen, setIsCalcDrawerOpen] = useState(false);
  const [isFarmsDrawerOpen, setIsFarmsDrawerOpen] = useState(false);
  const [isEstimatesOpen, setIsEstimatesOpen] = useState(false);
  const [isCorpOpen, setIsCorpOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  const [isMessageCenterPopupOpen, setIsMessageCenterPopupOpen] = useState(false);
  const [isMessageCenterOpenPopupOpen, setIsMessageCenterOpenPopupOpen] = useState(false);
  const [isLoginRequiredPopupOpen, setIsLoginRequiredPopupOpen] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roundUpEnabled, setRoundUpEnabled] = useState(false);
  
  // Dev settings state
  const [showMyTribeCalc, setShowMyTribeCalc] = useState(false);

  // Load dev settings from localStorage
  useEffect(() => {
    const savedMyTribeCalc = localStorage.getItem('devSettings_showMyTribeCalc');
    if (savedMyTribeCalc !== null) {
      setShowMyTribeCalc(JSON.parse(savedMyTribeCalc));
    }
  }, []);

  // Calculation variables
  const averageTribeSpend = 4000; // (AVTS)
  const tribesTier1 = 25;
  const aveTribeMembers = 15; // (ATM)

  // Calculated variables
  const tribe1Members = aveTribeMembers * tribesTier1; // (T1M)
  const tribe2Members = tribe1Members; // (T2M)

  // Indexes
  const t1mIndex = 2.2 * (averageTribeSpend / 1000);
  const t2mIndex = 1.1 * (averageTribeSpend / 1000);

  // Info cards data for My Tribe Calculator
  const infoCards = [
    {
      icon: Zap,
      title: "Lightning Fast Growth",
      description: "Watch your tribe and earnings grow exponentially with our proven system"
    },
    {
      icon: Award,
      title: "Premium Rewards",
      description: "Unlock exclusive benefits and bonuses as you reach new milestones"
    }
  ];
  const menuItems = [
    { icon: Home, label: 'Main', href: '/main' },
    { icon: Home, label: 'Main11', href: '/main11' }
  ];
  const corpSubItems = [
    { icon: Home, label: 'Main2', href: '/main2' },
    { icon: Home, label: 'Main 3', href: '/main3' },
    { icon: BarChart, label: 'Overview', href: '/overview' },
    { icon: Search, label: 'Local Deals', href: '#deals', isDeals: true },
    { icon: Users, label: 'My Tribe', href: '/my-tribe' },
    { icon: Plus, label: 'Invite', href: '#invite' },
    { icon: Calculator, label: 'My Tribe Calc', href: 'https://bucksupcalculator.my.canva.site/dagok7mz4oe', isCalc: true }
  ];
  const handleBucksUpClick = () => {
    // Navigate to home with state to indicate manual navigation
    navigate('/', {
      state: {
        manualNavigation: true
      }
    });
  };
  const handleBellClick = () => {
    // Check if user is logged in
    if (!isSignedIn) {
      setIsLoginRequiredPopupOpen(true);
      return;
    }

    // Check if we're on the messages page
    if (location.pathname === '/messages') {
      setIsMessageCenterOpenPopupOpen(true);
    } else {
      setIsMessageCenterPopupOpen(true);
    }
  };
  const handleShowSampleDemo = () => {
    setIsMessageCenterPopupOpen(false);
    navigate('/messages');
  };
  const handleNoThanks = () => {
    setIsMessageCenterPopupOpen(false);
  };
  const handleCloseMessageCenter = () => {
    setIsMessageCenterOpenPopupOpen(false);
    navigate('/');
  };
  const handleKeepMessageCenterOpen = () => {
    setIsMessageCenterOpenPopupOpen(false);
  };
  const handleLoginRequiredClose = () => {
    setIsLoginRequiredPopupOpen(false);
  };
  const handleDealsClick = () => {
    setIsDealsPopupOpen(true);
    setIsOpen(false);
  };
  const handleCalcClick = () => {
    setIsCalcDrawerOpen(true);
    setIsOpen(false);
  };
  const handleFarmsClick = () => {
    setIsFarmsDrawerOpen(true);
    setIsOpen(false);
  };
  const handleCorpClick = () => {
    if (!isCorpOpen) {
      setIsAdminDialogOpen(true);
    } else {
      setIsCorpOpen(false);
    }
  };
  const handleAdminNo = () => {
    setIsAdminDialogOpen(false);
    setShowPasswordField(false);
    setPassword('');
  };
  const handleAdminYes = () => {
    setShowPasswordField(true);
  };
  const handlePasswordSubmit = () => {
    setPassword('');
    window.alert('Private admin access requires secure server authorization and is unavailable in this public V2 copy.');
  };
  const renderMenuItem = (item: any, index: number, isSubItem = false) => {
    const className = `flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left ${isSubItem ? 'pl-8' : ''}`;
    if (item.isCalc) {
      return <button key={index} onClick={handleCalcClick} className={className}>
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>;
    }
    if (item.isFarms) {
      return <button key={index} onClick={handleFarmsClick} className={className}>
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>;
    }
    if (item.isDeals) {
      return <button key={index} onClick={handleDealsClick} className={className}>
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>;
    }
    if (item.href.startsWith('/')) {
      return <Link key={index} to={item.href} className={className} onClick={() => setIsOpen(false)}>
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>;
    }
    return <a key={index} href={item.href} className={className} onClick={() => setIsOpen(false)}>
        <item.icon className="w-5 h-5" />
        <span>{item.label}</span>
      </a>;
  };
  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4 py-[6px]">
          <button onClick={handleBucksUpClick} className="flex items-center space-x-2">
            <img src={`${import.meta.env.BASE_URL}phoneicon.jpg`} alt="BucksUp Icon" className="w-8 h-8 rounded-full object-cover" />
            <h1 className="text-xl font-bold text-gray-900">
              BucksUp
            </h1>
          </button>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative text-gray-700 hover:bg-gray-100" onClick={handleBellClick}>
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Auth Button for Mobile */}
            <SignedOut>
              <Link to="/auth">
                <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700" variant="default">
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }} />
            </SignedIn>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                  <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                    <div className="w-full h-0.5 bg-gray-700"></div>
                    <div className="w-full h-0.5 bg-gray-700"></div>
                    <div className="w-full h-0.5 bg-gray-700"></div>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <nav className="mt-8 space-y-2">
                  {/* Main */}
                  {menuItems.map((item, index) => renderMenuItem(item, index))}
                  
                  {/* Horizontal line */}
                  <hr className="my-4 border-gray-200" />
                  
                  {/* Memberships */}
                  <Link to="/membership" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                    <CreditCard className="w-5 h-5" />
                    <span>Memberships</span>
                  </Link>
                  
                  {/* Profile */}
                  <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  
                  {/* Space */}
                  <div className="h-4"></div>
                  
                  {/* Corp Section with Admin Access */}
                  <Collapsible open={isCorpOpen} onOpenChange={handleCorpClick}>
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors">
                        <span className="font-semibold">Corp</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isCorpOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                      {corpSubItems.map((item, index) => renderMenuItem(item, index, true))}
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* BW Farms */}
                  <button onClick={handleFarmsClick} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left">
                    <Tractor className="w-5 h-5" />
                    <span>BW Farms</span>
                  </button>

                  {/* App Dir */}
                  <Link to="/appdir" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                    <Home className="w-5 h-5" />
                    <span>App Dir</span>
                  </Link>

                  {/* Dev Dashboard */}
                  <Link to="/dev-dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                    <Settings className="w-5 h-5" />
                    <span>Dev Dashboard</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto py-[4px] px-[16px] my-0">
          <div className="flex items-center justify-between">
            <button onClick={handleBucksUpClick} className="flex items-center space-x-3">
              <img src={`${import.meta.env.BASE_URL}phoneicon.jpg`} alt="BucksUp Icon" className="w-10 h-10 rounded-full object-cover" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                BucksUp
              </h1>
            </button>
            
            <div className="flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                {/* Only show calculator icon on desktop if enabled */}
                {showMyTribeCalc && (
                  <button onClick={handleCalcClick} className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors">
                    <Calculator className="w-5 h-5" />
                    <span className="hidden lg:block">My Tribe Calc</span>
                  </button>
                )}
              </nav>
              
              <Button variant="ghost" size="sm" className="relative" onClick={handleBellClick}>
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Auth Button for Desktop */}
              <SignedOut>
                <Link to="/auth">
                  <Button className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }} />
              </SignedIn>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                      <div className="w-full h-0.5 bg-current"></div>
                      <div className="w-full h-0.5 bg-current"></div>
                      <div className="w-full h-0.5 bg-current"></div>
                    </div>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <nav className="mt-8 space-y-2">
                    {/* Main */}
                    {menuItems.map((item, index) => renderMenuItem(item, index))}
                    
                    {/* Horizontal line */}
                    <hr className="my-4 border-gray-200" />
                    
                    {/* Memberships */}
                    <Link to="/membership" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                      <CreditCard className="w-5 h-5" />
                      <span>Memberships</span>
                    </Link>
                    
                    {/* Profile */}
                    <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    
                    {/* Space */}
                    <div className="h-4"></div>
                    
                    {/* Corp Section with Admin Access */}
                    <Collapsible open={isCorpOpen} onOpenChange={handleCorpClick}>
                      <CollapsibleTrigger asChild>
                        <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors">
                          <span className="font-semibold">Corp</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isCorpOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1">
                        {corpSubItems.map((item, index) => renderMenuItem(item, index, true))}
                      </CollapsibleContent>
                    </Collapsible>
                    
                    {/* BW Farms */}
                    <button onClick={handleFarmsClick} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left">
                      <Tractor className="w-5 h-5" />
                      <span>BW Farms</span>
                    </button>

                    {/* App Dir */}
                    <Link to="/appdir" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                      <Home className="w-5 h-5" />
                      <span>App Dir</span>
                    </Link>

                    {/* Dev Dashboard */}
                    <Link to="/dev-dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
                      <Settings className="w-5 h-5" />
                      <span>Dev Dashboard</span>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Message Center Coming Soon Popup */}
      <Dialog open={isMessageCenterPopupOpen} onOpenChange={setIsMessageCenterPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Center Coming Soon</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-center">
              If you'd like to see a sample demo of this feature or some of the features on what it will look like, click "Ok, Show Sample Demo Data". If not, click "No Thanks" and return to the page.
            </p>
            <DialogFooter className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleNoThanks}>
                No Thanks
              </Button>
              <Button onClick={handleShowSampleDemo}>
                Ok, Show Sample Demo Data
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Center Currently Open Popup */}
      <Dialog open={isMessageCenterOpenPopupOpen} onOpenChange={setIsMessageCenterOpenPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Center</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-center">
              Message Center is currently open. Would you like to close it?
            </p>
            <DialogFooter className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleKeepMessageCenterOpen}>
                No Thanks
              </Button>
              <Button onClick={handleCloseMessageCenter}>
                Yes, Close It
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Access Dialog */}
      <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
          </DialogHeader>
          
          {!showPasswordField ? <div className="space-y-4">
              <p className="text-center">Do you have admin access?</p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={handleAdminNo}>
                  No
                </Button>
                <Button onClick={handleAdminYes}>
                  Yes
                </Button>
              </div>
            </div> : <div className="space-y-4">
              <p className="text-center">Private admin access is unavailable in this public V2 copy.</p>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} onKeyPress={e => {
              if (e.key === 'Enter') {
                handlePasswordSubmit();
              }
            }} className="pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleAdminNo}>
                  Cancel
                </Button>
                <Button onClick={handlePasswordSubmit}>
                  Submit
                </Button>
              </DialogFooter>
            </div>}
        </DialogContent>
      </Dialog>

      {/* My Tribe Calc Drawer */}
      <Drawer open={isCalcDrawerOpen} onOpenChange={setIsCalcDrawerOpen}>
        <DrawerContent className="h-[95vh] p-0">
          {/* Black Top Bar with Close Icon */}
          <div className="bg-black flex items-center justify-between p-2 shrink-0 -mt-7">
            <h2 className="text-white font-semibold">My Tribe Calculator</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsCalcDrawerOpen(false)} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex-1 w-full h-full overflow-auto bg-white p-6 space-y-6">
            {/* BucksUp Member Card */}
            <div className="mb-6">
              <BucksUpMemberCard />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] mx-auto mb-6">
              {infoCards.map((card, index) => <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </CardContent>
                </Card>)}
            </div>

            <div className="text-center space-y-4 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800">My Tribe Calculator</h3>
              <Button onClick={() => window.open('https://bucksupcalculator.my.canva.site/dagok7mz4oe', '_blank')} className="gradient-tribe">
                Open Calculator
              </Button>
            </div>

            {/* Estimates Collapsible Card */}
            <Collapsible open={isEstimatesOpen} onOpenChange={setIsEstimatesOpen}>
              <div className="border shadow-lg rounded-lg">
                <CollapsibleTrigger asChild>
                  <div className="cursor-pointer hover:bg-gray-50 transition-colors p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-600" />
                        <div className="flex flex-col">
                          <span className="text-2xl font-semibold">Estimates</span>
                          <span className="text-sm font-normal text-gray-600">(For Tribe Calculator)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={e => {
                        e.stopPropagation();
                        window.open('https://bucksupcalculator.my.canva.site/dagok7mz4oe', '_blank');
                      }} className="gradient-tribe">
                          See Calc
                        </Button>
                        <ChevronDown className={`w-5 h-5 transition-transform ${isEstimatesOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-6 pt-0 space-y-6">
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
                          <div className="text-sm text-gray-600">Enable rounding for calculations</div>
                        </div>
                        {roundUpEnabled && <div className="text-red-600 text-sm font-medium">
                            Grows Tribe Rev. By 30%
                          </div>}
                      </div>
                      <Switch checked={roundUpEnabled} onCheckedChange={setRoundUpEnabled} />
                    </div>

                    {/* Calculated Variables Section */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Calculated Variables</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">(T1M) Tribe 1 Members</div>
                          <div className="text-xl font-bold text-orange-600">{tribe1Members.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {aveTribeMembers} × {tribesTier1}
                          </div>
                        </div>
                        
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">(T2M) Tribe2 Members</div>
                          <div className="text-xl font-bold text-red-600">{tribe2Members.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {tribe1Members} × 1
                          </div>
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
                              {roundUpEnabled ? Math.round(t1mIndex).toFixed(1) : t1mIndex.toFixed(1)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-cyan-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">T2M Index</div>
                            <div className="text-xl font-bold text-cyan-600">
                              {roundUpEnabled ? Math.round(t2mIndex).toFixed(1) : t2mIndex.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </DrawerContent>
      </Drawer>

      {/* BW Farms Drawer */}
      <Drawer open={isFarmsDrawerOpen} onOpenChange={setIsFarmsDrawerOpen}>
        <DrawerContent className="h-[95vh] p-0">
          {/* Black Top Bar with Close Icon */}
          <div className="bg-black flex items-center justify-between p-2 shrink-0 -mt-7">
            <h2 className="text-white font-semibold">BW Farms</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsFarmsDrawerOpen(false)} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex-1 w-full h-full overflow-hidden">
            <iframe src="https://bwmarket22.lovable.app" className="w-full h-full border-0" title="BW Farms Market" allow="fullscreen" />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Coming Soon Popup */}
      <AlertDialog open={isDealsPopupOpen} onOpenChange={setIsDealsPopupOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Coming Soon</AlertDialogTitle>
            <AlertDialogDescription>
              Local Deals feature is coming soon! Stay tuned for exciting offers from businesses in your area.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setIsDealsPopupOpen(false)}>
            Close
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      {/* Login Required Popup */}
      <Dialog open={isLoginRequiredPopupOpen} onOpenChange={setIsLoginRequiredPopupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Members Only Feature</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-center">
              This message feature is only available for members that are logged in.
            </p>
            <DialogFooter className="flex justify-center">
              <Button onClick={handleLoginRequiredClose}>
                Next
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;

