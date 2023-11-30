import { View, Text, Image} from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';


export default function WelcomeScreen() {
    const ring1 = useSharedValue(0)
    const ring2 = useSharedValue(0)

    const navigation = useNavigation()

    useEffect(()=>{
        setTimeout(() => {
            ring1.value = withSpring(ring1.value+hp(5))
        }, 100);
        setTimeout(() => {
            ring2.value = withSpring(ring2.value+hp(5.5))
        }, 300);
        setTimeout(() => 
            navigation.navigate('Home')
        , 2500);
    },[])
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
        <StatusBar style='light'/>

        {/* Logo */}
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2}}>
            <Animated.View className="bg-white/20 rounded-full" style={{padding: ring1}}>
                <Image source={require('../assetss/Food.png')} style={{width: hp(20), height: hp(20)}}/>
             </Animated.View>
        </Animated.View>


        {/* title */}
        <View className="flex items-center space-y-2">
            <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest">
                Foody
            </Text>
            <Text style={{fontSize: hp(3)}} className="font-medium text-white tracking-widest text-lg">
                Food is always right
            </Text>
        </View>
      
    </View>
  )
}