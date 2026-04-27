import shopifyClient from "./client"


export default async function getProduct(id: string) {
  const query = `
    query Product($id: ID!) {
  product(id: $id) {
    id
    title
    description
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
    variants(first: 10) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`

  const response = await shopifyClient(query, { id })
  console.log("data: ", response.data)
  return response.data
}