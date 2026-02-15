import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native'
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
    <ImageBackground 
      className='flex-1'
      source={require('@/assets/images/night-c-bg.jpg')}
      resizeMode='cover'
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(19, 16, 34, 0.6)',
        }}
      />
      <LinearGradient
        colors={['transparent', '#131022']}
        style={StyleSheet.absoluteFillObject}
      />

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
        <View className='items-center max-w-[320px]'>
          <Text className='text-white text-2xl font-semibold text-center mb-4'>
            {memory.title}
          </Text>

          <Text className='text-white/40 text-sm text-center'>
            {new Date(memory.date).toDateString()}
          </Text>

          {memory.location && (
            <Text className='text-white/40 text-sm text-center mt-1'>
              {memory.location}
            </Text>
          )}
          
          {memory.blocks.map(block => {
            if(block.type === 'text') {
              return (
                <Text 
                  key={block.id} 
                  className='text-white/80 text-center text-base leading-relaxed mt-4'
                >
                  {block.content}
                </Text>
              )
            }

            if(block.type === 'image') {
              return (
                <Image 
                  key={block.id}
                  source={{ uri: block.uri }}
                  className='w-[300px] h-[300px] rounded-xl mt-6'
                  resizeMode='cover'
                />
              )
            }

            return null;
          })}
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
                  //text: memory.text,
                  //imageUri: memory.imageUri,
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
    </ImageBackground>
  )
}

export default ViewStar;