import shopifyClient from "./client"


export default async function getAllProducts() {
  const query = `
    query AllProducts {
  products(first: 10) {
    edges {
      node {
        id
        title
        description
        handle
        productType
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`

  const response = await shopifyClient(query)
  console.log("data", response.data.products.edges[0])
  return response.data.products.edges
}