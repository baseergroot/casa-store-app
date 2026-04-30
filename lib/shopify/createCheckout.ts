import shopifyClient from "./client";

const query = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        message
        field
      }
    }
  }
`;

const getCheckoutUrl = async (lineItems) => {
  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId, // Cart API uses 'merchandiseId'
        quantity: item.quantity
      }))
    }
  };

  const res = await shopifyClient(query, variables);
  console.log({checkoutRes: res})
  return res;
};

export default getCheckoutUrl;
