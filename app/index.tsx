import FilterOptions from '@/components/home/filterOptions';
import ProductList from '@/components/home/productsList';
import Header from '@/components/share/header';
import getAllProducts from '@/lib/shopify/getAllProducts';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/theme';
import { Product } from '@/types/productType';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});


export default function Screen() {
  const { isDarkColorScheme, colors } = useColorScheme();
  const [products, setProducts] = useState<Product[]>([])
  const [selected, setSelected] = useState<string>('All');
  const [productTypes, setProductTypes] = useState<string[]>([])

  const fetchProducts = async () => {
    const res: Product[] = await getAllProducts()
    setProducts(res)

    res.forEach((product: Product) => {
      const newProductType = product.node.productType as string
      setProductTypes((prev: string[]) => { 
        console.log("newProductType", newProductType)
        return prev.includes(newProductType) || newProductType === ""  ? prev : [...prev, newProductType]
      }) 
    }) 

  }

  React.useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <NavThemeProvider value={NAV_THEME['light']}>

        {/* main container */}
        <SafeAreaView className='flex-1 bg-[#efece6]'>

          {/* header */}
          <Header />

          {/* filter options */}
          <FilterOptions selected={selected} setSelected={setSelected} productTypes={productTypes} />

          {/* product listing */}
          <ProductList products={products} selected={selected} />
        </SafeAreaView>
      </NavThemeProvider>
    </>
  );
}
