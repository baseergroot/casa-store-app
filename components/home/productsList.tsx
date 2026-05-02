import { router } from 'expo-router'
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Skeleton } from 'boneyard-js/native'
import '@/bones/registry'

const ProductList = ({ products, selected, loading }: { products: any[], selected: string, loading: boolean }) => {
  return (
    <View className="flex-1 px-2 mt-4">
      <FlatList
        data={products.filter((product) => product.node.productType === selected || selected === "All")}
        renderItem={({ item }) => (
          <View className="flex-1">
            <Skeleton name="product" loading={loading} dark={false}> 
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/product/[productId]', params: { productId: item.node.id } })}
              className='bg-card m-2 rounded-xl overflow-hidden shadow-sm border border-border/50'
            >
              <Image
                source={{ uri: item.node.images.edges[0]?.node?.url || 'https://via.placeholder.com/400' }}
                className="w-full aspect-[4/5] object-cover bg-muted"
              />
              <View className='p-3'>
                <Text className="font-serif text-base tracking-tight text-foreground" numberOfLines={1}>{item.node.title}</Text>
                <Text className="font-sans text-sm text-secondary font-medium pt-1">{item.node.priceRange.minVariantPrice.amount} {item.node.priceRange.minVariantPrice.currencyCode}</Text>
              </View>
            </TouchableOpacity>
            </Skeleton>
          </View>
        )}
        keyExtractor={(item) => item.node.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  )
}


export default ProductList
