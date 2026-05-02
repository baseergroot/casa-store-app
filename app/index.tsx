import FilterOptions from '@/components/home/filterOptions';
import ProductList from '@/components/home/productsList';
import Header from '@/components/share/header';
import getAllProducts from '@/lib/shopify/getAllProducts';
import { useColorScheme } from '@/lib/useColorScheme';
import { Product } from '@/types/productType';
import { FlashList } from '@shopify/flash-list';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});


export default function Screen() {
  const { isDarkColorScheme, colors } = useColorScheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string>('All');
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    fetchProducts();
  }, []); 

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res: Product[] = await getAllProducts();

      if (!res || res.length === 0) {
        console.warn("Shopify returned 0 products.");
        Alert.alert("No Products Found", "The Shopify API connected successfully but returned an empty list of products. Please check your Shopify inventory.");
      }

      setProducts(res);

      // Extract unique product types in one go
      const types = Array.from(new Set(res.map(p => p.node.productType).filter(t => t && t !== "")));
      setProductTypes(types as string[]);

    } catch (err: any) {
      console.error("Fetch products error:", err);
      const errorMsg = err.message || "Failed to fetch products";
      setError(errorMsg);
      // Show alert on device to catch silent failures
      Alert.alert("Connection Error", errorMsg + "\n\nPlease check if your internet is working and the Shopify URL is accessible.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      {/* main container */}
      <SafeAreaView className='flex-1 bg-background'>
        {/* header */}
        <Header />

        {/* filter options */}
        <FilterOptions selected={selected} setSelected={setSelected} productTypes={productTypes} />

        {/* product listing */}
        {
          error ? (
            <View className='flex-1 justify-center items-center px-6'>
              <Text className='text-destructive font-sans text-center mb-4'>{error}</Text>
              <TouchableOpacity onPress={fetchProducts} className='bg-primary px-6 py-2 rounded-full'>
                <Text className='text-primary-foreground font-medium'>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ProductList products={products} selected={selected} loading={loading} onRefresh={onRefresh} refreshing={refreshing} />
          )
        }

      </SafeAreaView>
    </>
  );
}
