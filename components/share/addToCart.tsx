import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { getItems, saveItems } from '@/lib/secureStore/client'
import { deleteItemAsync } from 'expo-secure-store'

const AddToCart = ({ product, productId, quantity }: { product: any, productId: string, quantity: number }) => {

  const handleAddtoCart = async () => {

    // await deleteItemAsync('cart')
    // 1. Get existing items
    const existingCart = await getItems('cart');
    // console.log('existing cart', existingCart)

    // 2. Parse existing items or start with an empty array
    const cartArray: { productId: string, quantity: number, product: any }[] = existingCart ? JSON.parse(existingCart) : [];

    // 3. Add the new item to the list
    const index = cartArray.findIndex(item => item.productId === productId);

    if (index > -1) {
      cartArray[index].quantity += quantity; // Update existing
    } else {
      cartArray.push({ productId, quantity, product }); // Add new
    }


    // 4. Save the updated list back to SecureStore
    await saveItems('cart', JSON.stringify(cartArray));


    // Log the full list to verify
    const updatedCart = await getItems('cart');
    console.log('Total cart items:', JSON.parse(updatedCart!));
  }

  return (
    <Pressable className='bg-black/60 px-5 py-2 rounded mt-12' onPress={handleAddtoCart}>
      <Text className='text-white'>Add to Cart</Text>
    </Pressable>
  )
}

export default AddToCart