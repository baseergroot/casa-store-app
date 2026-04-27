import { FlashList } from '@shopify/flash-list';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/lib/useColorScheme';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { NAV_THEME } from '@/theme';
import getAllProducts from '@/lib/shopify/getAllProducts';
import { useState } from 'react';
import Header from '@/components/home/header';
import FilterOptions from '@/components/home/filterOptions';
import ProductList from '@/components/home/productsList';


cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});


export default function Screen() {
  const { isDarkColorScheme, colors } = useColorScheme();
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    setProducts(await getAllProducts())
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
          <FilterOptions />

          {/* product listing */}
          <ProductList products={products} />
        </SafeAreaView>
      </NavThemeProvider>
    </>
  );
}
