import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const SelectSizeBtn = ({ sizes }: { sizes: string[] }) => {
  const [selected, setSelected] = useState<string>(sizes[0])

  const selectSize = (size: string) => {
    setSelected(size)
    console.log(size)
  }

  return (
    <View className='flex flex-row gap-2'>
      {sizes.map((size: string) => {

        if(size === selected){
          return <Pressable key={size} className='py-2.5 w-14 bg-foreground rounded-full border border-foreground' onPress={() => selectSize(size)} >
            <Text className='text-background text-center font-sans font-semibold'>{size}</Text>
          </Pressable>
        }

        return <Pressable key={size} className='py-2.5 w-14 bg-transparent rounded-full border border-border/50' onPress={() => selectSize(size)} >
          <Text className='text-foreground text-center font-sans font-medium'>{size}</Text>
        </Pressable>
      })}
    </View>
  )
}

export default SelectSizeBtn
