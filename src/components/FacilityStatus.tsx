
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StatusProps {
  lastUpdated: Date;
  totalTanks: number;
  lowLevelTanks: number;
  lowLevelThreshold: number;
}

const FacilityStatus: React.FC<StatusProps> = ({
  lastUpdated,
  totalTanks,
  lowLevelTanks,
  lowLevelThreshold,
}) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(lastUpdated);

  return (
    <Card className="w-full shadow-sm border">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Last Updated</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
          </div>
          
          <Separator orientation="vertical" className="h-8 hidden md:block" />
          
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Low Level Tanks</span>
              <span className="font-medium">
                {lowLevelTanks} of {totalTanks} ({(lowLevelTanks / totalTanks * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
          
          <Separator orientation="vertical" className="h-8 hidden md:block" />
          
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Low Level Threshold</span>
              <span className="font-medium">{lowLevelThreshold}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacilityStatus;
