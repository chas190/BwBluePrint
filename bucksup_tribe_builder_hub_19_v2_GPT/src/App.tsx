import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from '@/contexts/AuthContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import SessionRestoration from '@/components/SessionRestoration';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Main from './pages/Main';
import Main2 from './pages/Main2';
import Main3 from './pages/Main3';
import Main4 from './pages/Main4';
import Main8 from './pages/Main8';
import Main8b from './pages/Main8b';
import Main11 from './pages/Main11';
import Main11Guide from './pages/Main11Guide';
import MainCopy060325 from './pages/MainCopy060325';
import DevDashboard from './pages/DevDashboard';
import Settings from './pages/Settings';
import Overview from './pages/Overview';
import MyTribe from './pages/MyTribe';
import JoinMyTribe from './pages/JoinMyTribe';
import RefJoin from './pages/RefJoin';
import Membership from './pages/Membership';
import Profile from './pages/Profile';
import ProfileDemo from './pages/ProfileDemo';
import Messages from './pages/Messages';
import Signup from './pages/Signup';
import SplashStart from './pages/SplashStart';
import RevOpp from './pages/Rev_Opp';
import VideoPlayer from './pages/VideoPlayer';
import SearchDeals from './pages/SearchDeals';
import ShopBuy from './pages/ShopBuy';
import NotFound from './pages/NotFound';
import AuthGuard from './components/AuthGuard';
// Info pages
import InfoCover from './pages/info/Cover';
import InfoQuestion from './pages/info/Question';
import InfoGroupComplete from './pages/info/GroupComplete';
import AppDir from './pages/AppDir';
// Onboarding pages
import StartPage from './pages/onboarding/StartPage';
import Page1Intro from './pages/onboarding/Page1Intro';
import Page2Difference from './pages/onboarding/Page2Difference';
import Page3AutoGrowth from './pages/onboarding/Page3AutoGrowth';
import Page4CoopModel from './pages/onboarding/Page4CoopModel';
import Page5RetireEarly from './pages/onboarding/Page5RetireEarly';
// VIP pages
import VipIndex from './pages/vip/index';
import VipInvite from './pages/vip/VipInvite';
import VipMaint from './pages/vip/VipMaint';
import TribeWelcome from './pages/vip/TribeWelcome';
import TribePhone from './pages/vip/TribePhone';
import JoinTeam from './pages/vip/JoinTeam';

const queryClient = new QueryClient();

function App() {
  console.log('App component rendering');
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Router basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AuthProvider>
              <OnboardingProvider>
                <SessionRestoration>
                <div className="App">
                  <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/main" element={
                    <AuthGuard>
                      <Main11 />
                    </AuthGuard>
                  } />
                  <Route path="/maincopy060325" element={
                    <AuthGuard>
                      <MainCopy060325 />
                    </AuthGuard>
                  } />
                  <Route path="/main2" element={
                    <AuthGuard>
                      <Main2 />
                    </AuthGuard>
                  } />
                  <Route path="/main3" element={
                    <AuthGuard>
                      <Main3 />
                    </AuthGuard>
                  } />
                  <Route path="/main4" element={
                    <AuthGuard>
                      <Main4 />
                    </AuthGuard>
                  } />
                  <Route path="/main8" element={
                    <AuthGuard>
                      <Main8 />
                    </AuthGuard>
                  } />
                  <Route path="/main8b" element={
                    <AuthGuard>
                      <Main8b />
                    </AuthGuard>
                  } />
                  <Route path="/main11" element={
                    <AuthGuard>
                      <Main11 />
                    </AuthGuard>
                  } />
                  <Route path="/main11-guide" element={
                    <AuthGuard>
                      <Main11Guide />
                    </AuthGuard>
                  } />
                  <Route path="/dev-dashboard" element={<DevDashboard />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/overview" element={
                    <AuthGuard>
                      <Overview />
                    </AuthGuard>
                  } />
                  <Route path="/my-tribe" element={
                    <AuthGuard>
                      <MyTribe />
                    </AuthGuard>
                  } />
                  <Route path="/join-my-tribe" element={<JoinMyTribe />} />
                  <Route path="/ref-join" element={<RefJoin />} />
                  <Route path="/membership" element={
                    <AuthGuard>
                      <Membership />
                    </AuthGuard>
                  } />
                  <Route path="/profile" element={
                    <AuthGuard>
                      <Profile />
                    </AuthGuard>
                  } />
                  <Route path="/profile-demo" element={<ProfileDemo />} />
                  <Route path="/messages" element={
                    <AuthGuard>
                      <Messages />
                    </AuthGuard>
                  } />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/splash-start" element={<SplashStart />} />
                  <Route path="/rev-opp" element={<RevOpp />} />
                  <Route path="/video-player" element={<VideoPlayer />} />
                    <Route path="/search-deals" element={<SearchDeals />} />
                    <Route path="/shop-buy" element={<ShopBuy />} />
                    
                    {/* Info Quest Routes */}
                    <Route path="/info" element={<InfoCover />} />
                    <Route path="/info/question" element={<InfoQuestion />} />
                    <Route path="/info/group-complete" element={<InfoGroupComplete />} />
                    
                    {/* Onboarding Routes */}
                    <Route path="/start" element={<StartPage />} />
                    <Route path="/start/page1-intro" element={<Page1Intro />} />
                    <Route path="/start/page2-difference" element={<Page2Difference />} />
                    <Route path="/start/page3-autogrowth" element={<Page3AutoGrowth />} />
                    <Route path="/start/page4-coopmodel" element={<Page4CoopModel />} />
                    <Route path="/start/page5-retireearly" element={<Page5RetireEarly />} />
                    
                    {/* App Directory */}
                    <Route path="/appdir" element={<AppDir />} />
                    
                     {/* VIP Routes */}
                     <Route path="/vip/tribe-phone" element={<TribePhone />} />
                     <Route path="/vip/tribe-welcome/:parameter" element={<TribeWelcome />} />
                     <Route path="/vip/tribe-welcome" element={<TribeWelcome />} />
                     <Route path="/vip/join-team" element={<JoinTeam />} />
                     <Route path="/vip/:parameter" element={<VipIndex />} />
                     <Route path="/vip/invite" element={<VipInvite />} />
                     <Route path="/vip/maint" element={<VipMaint />} />
                    
                      <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Toaster />
                </SessionRestoration>
              </OnboardingProvider>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

