import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { addMemory } from '@/src/data/storage'
import { useState, useEffect, useRef } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MemoryBlock } from '@/src/data/types';

const addStar = () => {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [blocks, setBlocks] = useState<MemoryBlock[]>([
    {
      id: Date.now().toString(),
      type: 'text',
      content: '',
    }
  ]);

  const addTextBlock = () => {
    setBlocks(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'text',
        content: '',
      },
    ]);
  };

  const addImageBlock = async () => {
    const imageCount = blocks.filter(b => b.type === 'image').length;

    if (imageCount >= 5) return;
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled){
      setBlocks(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'image',
          uri: result.assets[0].uri,
        },
      ]);
    }
  };

  const deleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
  };

  const handleSave = async () => {
    if(!title.trim()) return;

    const hasText = blocks.some(
      b => b.type === 'text' && b.content.trim() !== ''
    );

    if (!hasText) return;

    await addMemory({
      id: Date.now().toString(),
      type: 'star',
      title,
      blocks,
      date: new Date().toISOString(),
      location,
      createdAt: Date.now(),
    });

    router.back();
  };



  return (
    <ImageBackground
      source={require('@/assets/images/night-c-bg.jpg')}
      resizeMode='cover'
      className='flex-1'
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
  
      <View className='flex-row items-center justify-between px-6 pt-14 pb-4'>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className='text-white/70 text-lg'>✕</Text>
        </TouchableOpacity>

        <Text className='text-white text-lg font-semibold'>
          Create New Memory
        </Text>

        <View className='w-6'/>
      </View>
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          className='flex-1 px-6'
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='on-drag'
        >
          <View 
            className='rounded-xl p-6 gap-8'
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderWidth: 1,
              borderBlockColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder='Title '
              placeholderTextColor='rgba(255, 255, 255, 0.4)'
              className='text-white text-xl font-semibold'
            />

            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder='Location (optional)'
              placeholderTextColor='rgba(255, 255, 255, 0.4)'
              className='text-white/70 mt-2'
            />
            
            {blocks.map(block => {
              if (block.type === 'text') {
                return (
                  <View key={block.id} className='mt-6'>
                    <TextInput
                      value={block.content}
                      onChangeText={(value) => 
                        setBlocks(prev => 
                          prev.map(b => 
                            b.id === block.id 
                              ? { ...b, content: value } 
                              : b
                          )
                        )
                      }
                      textAlignVertical='top'
                      placeholder='Write your memory...'
                      placeholderTextColor='rgba(255, 255, 255, 0.3)'
                      multiline
                      className='text-white/80 min-h-[120px]'
                    />
                    
                  </View>
                );
              }

              if (block.type === 'image'){
                return (
                  <View key={block.id} className='mt-6'>
                    <Image
                      source={{ uri: block.uri }}
                      className='w-full h-48 rounded-lg'
                      resizeMode='cover'
                    />
                  </View>
                );
              }

              return null;
            })}

            <View className='flex-row gap-4 mt-6'>
              <TouchableOpacity
                onPress={() => 
                  setBlocks(prev => [
                    ...prev,
                    {
                      id: Date.now().toString(),
                      type: 'text',
                      content: '',
                    },
                  ])
                }
                className='bg-white/10 px-4 py-2 rounded-lg'
              >
                <Text className='text-white'>Add Text</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addImageBlock}
                className='bg-white/10 px-4 py-2 rounded-lg'
              >
                <Text className='text-white'>Add Image</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='mt-10'>
            <TouchableOpacity
              onPress={handleSave}
              className='bg-[#3713ec] rounded-xl py-4 items-center'
              style={{
                shadowColor: '#3713ec',
                shadowOpacity: 0.4,
                shadowRadius: 20,
              }}
            >
              <Text className='text-white font-semibold'>
                Place in Sky
              </Text>
            </TouchableOpacity>

            <Text className='text-white/40 text-center text-[10px] mt-4 uppercase tracking-[0.2em]'>
              Become a star in your sky
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>     
    </ImageBackground>
  )
}

export default addStar