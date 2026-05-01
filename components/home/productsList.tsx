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
          <TouchableOpacity onPress={() => router.push({ pathname: '/product/[productId]', params: { productId: item.node.id } })} className='bg-card mx-2 mb-6 rounded-xl overflow-hidden shadow-sm'>
            <Image
              source={{ uri: item.node.images.edges[0].node.url }}
              className="w-full aspect-[4/5] object-cover"
            />
            <View className='p-3'>
              <Text className="font-serif text-lg tracking-tight text-foreground" numberOfLines={1}>{item.node.title}</Text>
              <Text className="font-sans text-sm text-secondary font-medium pt-1">{item.node.priceRange.minVariantPrice.amount} {item.node.priceRange.minVariantPrice.currencyCode}</Text>
            </View>
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