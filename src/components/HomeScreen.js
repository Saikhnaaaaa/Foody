import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import axios from 'axios';
import Recipes from '../contents/Recipes';
import Categories from '../contents/Categories';






export default function HomeScreen() {

    const [isActive, setActive] = useState('Beef')
    const [categories, setCategories] = useState([])
    const [meals,setMeals] = useState([])

    useEffect(()=> {
      getCategories()
      getRecipes()
    },[])

    const handleChangeCategories = category => {
      getRecipes(category)
      setActive(category)
      setMeals([])
    }

    const getCategories = async ()=>{
      try {
          const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
          // console.log('getting', response.data)
          if (response && response.data){
            setCategories(response.data.categories)
          }
      } catch (err) {
        console.log('error getting',err.message)
        
      }
    }

    const getRecipes= async (category="Beef")=>{
      try {
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
          // console.log('getting meal', response.data)
          if (response && response.data){
            setMeals(response.data.meals)
          }
      } catch (err) {
        console.log('error getting',err.message)
        
      }
    }


  return (
    <View className="flex-1 bg-red">
      <StatusBar style='dark'/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 50}}
      className="space-y-6 pt-14" >
             {/*Avastar  */}
             <View className="mx-4 flex-row justify-between items-center mb-2">
                <Image source={require('../assetss/Avatar.png')} style={{height:hp(5), width:hp(5.5)}}/> 
                <BellIcon size={hp(4)} color="gray" />
             </View>

             {/* greetings */}
             <View className="mx-4 space-y-2 mb-2">
                <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">Hello, world!</Text>
                <View>
                  <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Make your own food</Text>
                </View>
                <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">stay at
                  <Text  className="text-amber-400"> home</Text></Text>
             </View>

             {/* Search */}
             <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput 
                        placeholder='Search any recipe'
                        placeholderTextColor={'grey'}
                        style={{fontSize: hp(1.7)}}
                        className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    />
                    <View className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="black"/>
                    </View>
             </View>

             {/* categories */}

             <View>
                { categories.length>0 && <Categories categories={categories} isActive={isActive} handleChangeCategories={handleChangeCategories}/>}
             </View>
            {/* recipes */}
            <View>
              <Recipes meals={meals} categories={categories}/>
            </View>
      </ScrollView>
    </View>
  )
}