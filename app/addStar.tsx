import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { addMemory } from '@/src/data/storage'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

const addStar = () => {
  const router = useRouter();
  const [ text, setText ] = useState('');
  const [ imageUri, setImageUri ] = useState<string | null>(null);

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
    <View className='flex-1 bg-black px-6 pt-20'>
      <Text className='text-white text-xl mb-4'>
        Add a Memory ⭐
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={`Write something you dont want to forget...`}
        placeholderTextColor='#9ca3af'
        multiline
        className='bg-zinc-900 text-white p-4 rounded-lg h-40'
      />

      <TouchableOpacity
        onPress={pickImage}
        className='bg-zinc-800 rounded-lg py-3 mb-4 '
      >
        <Text className='text-white text-center '>
          {imageUri ? 'Change Image' : 'Add an Image'}
        </Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className='w-full h-40 rounded-lg mb-4'
          resizeMode='cover'
        />
      )}

      <TouchableOpacity
        onPress={handleSave}
        className='bg-white rounded-full py-3 mt-6'
      >
        <Text className='text-black text-center font-semibold'>
          Save Memory
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default addStar