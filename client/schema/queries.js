import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct {
    Product(id: 1) {
      name
      power
      description
      price
      quantity
      brand
      weight
      height
      width
      length
      model_code
      colour
      img_url
    }
  }
`;