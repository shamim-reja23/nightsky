import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { addMemory } from '@/src/data/storage'
import { useState, useEffect, useRef } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const addStar = () => {
  const router = useRouter();
  const [ text, setText ] = useState('');
  const [ imageUri, setImageUri ] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

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
      id: id ?? Date.now().toString(),
      type: 'star',
      text,
      imageUri: imageUri ?? undefined,
      createdAt: Date.now(),
    });

    router.back();
  }

  const { id, text: oldText, imageUri: oldImage } =
  useLocalSearchParams<{
    id?: string;
    text?: string;
    imageUri?: string;
  }>();

  useEffect(() => {
    if (oldText) setText(oldText);
    if (oldImage) setImageUri(oldImage);
  }, []);
  

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
                  placeholder={`Wishper your memory to the stars...`}
                  placeholderTextColor='rgba(255, 255, 255, 0.25)'
                  multiline
                  textAlignVertical='top'
                  scrollEnabled={true}
                  style={{ maxHeight: 200, minHeight: 130 }}
                  className='text-white/70 text-lg leading-relaxed p-0 mt-2'
                />
              </View>
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