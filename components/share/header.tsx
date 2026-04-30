import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { useRouter } from 'expo-router'
import { Badge } from '@react-navigation/elements'

const Header = ({ backButton = false }: { backButton?: boolean }) => {
  const router = useRouter()

  // implent later
  const handleBack = () => {
    router.back()
  }

  const handleCart = () => {
    router.push('/cart/app')
  }
  
  return (
    <View className='bg-white/50 h-12 flex flex-row justify-between items-center px-4'>
      <Text className=' font-bold tracking-widest'>GrootShip</Text>
      <TouchableOpacity className='flex items-center justify-center' onPress={handleCart}>
        <Feather name="shopping-bag" size={24} color="black" />

      </TouchableOpacity>
    </View>
  )
}

export default Header