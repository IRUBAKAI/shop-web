export const GRAPHQL_API = "http://localhost:4000/graphql";
export const GET_CATEGORY = `
    query category{
        currencies
        categories {
            name
            products {
                id
                name
                inStock
                description
                gallery
                category
                brand
                prices {
                    currency
                    amount
                }
                attributes {
                    id 
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
  `;
export const GET_CURRENCY = `
    query {
        currencies
    }
  `;
