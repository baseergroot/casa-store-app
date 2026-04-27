import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list';

const Catagories = ["All", "Electronics", "Clothing", "Books", "Home", "Beauty", "Toys", "Sports", "Furniture", "Appliances", "Garden", "Pet Supplies", "Jewelry", "Accessories", "Shoes", "Bags", "Watches", "Health", "Food", "Drinks"];

const FilterOptions = () => {
  return (
    <View className='h-12 flex items-center gap-3 w-full'>
      <FlashList
        data={Catagories}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity className=' bg-[#e4e4e4] mx-2 my-auto rounded-xl px-3 py-0.5 '>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default FilterOptions