import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { addMemory } from '@/src/data/storage';
import * as ImagePicker from 'expo-image-picker';

const addMoon = () => {
    const router = useRouter();
    const [text, setText] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);

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
            id: Date.now().toString(),
            type: 'moon',
            text,
            imageUri: imageUri ?? undefined,
            createdAt: Date.now(),
        })

        router.back();
    }

  return (
    <View className='flex-1 bg-black px-6 pt-20'>
        <Text className='text-white text-xl mb-4'>
            🌙 Special Memory
        </Text>

        <TextInput
            value={text}
            onChangeText={setText}
            placeholder='Write something that matters the most...'
            multiline
            placeholderTextColor='#9ca3af'
            className='bg-zinc-900 text-white p-4 rounded-lg h-40'
        />

        <TouchableOpacity
            onPress={pickImage}
            className='bg-zinc-800 rounded-lg py-3 mt-4'
        >
            <Text className='text-white text-center mt-4'>
                {imageUri ? 'Change Image' : 'Add Moon Image (optional)'}
            </Text>
        </TouchableOpacity>

        {imageUri && (
            <Image
                source={{ uri: imageUri }}
                className='w-full h-64 rounded-lg mt-4'
                resizeMode='cover'
            />
        )}

        <TouchableOpacity
            onPress={handleSave}
            className='bg-white rounded-full py-3 mt-6'
        >
            <Text className='text-black text-center font-semibold'>
                Save Moon Memory
            </Text>

        </TouchableOpacity>
    </View>
  );
}

export default addMoon;

