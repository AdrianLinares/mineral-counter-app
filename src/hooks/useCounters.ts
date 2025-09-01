import { useState, useEffect } from 'react';
import { Counter } from '@/types/mineral';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'mineral_counters';

export const useCounters = () => {
  const [counters, setCounters] = useState<Counter[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCounters(parsed.map((c: Counter & { createdAt: string }) => ({
          ...c,
          createdAt: new Date(c.createdAt)
        })));
      } catch (error) {
        console.error('Error loading counters:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  }, [counters]);

  const addCounter = (mineralName: string, color: string) => {
    const newCounter: Counter = {
      id: uuidv4(),
      mineralName,
      value: 0,
      increment: 1,
      color,
      createdAt: new Date()
    };
    setCounters(prev => [...prev, newCounter]);
  };

  const updateCounter = (id: string, updates: Partial<Counter>) => {
    setCounters(prev => prev.map(counter => 
      counter.id === id ? { ...counter, ...updates } : counter
    ));
  };

  const deleteCounter = (id: string) => {
    setCounters(prev => prev.filter(counter => counter.id !== id));
  };

  const incrementCounter = (id: string) => {
    setCounters(prev => prev.map(counter => {
      if (counter.id === id) {
        const newValue = counter.value + counter.increment;
        if (counter.maxValue && newValue > counter.maxValue) {
          return counter;
        }
        return { ...counter, value: newValue };
      }
      return counter;
    }));
  };

  const decrementCounter = (id: string) => {
    setCounters(prev => prev.map(counter => 
      counter.id === id 
        ? { ...counter, value: Math.max(0, counter.value - counter.increment) }
        : counter
    ));
  };

  const resetCounter = (id: string) => {
    setCounters(prev => prev.map(counter => 
      counter.id === id ? { ...counter, value: 0 } : counter
    ));
  };

  const resetAllCounters = () => {
    setCounters(prev => prev.map(counter => ({ ...counter, value: 0 })));
  };

  const exportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      counters: counters.map(counter => ({
        mineralName: counter.mineralName,
        value: counter.value,
        increment: counter.increment,
        maxValue: counter.maxValue,
        color: counter.color,
        createdAt: counter.createdAt.toISOString()
      }))
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.counters && Array.isArray(data.counters)) {
        const importedCounters: Counter[] = data.counters.map((c: Partial<Counter> & { createdAt?: string }) => ({
          id: uuidv4(),
          mineralName: c.mineralName,
          value: c.value || 0,
          increment: c.increment || 1,
          maxValue: c.maxValue,
          color: c.color || '#3b82f6',
          createdAt: new Date(c.createdAt || new Date())
        }));
        setCounters(prev => [...prev, ...importedCounters]);
        return true;
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
    return false;
  };

  const reorderCounters = (startIndex: number, endIndex: number) => {
    setCounters(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const totalCount = counters.reduce((sum, counter) => sum + counter.value, 0);

  return {
    counters,
    addCounter,
    updateCounter,
    deleteCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    resetAllCounters,
    reorderCounters,
    exportData,
    importData,
    totalCount
  };
};