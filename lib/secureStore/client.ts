import * as SecureStore from 'expo-secure-store';


export async function saveItems(key: string, value: any) {
    await SecureStore.setItemAsync(key, value)
}

export async function getItems(key: string) {
    return await SecureStore.getItemAsync(key)
}

export async function deleteItems(key: string) {
    return await SecureStore.deleteItemAsync(key)
}
