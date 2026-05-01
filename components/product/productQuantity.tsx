import { View, Text, Pressable } from 'react-native'
import React from 'react'

const ProductQuantity = ({ quantity, setQuantity }: { quantity: number, setQuantity: (quantity: number) => void }) => {
  return (
    <View className='flex flex-col gap-2'>
      <Text className='text-foreground font-sans font-semibold uppercase tracking-widest text-xs'>Quantity</Text>
      <View className='flex flex-row gap-2 items-center border border-border/50 py-1.5 px-2 rounded-full w-32 justify-between'>
        <Pressable className='bg-muted/30 w-8 h-8 rounded-full justify-center items-center' onPress={() => {
          quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1)
        }}>
          <Text className='text-foreground text-lg leading-none'>-</Text>
        </Pressable>
        <Text className='text-foreground font-sans font-semibold text-base'>{quantity}</Text>
        <Pressable className='bg-muted/30 w-8 h-8 rounded-full justify-center items-center' onPress={() => {
          setQuantity(quantity + 1)
        }}>
          <Text className='text-foreground text-lg leading-none'>+</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ProductQuantity