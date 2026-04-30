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
          return <Pressable key={size} className='p-2 w-10 bg-slate-700 rounded' onPress={() => selectSize(size)} >
            <Text className='text-white text-center'>{size}</Text>
          </Pressable>
        }

        return <Pressable key={size} className='p-2 w-10 bg-slate-400 rounded' onPress={() => selectSize(size)} >
          <Text className='text-white text-center'>{size}</Text>
        </Pressable>
      })}
    </View>
  )
}

export default SelectSizeBtn
