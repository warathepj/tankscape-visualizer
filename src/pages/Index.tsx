
import React, { useState, useEffect } from "react";

// Extend the Window interface to include getTankData
declare global {
  interface Window {
    getTankData?: () => RoomData[];
  }
}
import Room from "@/components/Room";
import FacilityStatus from "@/components/FacilityStatus";
import Legend from "@/components/Legend";

// Constants
const LOW_LEVEL_THRESHOLD = 25; // 25% of tank capacity
const UPDATE_INTERVAL = 25000; // 30 seconds in milliseconds
const BACKEND_URL = 'http://localhost:3001';
const PUBLISHER_ENDPOINT = '/publish';

// Initial tank data structure
interface TankData {
  id: string;
  name?: string; // Adding name property to match backend
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
        { id: "Tank1A", name: "Storage Tank 1A", level: 50, lastUpdated: new Date() },
        { id: "Tank1B", name: "Storage Tank 1B", level: 60, lastUpdated: new Date() },
      ],
    },
    {
      id: "Room 2",
      tanks: [
        { id: "Tank2A", name: "Storage Tank 2A", level: 30, lastUpdated: new Date() },
        { id: "Tank2B", name: "Storage Tank 2B", level: 15, lastUpdated: new Date() },
        { id: "Tank2C", name: "Storage Tank 2C", level: 75, lastUpdated: new Date() },
        { id: "Tank2D", name: "Storage Tank 2D", level: 90, lastUpdated: new Date() },
      ],
    },
  ]);

  // Count of tanks below low level threshold
  const lowLevelTanks = rooms.flatMap(room => room.tanks)
    .filter(tank => tank.level < LOW_LEVEL_THRESHOLD).length;
  
  // Total number of tanks
  const totalTanks = rooms.flatMap(room => room.tanks).length;

  // Update tank levels randomly
  const updateTankLevels = async () => {
    const updatedRooms = rooms.map((room) => {
      const updatedTanks = room.tanks.map((tank) => {
        const updatedTank = {
          ...tank,
          level: Math.random() * 100,
          lastUpdated: new Date(),
        };
        
        return updatedTank;
      });

      return {
        ...room,
        tanks: updatedTanks,
      };
    });

    // Send data to backend publisher
    try {
      const response = await fetch(`${BACKEND_URL}${PUBLISHER_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          rooms: updatedRooms
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send data to publisher:', error);
    }

    setRooms(updatedRooms);
    setLastUpdated(new Date());
  };

  // Remove or modify the existing getTankData effect since we're now
  // sending data directly to the publisher
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.getTankData = () => rooms;
    }
  }, [rooms]);

  // Update tank levels every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(updateTankLevels, UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [rooms]);

  // Rest of the component remains the same
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
