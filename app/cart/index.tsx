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
		<SafeAreaView className='bg-background flex-1'>
			<Header backButton={true} />

			{
				cart.length > 0 ? (
					<View className='flex-1 px-6 pt-4'>
						<Text className='text-foreground font-serif text-3xl tracking-tight mb-8'>Your Cart</Text>

						<View className='flex flex-row justify-between items-center border-b border-border/50 pb-2 mb-2'>
							<Text className='text-muted-foreground font-sans text-xs uppercase tracking-widest flex-1'>Product</Text>
							<View className='flex flex-row justify-between items-center w-32'>
								<Text className='text-muted-foreground font-sans text-xs uppercase tracking-widest text-center w-10'>Qty</Text>
								<Text className='text-muted-foreground font-sans text-xs uppercase tracking-widest text-right flex-1'>Price</Text>
							</View>
						</View>

						{cart?.map((item: any) => (
							<View key={item.productId} className='flex flex-row justify-between items-center py-4 border-b border-border/20'>
								<Text className='text-foreground font-serif text-lg flex-1' numberOfLines={1}>{item.product.title}</Text>
								<View className='flex flex-row justify-between items-center w-32'>
									<Text className='text-foreground font-sans text-base text-center w-10'>{item.quantity}</Text>
									<Text className='text-foreground font-sans text-base text-right flex-1'>{item.product.priceRange.minVariantPrice.amount}</Text>
								</View>
							</View>
						))}

						<View className='flex flex-row justify-between items-end pt-6 pb-2'>
							<View className='flex flex-col'>
								<Text className='text-foreground font-sans text-lg font-semibold'>Total Cost</Text>
								<Text className='text-muted-foreground font-sans text-xs mt-1'>Taxes calculated at checkout</Text>
							</View>
							<Text className='text-secondary font-sans text-xl font-bold'>{totalCost}</Text>
						</View>

						<View className='flex flex-col justify-start items-start p-4 mt-6 border border-border/50 bg-muted/10 rounded-xl'>
							<Text className='font-sans font-semibold text-foreground mb-1 text-sm uppercase tracking-wide'>Note</Text>
							<Text className='text-foreground/80 font-sans text-sm leading-relaxed'>This is a dev store. You will need to enter a password to view the checkout page. Password: showpa</Text>
						</View>

						<View className='flex flex-row justify-between gap-4 items-center absolute bottom-10 right-6 left-6'>
							<Pressable className='border border-border/50 py-3.5 px-6 rounded-full justify-center items-center' onPress={() => {
								deleteItemAsync('cart')
								fetchCart()
							}}><Text className='text-foreground font-sans font-medium'>Clear</Text></Pressable>
							<Pressable className='bg-primary py-3.5 px-8 flex-1 rounded-full justify-center items-center shadow-sm' onPress={() => { handleCheckout(cart) }}><Text className='text-primary-foreground font-sans font-semibold tracking-wide'>Checkout</Text></Pressable>
						</View>
					</View>
				) : (
					<View className='flex-1 justify-center items-center'>
						<Text className='text-muted-foreground font-sans text-lg'>Your cart is empty.</Text>
					</View>
				)
			}
		</SafeAreaView>
	)
}

export default CartPage