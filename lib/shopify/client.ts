// lib/shopify/client.ts

export default async function shopifyClient(query: string, variables = {}) {
  const STOREFRONT_TOKEN = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN
  const API_URL = process.env.EXPO_PUBLIC_SHOPIFY_URL

  if (!STOREFRONT_TOKEN) {
    throw new Error("Missing Storefront Access Token in build env: EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN")
  }

  if (!API_URL) {
    throw new Error("Missing Shopify API URL in build env: EXPO_PUBLIC_SHOPIFY_URL")
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ""}`);
    }

    const data = await response.json();

    if (data.errors?.length) {
      const message = data.errors.map((error: { message?: string }) => error.message).filter(Boolean).join(", ");
      throw new Error(`Shopify GraphQL error: ${message || "Unknown GraphQL error"}`);
    }

    return data;
  } catch (error) {
    console.error("Shopify Client Fetch Error:", error);
    throw error;
  }
}
