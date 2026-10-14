import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import DealsSection from '@/components/DealsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
const SearchDeals = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-[12px] py-[30px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 pt-4 ">
            <Link to="/main">
              <Button variant="outline" size="sm" className=" ">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-2xl text-indigo-500 pt-0">Bwtown Deals</h1>
            </div>
          </div>
        </div>

        {/* Deals Section */}
        <DealsSection />
      </div>
    </div>;
};
export default SearchDeals;
