
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Tank from "@/components/Tank";

interface TankData {
  id: string;
  level: number;
  lastUpdated: Date;
}

interface RoomProps {
  id: string;
  tanks: TankData[];
  lowLevelThreshold: number;
}

const Room: React.FC<RoomProps> = ({ id, tanks, lowLevelThreshold }) => {
  return (
    <Card className="w-full shadow-sm border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">{id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid ${tanks.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-6 py-2`}>
          {tanks.map((tank) => (
            <Tank
              key={tank.id}
              id={tank.id}
              level={tank.level}
              lowLevelThreshold={lowLevelThreshold}
              lastUpdated={tank.lastUpdated}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Room;
