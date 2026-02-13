import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'


type Props = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationSheet({ visible, onCancel, onConfirm}: Props) {
  return (
    <Modal
        visible={visible}
        transparent
        animationType='fade'
        onRequestClose={onCancel}
    >
        <Pressable
            onPress={onCancel}
            className='flex-1 bg-black/50 justify-end'
        >
            <Pressable
                onPress={() => {}}
                className='bg-[#131022] rounded-t-2xl px-6 pt-6 pb-10 border-t border-white/10'
            >
                <Text className='text-white text-lg font-semibold mb-2'>
                    Delete Memory?
                </Text>

                <Text className='text-white/60 text-sm leading-relaxed mb-6'>
                    This memory will be permenently removed from your sky.
                    This action cannot be undone.
                </Text>

                <View className='flex-row gap-3'>
                    <TouchableOpacity
                        onPress={onCancel}
                        className='flex-1 items-center py-3 bg-white/10 rounded-xl'
                    >
                        <Text className='text-white/70 font-medium'>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={onConfirm}
                        className='flex-1 items-center py-3 bg-red-500 rounded-xl'
                    >
                        <Text className='text-white font-medium'>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Pressable>
    </Modal>
  )
}

 