import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import { addMemory, getMoonMemory } from '@/src/data/storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Memory } from '@/src/data/types';

const addMoon = () => {
    const router = useRouter();
    const [text, setText] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [ existingMoon, setExistingMoon ] = useState<Memory | null>(null);

    useEffect(() => {
      getMoonMemory().then(moon => {
        if(moon) {
          setExistingMoon(moon);
          setText(moon.text);
          setImageUri(moon.imageUri ?? null);
        }
      });
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if(!result.canceled){
            setImageUri(result.assets[0].uri);
        }
    }

    const handleSave = async () => {
        if(!text.trim()) return;

        await addMemory({
            id: existingMoon?.id ?? Date.now().toString(),
            type: 'moon',
            text,
            imageUri: imageUri ?? undefined,
            createdAt: existingMoon?.createdAt ?? Date.now(),
        })

        router.back();
    }



  return (
    <ImageBackground
      source={require('@/assets/images/night-c-bg.jpg')}
      resizeMode='cover'
      className="flex-1 "
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
          {existingMoon ? "Edit Moon Memory" : "Create Moon Memory"}
        </Text>

        <View className='w-6'/>
      </View>
      
      <ScrollView 
        className='flex-1 px-6'
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View 
          className='rounded-xl p-6 gap-8'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderWidth: 1,
            borderBlockColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <View className='gap-3'>
            <Text className='text-xs uppercase tracking-widest text-white/50'>
             Visual Spark
            </Text>

            <TouchableOpacity 
              onPress={pickImage}
              className='aspect-square rounded-lg border-2 border-dashed border-white/15 items-center justify-center bg-white/5'
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  className='w-full h-full rounded-lg' 
                  resizeMode='cover'
                />
              ) : (
                <>
                  <View className='w-12 h-12 rounded-full bg-[#3713ec]/20 items-center justify-center mb-2'>
                    <Text className='text-[#3713ec] text-xl'>+</Text>
                  </View>
                  <Text className='text-sm text-white/40'>
                    Tap to add a photo
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View className='mt-8 '>
              <Text className='text-sm tracking-widest uppercase text-white/50 font-medium'>
                The Story
              </Text>
              
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder={`Write something that matter the most...`}
                placeholderTextColor='rgba(255, 255, 255, 0.25)'
                multiline
                textAlignVertical='top'
                className='text-white/70 text-lg leading-relaxed min-h-[130px] p-0 mt-2'
              />
            </View>
          </View>

          
        </View>

        <View className='mt-8'>
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
            Become the moon in your sky
          </Text>
        </View>
      </ScrollView>
            
    </ImageBackground>
  );
}

export default addMoon;

