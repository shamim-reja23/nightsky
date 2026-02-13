import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { Memory } from '@/src/data/types';
import { deleteMemory, getMoonMemory } from '@/src/data/storage';
import { LinearGradient } from 'expo-linear-gradient';
import DeleteConfirmationSheet from '@/src/components/DeleteConfirmationSheet';

const ViewMoon = () => {
    const router = useRouter();
    const [memory, setMemory] = useState<Memory | null>(null);
    const [ showDelete, setShowDelete ] = useState(false);

    useEffect(() => {
        getMoonMemory().then(setMemory);
    }, []);

    if(!memory) return null;

  return (
    <LinearGradient 
      className='flex-1'
      colors={['#131022', '#1a1635', '#131022']}
    >
      <View className='flex-row justify-between items-center px-6 pt-10 pb-3'>
        <TouchableOpacity
          onPress={() => router.back()}
          className='w-10 h-10 items-center justify-center bg-white/10 rounded-full'
        >
          <Text className='text-white text-lg'> ‹ </Text>
        </TouchableOpacity>

        <View className='items-center'>
            <Text className='text-[#3713ec]/70 text-xs tracking-widest uppercase font-semibold'>
              Special Memory 
            </Text>

            <Text className='text-white text-sm mt-1'>
              The Moon Vault
            </Text>
        </View>

        <View className='w-10' />
      </View>

      <ScrollView 
        className='flex-1 px-6'
        contentContainerStyle={{ 
          paddingBottom: 40, 
          paddingTop: 40,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {memory.imageUri && (
          <View className='mb-10'>
            <View
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba( 55, 19, 236, 0.35)',
                borderRadius: 999,
                shadowColor: '#3713ec',
                shadowOpacity: 0.5,
                shadowRadius: 30,
              }}
            />
            <Image 
              source={{ uri: memory.imageUri }} 
              className='w-[300px] h-[300px] rounded-full border border-white/10'
              resizeMode='cover'
            />
          </View>
        )}

        <View className='items-center max-w-[320px]'>
          <Text className='text-white/70 text-base leading-relaxed text-center'>
            {memory.text}
          </Text>
        </View>
      </ScrollView>
      
      <View className='px-6 pb-10 items-center'>
        <View className='flex-row items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-[260px]'>
          <TouchableOpacity
            onPress={() => 
              router.push({
                pathname: '/addMoon',
                params: {
                  id: memory.id,
                  text: memory.text,
                  imageUri: memory.imageUri,
                },
              })
            }
            className="flex-1 py-3 items-center"
          >
            <Text className="text-white/60 font-medium">
                Edit 
            </Text>
          </TouchableOpacity>

          <View className="w-[1px] h-6 bg-white/30" />

          <TouchableOpacity
            onPress={ async () => setShowDelete(true)}
            className='flex-1 items-center py-3'
          >
            <Text className='text-red-400 font-medium'>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DeleteConfirmationSheet
        visible={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={async () => {
          await deleteMemory(memory.id);
          setShowDelete(false);
          router.back();
        }}
      />
    </LinearGradient>
  )
}

export default ViewMoon;