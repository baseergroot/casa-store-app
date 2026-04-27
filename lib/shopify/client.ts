// lib/shopify.ts
const SHOPIFY_DOMAIN = "nextjs-store-nm.myshopify.com"
const STOREFRONT_TOKEN = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN
const API_URL = process.env.EXPO_PUBLIC_SHOPIFY_URL

export default async function shopifyClient(query: string, variables = {}) {

  if (!STOREFRONT_TOKEN) {
    throw new Error("Missing Storefront Access Token")
  }
  if (!SHOPIFY_DOMAIN) {
    throw new Error("Missing Shoppify Domain")
  }

  if (!API_URL) {
    console.log("STOREFRONT_TOKEN", STOREFRONT_TOKEN)
    console.log("SHOPIFY_DOMAIN", SHOPIFY_DOMAIN)
    console.log("API_URL", API_URL)
    throw new Error("Missing API URL")
  }

  const res = await fetch(
    API_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  )
  return res.json()
}