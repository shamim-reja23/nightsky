import Star from '@/src/components/Star';
import Moon from '@/src/components/Moon';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useCallback } from 'react';
import { Memory } from '@/src/data/types';
import { getStarMemories } from '@/src/data/storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const MAX_STARS = 7;

const STAR_POSITIONS = [
  { top: "20%", left: "15%"},
  { top: "35%", left: "70%"},
  { top: "50%", left: "30%"},
  { top: "65%", left: "60%"},
  { top: "25%", left: "50%"},
  { top: "75%", left: "20%"},
  { top: "45%", left: "85%"},

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

  return (
    <LinearGradient 
      colors={['#020617', '#020617', '#000000']}
      className="flex-1 "
    >
      <View className='flex-1 relative'>
        <Moon />

        {STAR_POSITIONS.slice(0, MAX_STARS).map((pos, index) => {
          const isFilled = index < stars.length;
          const memory = stars[index];

          return (
            <Star 
              key={index}
              top={pos.top} 
              left={pos.left}
              filled={isFilled}
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
    
      
    </LinearGradient>
  );
}

