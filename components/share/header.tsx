import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { router } from 'expo-router'

const Header = ({ backButton = false }: { backButton?: boolean }) => {
  const handleBack = () => {
    router.back()
  }

  const handleCart = () => {
    router.push('/cart') 
  }
  
  return (
    <View className='bg-background/95 h-12 flex flex-row justify-between items-center px-6 border-b border-border/20 shadow-sm'>
      {backButton ? (
        <TouchableOpacity className='flex items-center justify-center w-10' onPress={handleBack}>
          <Feather name="chevron-left" size={28} color="#0f172a" className="text-foreground" />
        </TouchableOpacity>
      ) : <View className='w-10' />}
      
      <Text className='font-serif text-2xl tracking-tight text-foreground'>CASA Store</Text>
      
      <TouchableOpacity className='flex justify-center w-10 items-end' onPress={handleCart}>
        <Feather name="shopping-bag" size={22} color="#0f172a" className="text-foreground" />
      </TouchableOpacity>
    </View>
  )
}

export default Header
