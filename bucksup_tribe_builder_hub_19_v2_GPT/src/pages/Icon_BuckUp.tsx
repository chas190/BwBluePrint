
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, X } from 'lucide-react';

const Icon_BuckUp = () => {
  const [showVideoDialog, setShowVideoDialog] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 px-0">
        <div className="container mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">BuckUp</CardTitle>
              <div className="flex justify-center mt-4">
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer bg-amber-500 text-white hover:bg-amber-600 flex items-center gap-2"
                  onClick={() => setShowVideoDialog(true)}
                >
                  <Play className="w-4 h-4" />
                  Watch Video
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 text-center">
                Turn your everyday costs into cash with our BuckUp system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle>BuckUp Overview</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVideoDialog(false)}
                className="h-6 w-6 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 p-4 pt-0">
            <iframe
              src="https://www.youtube.com/embed/0CAfdzh3hPQ?rel=0"
              title="BuckUp Overview"
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Icon_BuckUp;

