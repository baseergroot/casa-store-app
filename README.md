# Casa Store

Casa Store is a mobile storefront built with Expo and React Native. It pulls products from the Shopify Storefront API, shows product details, lets users add items to cart, and opens Shopify checkout from the app.

This project was built as a learning exercise around mobile UI, Shopify integration, and Expo native builds.

## Releases

Android builds are published on the [GitHub Releases](https://github.com/baseergroot/expo-shopify/releases) page.

## Features

- Product listing from Shopify Storefront API
- Product detail screen
- Basic category filtering
- Local cart storage with AsyncStorage / Secure Store helpers
- Checkout handoff to Shopify

## Tech Stack

- Expo
- React Native
- Expo Router
- TypeScript
- NativeWind
- Shopify Storefront API

## Project Structure

- `app/` route-based screens
- `components/` UI components
- `lib/shopify/` Shopify queries and client helpers
- `lib/secureStore/` local cart persistence
- `types/` shared TypeScript types

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm start
```



If you want a local native Android project, generate it with:

```bash
pnpm exec expo prebuild -p android
```

## Environment Variables

Create a `.env` file with:

```bash
EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN=your_token
EXPO_PUBLIC_SHOPIFY_URL=https://your-store.myshopify.com/api/2026-04/graphql.json
```

The app reads these values at build time.

## Checkout Access

This project uses a Shopify dev store. When checkout opens in the browser, Shopify may ask for the storefront password.

Use this password:

```bash
showpa
```

## Notes

- Product data comes directly from Shopify, so the app depends on valid Storefront API credentials.
- The checkout flow is handed off to Shopify in the browser rather than completed natively inside the app.
- For Expo SDK 54 compatibility, AsyncStorage is pinned to `2.2.0`.

## Screens

- Home screen with product feed
- Product details
- Cart
- Shopify checkout redirect
