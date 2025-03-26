
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Legend: React.FC = () => {
  return (
    <Card className="w-full shadow-sm border">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="text-sm font-medium">Legend:</div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-tank-normal"></div>
            <span className="text-sm">Normal Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-tank-low animate-pulse-low"></div>
            <span className="text-sm">Low Level (&lt;25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border border-dashed border-tank-low opacity-50"></div>
            <span className="text-sm">Warning Threshold</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Legend;
