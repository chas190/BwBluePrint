
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface TribeSliderCardProps {
  startingTribes: number[];
  onStartingTribesChange: (value: number[]) => void;
}

const TribeSliderCard = ({ startingTribes, onStartingTribesChange }: TribeSliderCardProps) => {
  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">Starting Tribes {startingTribes[0]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="px-4">
          <Slider
            value={startingTribes}
            onValueChange={onStartingTribesChange}
            max={100}
            min={25}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>25</span>
            <span>100</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TribeSliderCard;

