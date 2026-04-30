import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'

const ProductList = ({ products, selected }: { products: any[], selected: string }) => {
  const router = useRouter()
  return (
    <View className="flex-1 px-1 mt-4 ">
      <FlashList
        data={products.filter((product) => product.node.productType === selected || selected === "All")} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/product/[productId]', params: { productId: item.node.id } })} className=' bg-white/50 mx-2 mb-4 rounded px-0.5 flex items-center'>
            <Image
              source={{ uri: item.node.images.edges[0].node.url }}
              className="w-full h-48 rounded-tl rounded-tr"
            />
            <Text className="font-semibold text pt-1.5">{item.node.title}</Text>
            <Text className="text-gray-500 pb-1.5">{item.node.priceRange.minVariantPrice.amount} {item.node.priceRange.minVariantPrice.currencyCode}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.node.id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  )
}

export default ProductList