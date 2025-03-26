
import React, { useState, useEffect } from "react";
import Room from "@/components/Room";
import FacilityStatus from "@/components/FacilityStatus";
import Legend from "@/components/Legend";

// Constants
const LOW_LEVEL_THRESHOLD = 25; // 25% of tank capacity
const UPDATE_INTERVAL = 10000; // 10 seconds in milliseconds

// Initial tank data structure
interface TankData {
  id: string;
  level: number;
  lastUpdated: Date;
}

interface RoomData {
  id: string;
  tanks: TankData[];
}

const Index = () => {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [rooms, setRooms] = useState<RoomData[]>([
    {
      id: "Room 1",
      tanks: [
        { id: "Tank1A", level: 50, lastUpdated: new Date() },
        { id: "Tank1B", level: 60, lastUpdated: new Date() },
      ],
    },
    {
      id: "Room 2",
      tanks: [
        { id: "Tank2A", level: 30, lastUpdated: new Date() },
        { id: "Tank2B", level: 15, lastUpdated: new Date() },
        { id: "Tank2C", level: 75, lastUpdated: new Date() },
        { id: "Tank2D", level: 90, lastUpdated: new Date() },
      ],
    },
  ]);

  // Count of tanks below low level threshold
  const lowLevelTanks = rooms.flatMap(room => room.tanks)
    .filter(tank => tank.level < LOW_LEVEL_THRESHOLD).length;
  
  // Total number of tanks
  const totalTanks = rooms.flatMap(room => room.tanks).length;

  // Update tank levels randomly
  const updateTankLevels = () => {
    const updatedRooms = rooms.map((room) => {
      const updatedTanks = room.tanks.map((tank) => {
        return {
          ...tank,
          level: Math.random() * 100,
          lastUpdated: new Date(),
        };
      });

      return {
        ...room,
        tanks: updatedTanks,
      };
    });

    setRooms(updatedRooms);
    setLastUpdated(new Date());
  };

  // Update tank levels every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(updateTankLevels, UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [rooms]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-8">
      <div className="container max-w-6xl px-4 sm:px-6 pt-8 mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Storage Tank Facility</h1>
          <p className="text-muted-foreground">
            SCADA visualization system for monitoring storage tank liquid levels
          </p>
        </header>

        <div className="grid gap-6">
          <FacilityStatus 
            lastUpdated={lastUpdated}
            totalTanks={totalTanks}
            lowLevelTanks={lowLevelTanks}
            lowLevelThreshold={LOW_LEVEL_THRESHOLD}
          />
          
          <Legend />
          
          {rooms.map((room) => (
            <Room
              key={room.id}
              id={room.id}
              tanks={room.tanks}
              lowLevelThreshold={LOW_LEVEL_THRESHOLD}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
