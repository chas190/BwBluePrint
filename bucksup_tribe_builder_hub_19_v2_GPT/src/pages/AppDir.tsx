import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Home, Shield, Users, Info, User, Building, ShoppingCart, Code, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import pagesData from "@/data/pages.json";

interface PageInfo {
  path: string;
  name: string;
  description: string;
  category: string;
  requiresAuth: boolean;
}

const categoryIcons: Record<string, any> = {
  core: Home,
  auth: Shield,
  main: Building,
  info: Info,
  onboarding: Users,
  user: User,
  business: Briefcase,
  shopping: ShoppingCart,
  other: Code
};

const categoryNames: Record<string, string> = {
  core: "Core Pages",
  auth: "Authentication",
  main: "Main Dashboards",
  info: "Info Quest",
  onboarding: "Onboarding Flow",
  user: "User Management",
  business: "Business & Teams",
  shopping: "Shopping & Deals",
  other: "Other Features"
};

export default function AppDir() {
  const navigate = useNavigate();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    core: true, // Keep core open by default
  });

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handlePageClick = (path: string) => {
    navigate(path);
  };

  // Group pages by category
  const pagesByCategory = pagesData.pages.reduce((acc, page: PageInfo) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, PageInfo[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">App Directory</h1>
          <p className="text-lg text-muted-foreground">
            Navigate to any page in the BucksUp application
          </p>
        </div>

        {/* Categories */}
        <TooltipProvider>
          <div className="grid gap-4">
            {Object.entries(pagesByCategory).map(([category, pages]) => {
              const IconComponent = categoryIcons[category] || Code;
              const isOpen = openCategories[category] || false;

              return (
                <Card key={category} className="overflow-hidden">
                  <Collapsible
                    open={isOpen}
                    onOpenChange={() => toggleCategory(category)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-6 h-6 text-primary" />
                            <span>{categoryNames[category]}</span>
                            <span className="text-sm text-muted-foreground font-normal">
                              ({pages.length} pages)
                            </span>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {pages.map((page) => (
                            <Tooltip key={page.path}>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-auto p-4 text-left justify-start hover:bg-primary/10 transition-colors"
                                  onClick={() => handlePageClick(page.path)}
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{page.name}</span>
                                      {page.requiresAuth && (
                                        <Shield className="w-3 h-3 text-orange-500" />
                                      )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {page.path}
                                    </div>
                                  </div>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p>{page.description}</p>
                                {page.requiresAuth && (
                                  <p className="text-xs text-orange-400 mt-1">
                                    🔒 Requires authentication
                                  </p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>
        </TooltipProvider>

        {/* Back to Home */}
        <div className="text-center pt-6">
          <Button 
            onClick={() => navigate("/")} 
            size="lg"
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
