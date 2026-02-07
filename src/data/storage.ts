import AsyncStorage from '@react-native-async-storage/async-storage';
import { Memory } from './types';

const MEMORIES_KEY = 'memories';

// get all memories
export const getMemories = async (): Promise<Memory[]> => {
    try {
        const raw = await AsyncStorage.getItem(MEMORIES_KEY);
        return raw ? JSON.parse(raw) : [];

    } catch (error) {
        console.error('Failed to load memories:', error);
        return [];
        
    }
}

// save all memories
const saveMemories = async (memories: Memory[]) => {
    try {
        await AsyncStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
        
    } catch (error) {
        console.error('Failed to save memories:', error);
        
    }
}

// add new memory
export const addMemory = async (memory: Memory) => {
    const memories = await getMemories();
  
    if (memory.type === "moon") {
      // Remove ALL existing moon memories
      const nonMoonMemories = memories.filter(
        m => m.type !== "moon"
      );
  
      const updated = [...nonMoonMemories, memory];
      await saveMemories(updated);
      return;
    }
  
    const updated = [...memories, memory];
    await saveMemories(updated);
  };
  

// get moon memory
export const getMoonMemory = async (): Promise<Memory | null> => {
    const memories = await getMemories();
    const moons = memories.filter(m => m.type === "moon");
  
    if (moons.length === 0) return null;
  
    // Return latest moon memory
    return moons.sort((a, b) => b.createdAt - a.createdAt)[0];
};
  

//get star memories
export const getStarMemories = async (): Promise<Memory[]> => {
    const memories = await getMemories();
    return memories.filter(m => m.type === 'star');
}

// delete memory by id
export const deleteMemory = async (id: string) => {
    const memories = await getMemories();
    const updated = memories.filter(m => m.id !== id);
    await saveMemories(updated);
}