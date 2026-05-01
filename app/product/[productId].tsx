import ProductQuantity from '@/components/product/productQuantity';
import SelectSizeBtn from '@/components/product/selectSizeBtn';
import AddToCart from '@/components/share/addToCart';
import Header from '@/components/share/header';
import colors from '@/constant/colors';
import getProduct from '@/lib/shopify/getProduct';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductPage() {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const fetchProduct = async () => {
    const productData = await getProduct(productId as string)
    // console.log({images: productData.images.edges[0].node.url})
    setProduct(productData)
    console.log(productData.title)
    console.log(productData.description)
    console.log(productData.images.edges[0].node.url)
    console.log(productData.priceRange.minVariantPrice.amount)
    console.log(productData.priceRange.minVariantPrice.currencyCode)
  }

  useEffect(() => {
    fetchProduct();
    console.log(productId)
  }, []);

  if (!product) {
    return (
      <SafeAreaView className='bg-background flex-1'>
        <Header backButton={true} />
        <View className='flex-1 justify-center items-center'>
          <Text className='text-foreground font-sans text-lg'>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  const sizes = ['S', 'M', 'L', 'XL']
  return (
    <SafeAreaView className='bg-background flex-1'>
      <Header backButton={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product?.images?.edges[0]?.node?.url }} className='w-full aspect-[4/5] object-cover' />
        <View className='p-6 flex flex-col'>
          <Text className='text-foreground text-3xl font-serif tracking-tight mb-2'>{product?.title}</Text>
          <Text className='text-secondary font-sans font-medium text-xl mb-6'>{product?.priceRange?.minVariantPrice?.amount} {product?.priceRange?.minVariantPrice?.currencyCode}</Text>
          
          <Text className='text-foreground font-sans font-semibold uppercase tracking-widest text-xs mb-3'>Select Size</Text>
          <SelectSizeBtn sizes={sizes} />
          
          <View className='flex flex-row items-center justify-between mt-6'>
            <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
            <AddToCart product={product} productId={productId as string} quantity={quantity} />
          </View>

          <View className='w-full h-[1px] bg-border my-8'></View>
          <Text className='text-foreground/80 font-sans leading-relaxed text-base'>{product?.description}</Text>
          <View className='w-full h-[1px] bg-border my-8'></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
