import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Memory } from '@/src/data/types';
import { deleteMemory, getStarMemories } from '@/src/data/storage';

const ViewStar = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [ memory, setMemory ] = useState<Memory | null>(null);

    useEffect(() => {
        const load = async () => {
            const stars = await getStarMemories();
            const found = stars.find(m => m.id === id);
            setMemory(found ?? null);
        };
        load();
    }, [id]);

    if(!memory) return null;

  return (
    <View className='flex-1 bg-black px-6 pt-20'>
      <Text className='text-white text-xl mb-6'>
        ⭐ Memory
      </Text>

      {memory.imageUri && (
        <Image 
          source={{ uri: memory.imageUri }} 
          className='w-full h-48 rounded-lg mb-6'
          resizeMode='cover'
        />
      )}

      <Text className='bg-zinc-200 text-base leading-relaxed'>
        {memory.text}
      </Text>

      <TouchableOpacity
        onPress={() => router.push({
            pathname: '/addStar',
            params: {
                id: memory.id,
                text: memory.text,
                imageUri: memory.imageUri,
            },
        })}
        className="bg-zinc-800 px-6 py-3 rounded-full mb-3 mt-20"
      >
            <Text className="text-white text-center">
                Edit Memory
            </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={ async () => {
            await deleteMemory(memory.id);
            router.back();
        }}
        className='bg-red-600 px-6 py-3 rounded-full'
      >
        <Text className='text-white text-center font-semibold'>
          Delete Memory
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        className='absolute bottom-10 self-center bg-white px-8 py-3 rounded-full'
      >
        <Text className='text-black font-semibold'>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ViewStar