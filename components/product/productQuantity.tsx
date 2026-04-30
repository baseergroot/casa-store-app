import { View, Text, Pressable } from 'react-native'
import React from 'react'

const ProductQuantity = ({ quantity, setQuantity }: { quantity: number, setQuantity: (quantity: number) => void }) => {
  return (
    <View className='flex flex-col gap-2 mt-5'>
      <Text>Quantity</Text>
      <View className='flex flex-row gap-2 items-center border border-black/20 p-2 rounded-xl w-36 justify-between'>
        <Pressable className='bg-slate-400 w-8 h-8 rounded-full justify-center items-center' onPress={() => {
          quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1)
        }}>
          <Text className=''>-</Text>
        </Pressable>
        <Text className=''>{quantity}</Text>
        <Pressable className='bg-slate-400 w-8 h-8 rounded-full justify-center items-center' onPress={() => {
          setQuantity(quantity + 1)
        }}>
          <Text className='text-black'>+</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ProductQuantity