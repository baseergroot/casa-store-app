interface Product {
    node: {
        id: string;
        title: string;
        description: string;
        handle: string;
        productType: string;
        images: {
            edges: {
                node: {
                    url: string;
                    altText: string;
                }
            }[]
        }
        priceRange: {
            minVariantPrice: {
                amount: number;
                currencyCode: string;
            }
        }
    }
}

export type { Product } 

// const product: Product = {"node": 
//   {
//     "description": "Ocean blue cotton shirt with a narrow collar and buttons down the front and long sleeves. Comfortable fit and tiled kalidoscope patterns.", 
//     "handle": "ocean-blue-shirt", 
//     "id": "gid://shopify/Product/9095397834985", 
//     "images": {"edges": [{ node: { url: "", altText: "" }}]}, 
//     "priceRange": {"minVariantPrice": {amount: 0, currencyCode: ""}}, 
//     "productType": "shirt", 
//     "title": "Ocean Blue Shirt"}
// }