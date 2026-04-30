import { View, Text, TouchableOpacity } from 'react-native'
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';


const FilterOptions = ({ selected, setSelected, productTypes }: { selected: string, setSelected: (item: string) => void, productTypes: string[] }) => {
  const [Catagories, setCatagories] = useState<string[]>([])

  useEffect(() => {
    const updatedCatagories = [...new Set(productTypes)]
    updatedCatagories.push('All')
    updatedCatagories.reverse()
    setCatagories(updatedCatagories)
    console.log("FilterOptions: Catagories", updatedCatagories)
  }, [productTypes])

  const handleSelection = (item: string) => {
    setSelected(item);
  }

  return (
    <View className='h-12 flex justify-center w-full'>
      <FlashList
        data={Catagories}
        horizontal
        renderItem={({ item }) => {
          if (item === selected) {
            return <TouchableOpacity onPress={() => handleSelection(item)} className=' bg-black mx-1.5 my-auto rounded-xl px-3 py-0.5 '>
              <Text className='text-white font-semibold'>{item}</Text>
            </TouchableOpacity>
          }
          return <TouchableOpacity onPress={() => handleSelection(item)} className=' bg-[#e4e4e4] mx-1.5 my-auto rounded-xl px-3 py-0.5 '>
            <Text>{item}</Text>
          </TouchableOpacity>
        }}
        keyExtractor={(item) => item + Date.now()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default FilterOptions