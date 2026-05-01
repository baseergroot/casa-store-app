import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@/constant/colors'
import Header from '@/components/share/header'
import { getItems } from '@/lib/secureStore/client'
import { useEffect, useState } from 'react'
import { deleteItemAsync } from 'expo-secure-store'
import getCheckoutUrl from '@/lib/shopify/createCheckout'
import * as WebBrowser from 'expo-web-browser';


const CartPage = () => {

	const [cart, setCart] = useState<any>([])
	const [totalCost, setTotalCost] = useState<string>("0 PKR")

	const fetchCart = async () => {
		const cartData = await getItems('cart')
		setCart(JSON.parse(cartData || '[]'))

		// calculate total cost
		const totalCost = JSON.parse(cartData || '[]').reduce((acc: number, item: any) => acc + (item.product.priceRange.minVariantPrice.amount * item.quantity), 0) + ` ${JSON.parse(cartData || '[]')[0].product.priceRange.minVariantPrice.currencyCode}`
		setTotalCost(totalCost)
	}

	const handleCheckout = async (cartData: any[]) => {
		try {
			const lineItems = cartData.map((item) => ({
				variantId: item.product.variants.edges[0].node.id,
				quantity: item.quantity
			}));

			const response = await getCheckoutUrl(lineItems);

			// Check for GraphQL errors
			if (response.errors) {
				console.error("GraphQL Error:", response.errors[0].message);
				return;
			}

			const cartDataApi = response.data.cartCreate;

			if (cartDataApi.userErrors.length > 0) {
				console.error("Shopify Error:", cartDataApi.userErrors[0].message);
				return;
			}

			// In Cart API, it is 'checkoutUrl'
			const url = cartDataApi.cart.checkoutUrl;
			await WebBrowser.openBrowserAsync(url);

		} catch (err) {
			console.error("System Error:", err);
		}
	};






	useEffect(() => {
		fetchCart()
	}, [])

	console.log(cart)

	return (
		<SafeAreaView className={`bg-[${colors.background}] flex-1`}>
			{/* <Header /> */}

			{
				cart.length > 0 ? (
					<>
						<View className='flex flex-col justify-center items-center mt-10'>
							<Text className='text-white text-xl font-bold'>Your Cart</Text>
						</View>

						<View className='flex flex-row justify-between items-center p-2'>
							{/* <Text className='text-white'>Product Image</Text> */}
							<Text className='text-white'>Product Name</Text>
							<View className='flex flex-row justify-between items-center gap-20'>
								<Text className='text-white'>Quantity</Text>
								<Text className='text-white'>Price</Text>
							</View>
							{/* <Text className='text-white'>Total</Text> */}
							{/* <Text className='text-white'>Remove</Text> */}
						</View>


						{cart?.map((item: any) => (
							<View key={item.productId} className='flex flex-row justify-between items-center p-2'>

								<Text className='text-white'>{item.product.title}</Text>
								<View className='flex flex-row justify-between items-center gap-20'>
									<Text className='text-white'>{item.quantity}</Text>
									<Text className='text-white'>{item.product.priceRange.minVariantPrice.amount}</Text>
								</View>
							</View>
						))}

						<View className='flex flex-row justify-between items-center p-2'>
							<Text className='text-white'>Total Cost:</Text>
							<Text className='text-white'>{totalCost}</Text>
						</View>

						{/* show message that this is dev store and you will have to enter pass to enter checkout page. password: showpa */}
						<View className={`flex flex-col justify-start items-start p-2 my-10 border border-[${colors.primary}] rounded`}>
							<Text className='font-bold text-white'>Note: </Text>
							<Text className='text-white'>This is a dev store and you will have to enter pass to enter checkout page. password: showpa</Text>
						</View>

						{/* convert to pressable */}
						<View className='flex flex-row justify-center gap-16 items-center p-2 absolute bottom-5 right-5 left-5'>
							<Pressable className='bg-red-500 p-2 rounded w-32 justify-center items-center' onPress={() => {
								deleteItemAsync('cart')
								fetchCart()
							}} ><Text className='text-white'>Clear Cart</Text></Pressable>
							<Pressable className='bg-green-500 p-2 rounded w-60 justify-center items-center ' onPress={() => { handleCheckout(cart) }} ><Text className='text-white'>Buy Now!</Text></Pressable>
						</View>
					</>
				) : <View><Text className='text-white'>Cart is empty</Text></View>
			}

		</SafeAreaView>
	)
}

export default CartPage