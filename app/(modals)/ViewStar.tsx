import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Memory } from '@/src/data/types';
import { deleteMemory, getStarMemories } from '@/src/data/storage';
import { LinearGradient } from 'expo-linear-gradient';
import DeleteConfirmationSheet from '@/src/components/DeleteConfirmationSheet';

const ViewStar = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [ memory, setMemory ] = useState<Memory | null>(null);
    const [ showDelete, setShowDelete ] = useState(false);

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
    <LinearGradient 
      className='flex-1'
      colors={['#131022', '#1a1635', '#131022']}
    >
      <View className='flex-row justify-between items-center px-6 pb-3 pt-10'>
        <TouchableOpacity
          onPress={() => router.back()}
          className='w-10 h-10 items-center justify-center bg-white/10 rounded-full'
        >
          <Text className='text-white text-lg'> ‹ </Text>
        </TouchableOpacity>

        <View className='items-center'>
          <Text className='text-white text-xs tracking-[0.2em] uppercase'>
             Star Memory
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
                borderRadius: 16,
                filter: 'blur(30px)',
              }}
            />
            <Image 
              source={{ uri: memory.imageUri }} 
              className='w-[300px] h-[300px] rounded-xl border border-white/10'
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
                pathname: '/addStar',
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
            onPress={() => setShowDelete(true)}
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
        onConfirm={ async () => {
          setShowDelete(false);
          await deleteMemory(memory.id);
          router.back();
        }}
      />
    </LinearGradient>
  )
}

export default ViewStar;