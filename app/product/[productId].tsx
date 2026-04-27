import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import getProduct from '@/lib/shopify/getProduct';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async () => {
    const product = await getProduct(productId as string)
    setProduct(product)
  }

  useEffect(() => {
    fetchProduct();
    console.log(productId)
  }, []);

  return (
    <SafeAreaView>
      <Text className='text-white text-2xl font-bold'>Product ID: {productId}</Text>
    </SafeAreaView>
  )
}
