import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type PropertyStatus = 'Upcoming' | 'Active' | 'Staged' | 'Planning';

export type ChecklistTask = {
  id: string;
  title: string;
  section: 'Pre-staging' | 'Day of staging';
  done: boolean;
};

export type Room = {
  id: string;
  name: string;
  done: boolean;
};

export type Property = {
  id: string;
  address: string;
  city: string;
  agent: string;
  brokerage: string;
  stagingDate: string;
  status: PropertyStatus;
  image: 'home' | 'living';
  type: string;
  sqft: string;
  beds: string;
  baths: string;
  stairs: boolean;
  notes: string;
  rooms: Room[];
  tasks: ChecklistTask[];
  photos: number;
};

const starterTasks = (): ChecklistTask[] => [
  { id: 'schedule', title: 'Add property to schedule', section: 'Pre-staging', done: true },
  { id: 'confirm', title: 'Confirm staging date with agent', section: 'Pre-staging', done: false },
  { id: 'review', title: 'Review property details & photos', section: 'Pre-staging', done: false },
  { id: 'load', title: 'Create furniture plan / load list', section: 'Pre-staging', done: false },
  { id: 'team', title: 'Confirm team and truck', section: 'Pre-staging', done: false },
  { id: 'final', title: 'Final check (supplies, covers, tools)', section: 'Pre-staging', done: false },
  { id: 'load-out', title: 'Load truck', section: 'Day of staging', done: false },
  { id: 'drive', title: 'Drive to property', section: 'Day of staging', done: false },
];

const starterRooms = (): Room[] => [
  { id: 'living', name: 'Living Room', done: true },
  { id: 'dining', name: 'Dining Room', done: true },
  { id: 'primary', name: 'Primary Bedroom', done: true },
  { id: 'bed2', name: 'Bedroom 2', done: false },
  { id: 'bed3', name: 'Bedroom 3', done: false },
  { id: 'office', name: 'Office', done: false },
  { id: 'outdoor', name: 'Outdoor / Patio', done: false },
];

const initialProperties: Property[] = [
  {
    id: 'maple',
    address: '123 Maple Drive',
    city: 'Phoenix, AZ 85016',
    agent: 'Sarah Johnson',
    brokerage: 'Redwood Realty',
    stagingDate: 'Mon, Apr 14, 2025',
    status: 'Upcoming',
    image: 'home',
    type: 'Single Family Home',
    sqft: '2,450 sq ft',
    beds: '4',
    baths: '3',
    stairs: true,
    notes: 'Narrow staircase to 2nd floor. Use protective covers.',
    rooms: starterRooms(),
    tasks: starterTasks(),
    photos: 6,
  },
  {
    id: 'oak',
    address: '456 Oak Lane',
    city: 'Phoenix, AZ 85018',
    agent: 'Mike Carter',
    brokerage: 'Prime Properties',
    stagingDate: 'Tue, Apr 15, 2025',
    status: 'Staged',
    image: 'living',
    type: 'Townhouse',
    sqft: '1,880 sq ft',
    beds: '3',
    baths: '2',
    stairs: true,
    notes: 'Keep the front room bright for listing photos.',
    rooms: starterRooms().map((room, index) => ({ ...room, done: index < 4 })),
    tasks: starterTasks().map((task, index) => ({ ...task, done: index < 3 })),
    photos: 8,
  },
  {
    id: 'pine',
    address: '789 Pine Street',
    city: 'Scottsdale, AZ 85251',
    agent: 'Emily Davis',
    brokerage: 'Canyon Group',
    stagingDate: 'Wed, Apr 16, 2025',
    status: 'Planning',
    image: 'home',
    type: 'Condo',
    sqft: '1,420 sq ft',
    beds: '2',
    baths: '2',
    stairs: false,
    notes: 'Client wants a lighter, more minimal setup.',
    rooms: starterRooms().slice(0, 5),
    tasks: starterTasks().map((task) => ({ ...task, done: task.id === 'schedule' })),
    photos: 3,
  },
];

type StageDataContextValue = {
  properties: Property[];
  hydrated: boolean;
  addProperty: (input: Pick<Property, 'address' | 'city' | 'agent' | 'stagingDate' | 'type' | 'sqft' | 'beds' | 'baths'>) => string;
  toggleTask: (propertyId: string, taskId: string) => void;
  toggleRoom: (propertyId: string, roomId: string) => void;
  addPhoto: (propertyId: string) => void;
};

const StageDataContext = createContext<StageDataContextValue | null>(null);
const STORAGE_KEY = 'stage-this-properties-v1';

export function StageDataProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value) setProperties(JSON.parse(value) as Property[]);
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }, [hydrated, properties]);

  const value = useMemo<StageDataContextValue>(() => ({
    properties,
    hydrated,
    addProperty: (input) => {
      const id = `property-${Date.now()}`;
      const property: Property = {
        ...input,
        id,
        brokerage: 'Stage This',
        status: 'Planning',
        image: 'home',
        stairs: false,
        notes: '',
        rooms: starterRooms(),
        tasks: starterTasks(),
        photos: 0,
      };
      setProperties((current) => [property, ...current]);
      return id;
    },
    toggleTask: (propertyId, taskId) => setProperties((current) => current.map((property) => property.id !== propertyId ? property : {
      ...property,
      tasks: property.tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task),
    })),
    toggleRoom: (propertyId, roomId) => setProperties((current) => current.map((property) => property.id !== propertyId ? property : {
      ...property,
      rooms: property.rooms.map((room) => room.id === roomId ? { ...room, done: !room.done } : room),
    })),
    addPhoto: (propertyId) => setProperties((current) => current.map((property) => property.id !== propertyId ? property : { ...property, photos: property.photos + 1 })),
  }), [hydrated, properties]);

  return <StageDataContext.Provider value={value}>{children}</StageDataContext.Provider>;
}

export function useStageData() {
  const context = useContext(StageDataContext);
  if (!context) throw new Error('useStageData must be used inside StageDataProvider');
  return context;
}
