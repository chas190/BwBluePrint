
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface FavoritesFormProps {
  onSubmit: () => void;
}

const FavoritesForm = ({ onSubmit }: FavoritesFormProps) => {
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [showSubmitted, setShowSubmitted] = useState(false);

  const stores = [
    'Walmart',
    'Target',
    'Best Buy',
    'Home Depot',
    'Costco',
    'eBay',
    'Macy\'s',
    'Nike',
    'Apple',
    'Samsung',
    'Adidas',
    'Lowe\'s',
    'Wayfair',
    'Nordstrom'
  ];

  const toggleStore = (store: string) => {
    setSelectedStores(prev => 
      prev.includes(store) 
        ? prev.filter(s => s !== store)
        : [...prev, store]
    );
  };

  const handleSave = () => {
    setShowSubmitted(true);
  };

  const handleContinue = () => {
    onSubmit();
  };

  if (showSubmitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-4">Favorites Submitted!</h3>
        <p className="mb-6">Thank you for letting us know your preferences.</p>
        <Button onClick={handleContinue} className="gradient-prosperity">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Pick your favorites:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {stores.map((store) => (
          <Card 
            key={store}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedStores.includes(store) 
                ? 'bg-green-100 border-green-500' 
                : 'bg-white border-gray-200'
            }`}
            onClick={() => toggleStore(store)}
          >
            <CardContent className="p-4 text-center relative">
              {selectedStores.includes(store) && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                  <Check className="w-3 h-3" />
                </div>
              )}
              <span className="font-medium">{store}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button 
          onClick={handleSave}
          className="gradient-prosperity"
          disabled={selectedStores.length === 0}
        >
          Save Options ({selectedStores.length} selected)
        </Button>
      </div>
    </div>
  );
};

export default FavoritesForm;

