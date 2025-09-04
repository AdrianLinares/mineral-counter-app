import { useState, useEffect } from 'react';
import { Counter } from '@/types/mineral';
import { v4 as uuidv4 } from 'uuid';

/**
 * Key used for storing counters in localStorage
 */
const STORAGE_KEY = 'mineral_counters';

/**
 * Custom hook for managing mineral counters
 * 
 * Provides functionality for:
 * - Creating, updating, and deleting counters
 * - Incrementing/decrementing counter values
 * - Importing/exporting counter data
 * - Persisting data in localStorage
 * - Reordering counters
 * 
 * @returns {Object} Counter management functions and state
 */
export const useCounters = () => {
  // State to store the list of counters
  const [counters, setCounters] = useState<Counter[]>([]);

  /**
   * Load counters from localStorage on component mount
   * Converts stored dates back to Date objects
   */
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

  /**
   * Save counters to localStorage whenever they change
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
  }, [counters]);

  /**
   * Creates a new counter with the specified properties
   * @param {string} mineralName - Name of the mineral
   * @param {string} color - Color for the counter
   * @param {Object} [grainSize] - Grain size characteristics
   * @param {Object} [sphericity] - Sphericity characteristics
   * @param {Object} [roundness] - Roundness characteristics
   * @param {Object} [contacts] - Contact type characteristics
   * @param {Object} [sorting] - Sorting characteristics
   * @param {Object} [maturity] - Maturity characteristics
   * @param {Object} [packing] - Packing characteristics
   */
  const addCounter = (
    mineralName: string, 
    color: string, 
    grainSize?: {
      category: 'sedimentarias' | 'igneas';
      term: string;
      description: string;
    },
    sphericity?: { term: string; description: string; },
    roundness?: { term: string; description: string; },
    contacts?: { term: string; description: string; },
    sorting?: { term: string; description: string; },
    maturity?: { term: string; description: string; },
    packing?: { term: string; description: string; }
  ) => {
    const newCounter: Counter = {
      id: uuidv4(),
      mineralName,
      value: 0,
      increment: 1,
      color,
      grainSize,
      sphericity,
      roundness,
      contacts,
      sorting,
      maturity,
      packing,
      createdAt: new Date()
    };
    setCounters(prev => [...prev, newCounter]);
  };

  /**
   * Updates an existing counter with new properties
   * @param {string} id - Counter ID to update
   * @param {Partial<Counter>} updates - Properties to update
   */
  const updateCounter = (id: string, updates: Partial<Counter>) => {
    setCounters(prev => prev.map(counter => 
      counter.id === id ? { ...counter, ...updates } : counter
    ));
  };

  /**
   * Deletes a counter
   * @param {string} id - Counter ID to delete
   */
  const deleteCounter = (id: string) => {
    setCounters(prev => prev.filter(counter => counter.id !== id));
  };

  /**
   * Increments a counter's value, respecting maxValue if set
   * @param {string} id - Counter ID to increment
   */
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

  /**
   * Decrements a counter's value, preventing negative values
   * @param {string} id - Counter ID to decrement
   */
  const decrementCounter = (id: string) => {
    setCounters(prev => prev.map(counter => 
      counter.id === id 
        ? { ...counter, value: Math.max(0, counter.value - counter.increment) }
        : counter
    ));
  };

  /**
   * Resets a specific counter's value to zero
   * @param {string} id - Counter ID to reset
   */
  const resetCounter = (id: string) => {
    setCounters(prev => prev.map(counter => 
      counter.id === id ? { ...counter, value: 0 } : counter
    ));
  };

  /**
   * Resets all counters' values to zero
   */
  const resetAllCounters = () => {
    setCounters(prev => prev.map(counter => ({ ...counter, value: 0 })));
  };

  /**
   * Exports counters data as a JSON string
   * @returns {string} JSON string containing counters data
   */
  const exportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      counters: counters.map(counter => ({
        mineralName: counter.mineralName,
        value: counter.value,
        increment: counter.increment,
        maxValue: counter.maxValue,
        color: counter.color,
        grainSize: counter.grainSize,
        sphericity: counter.sphericity,
        roundness: counter.roundness,
        contacts: counter.contacts,
        sorting: counter.sorting,
        maturity: counter.maturity,
        packing: counter.packing,
        createdAt: counter.createdAt.toISOString()
      }))
    };
    return JSON.stringify(data, null, 2);
  };

  /**
   * Imports counters from JSON data
   * @param {string} jsonData - JSON string containing counters data
   * @returns {boolean} Success status of import operation
   */
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
          grainSize: c.grainSize,
          sphericity: c.sphericity,
          roundness: c.roundness,
          contacts: c.contacts,
          sorting: c.sorting,
          maturity: c.maturity,
          packing: c.packing,
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

  /**
   * Reorders counters by moving one from startIndex to endIndex
   * @param {number} startIndex - Starting position
   * @param {number} endIndex - Ending position
   */
  const reorderCounters = (startIndex: number, endIndex: number) => {
    setCounters(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  /**
   * Calculates the sum of all counter values
   */
  const totalCount = counters.reduce((sum, counter) => sum + counter.value, 0);

  // Return all counter management functions and state
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