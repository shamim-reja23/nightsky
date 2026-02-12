import Star from '@/src/components/Star';
import Moon from '@/src/components/Moon';
import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Memory } from '@/src/data/types';
import { getStarMemories } from '@/src/data/storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const MAX_STARS = 9;

const STAR_POSITIONS = [
  { top: "15%", left: "10%"},
  { top: "40%", left: "20%"},
  { top: "25%", left: "75%"},
  { top: "60%", left: "15%"},
  { top: "75%", left: "45%"},
  { top: "55%", left: "80%"},
  { top: "10%", left: "60%"},
  { top: "85%", left: "70%"},
  { top: "30%", left: "40%"},
]

export default function SkyScreen() {
  const [ stars, setStars] = useState<Memory[]>([]);

  useEffect(() => {
    const loadStars = async () => {
      const data = await getStarMemories();
      setStars(data);
    }

    loadStars();
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      getStarMemories().then(setStars);
    }, [])
  );

  const starSizeClasses = useMemo(() => {
    return STAR_POSITIONS.map((_, index) => {
      const isFilled = index < stars.length;
      if(!isFilled) return "w-1 h-1";
      return Math.random() < 0.5 ? 'w-1.5 h-1.5' : 'w-2 h-2';
    });
  }, [stars.length]);

  return (
    <LinearGradient 
      colors={['#131022', '#1e0b5e', '#2d1b69']}
      className="flex-1 "
    >

      <View
        style={{
          position: "absolute",
          top: 60,
          left: 24,
          right: 24,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>

          <Text style={{ "color": "rgba(255, 255, 255, 0.9)", fontSize: 22}} className='font-bold' >NightSky</Text>

          <Text style={{ "color": "rgba(255, 255, 255, 0.4)", fontSize: 12}} >  
            {stars.length} {stars.length === 1 ? 'Memory' : 'Memories'} Shining 

          </Text>

        </View>
      </View>

      <View className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        <View className='bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/5'>
          <Text className='text-white/30 text-xs uppercase tracking-[0.2em]'>
            Gently tap a star to relive
          </Text>
        </View>
      </View>
      
      <View className='flex-1 relative'>
        <Moon />

        {STAR_POSITIONS.slice(0, MAX_STARS).map((pos, index) => {
          const isFilled = index < stars.length;
          const memory = stars[index];
          const sizeClass = starSizeClasses[index];

          return (
            <Star 
              key={index}
              top={pos.top} 
              left={pos.left}
              filled={isFilled}
              sizeClass={sizeClass}
              onPress={() => {
                if(isFilled && memory?.id){
                   router.push({
                    pathname: '/(modals)/ViewStar',
                    params: { id: memory.id }
                   });
                }

                if(!isFilled){
                  router.push('/addStar');
                }
              }}
            />
          );
        })}
      </View>

      <View className='absolute bottom-14 left-0 right-0 items-center'>
        <View className='relative'>
          <View className='absolute inset-0 bg-[#3713ec]/30 blur-2xl rounded-full'/>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/addStar')}
            className='w-16 h-16 rounded-full bg-white/5 border border-white/20 items-center justify-center backdrop-blur-2xl '
          >
            <View className='absolute inset-0 rounded-full bg-[#3713ec]/20 opacity-50'/>
            <Text className='text-[#131022] text-3xl'>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <Text className='absolute -bottom-6 text-[10px] text-white/40 font-medium uppercase tracking-widest'>
          New Memory
        </Text>
      </View>
    
      
    </LinearGradient>
  );
}

