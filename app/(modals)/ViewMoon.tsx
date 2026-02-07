import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { Memory } from '@/src/data/types';
import { getMoonMemory } from '@/src/data/storage';

const ViewMoon = () => {
    const router = useRouter();
    const [memory, setMemory] = useState<Memory | null>(null);

    useEffect(() => {
        getMoonMemory().then(setMemory);
    }, []);

    if(!memory) return null;

  return (
    <View className='flex-1 bg-black px-6 pt-20'>
        <Text className='text-white text-xl mb-6'>
            🌙 Special Memory
        </Text>

        {memory.imageUri && (
            <Image 
                source={{ uri: memory.imageUri }} 
                className='w-full h-48 rounded-lg mb-6'
                resizeMode='cover'
            />
        )}

        <Text className='text-zinc-200 text-base leading-relaxed'>
            {memory.text}
        </Text>

        <TouchableOpacity
            onPress={() => router.push("/addMoon")}
            className='bg-zinc-800 px-6 py-3 rounded-full mb-4 self-center mt-20'
        >
            <Text className='text-white font-medium'>Replace Moon Memory</Text>
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

export default ViewMoon