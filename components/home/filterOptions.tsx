import { View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native';
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
    console.log("FilterOptions: Selected", item)   
    setSelected(item);  
  }

  return (
    <View className='h-16 py-2 flex justify-center w-full'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {Catagories.map((item, index) => {
          if (item === selected) {
            return (
              <TouchableOpacity key={item + index} onPress={() => handleSelection(item)} className='bg-primary mx-1.5 my-auto rounded-full px-5 py-2 shadow-sm'>
                <Text className='text-primary-foreground font-sans font-semibold tracking-wide'>{item}</Text>
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity key={item + index} onPress={() => handleSelection(item)} className='bg-muted/30 mx-1.5 my-auto rounded-full px-5 py-2'>
              <Text className='text-foreground font-sans font-medium tracking-wide'>{item}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default FilterOptions