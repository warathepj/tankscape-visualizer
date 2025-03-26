
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TankProps {
  id: string;
  level: number;
  lowLevelThreshold: number;
  lastUpdated: Date;
}

export const Tank: React.FC<TankProps> = ({
  id,
  level,
  lowLevelThreshold,
  lastUpdated,
}) => {
  const [prevLevel, setPrevLevel] = useState(level);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (prevLevel !== level) {
      setIsAnimating(true);
      setPrevLevel(level);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [level, prevLevel]);

  const isLowLevel = level < lowLevelThreshold;
  
  return (
    <div className="flex flex-col items-center space-y-2 animate-fade-in">
      <div className="text-sm font-medium">{id}</div>
      <div className="relative h-48 w-28 border border-tank-border rounded-lg overflow-hidden bg-tank-empty">
        {/* Level markers */}
        <div className="tank-level-marker absolute right-0 top-[25%] w-4"></div>
        <div className="tank-level-marker absolute right-0 top-[50%] w-4"></div>
        <div className="tank-level-marker absolute right-0 top-[75%] w-4"></div>
        
        {/* Low level warning line */}
        <div className="absolute left-0 right-0 top-[75%] border-t border-dashed border-tank-low opacity-40"></div>
        
        {/* Liquid */}
        <div 
          className={cn(
            "tank-liquid",
            isLowLevel ? "bg-tank-low" : "bg-tank-normal",
            isLowLevel && "animate-pulse-low",
            isAnimating && "animate-liquid-fill"
          )}
          style={{ 
            height: `${level}%`,
            "--fill-height": `${level}%` 
          } as React.CSSProperties}
        ></div>
      </div>
      
      <div className="flex flex-col items-center space-y-1">
        <Badge variant={isLowLevel ? "destructive" : "outline"} className="font-medium">
          {level.toFixed(1)}%
        </Badge>
      </div>
    </div>
  );
};

export default Tank;
