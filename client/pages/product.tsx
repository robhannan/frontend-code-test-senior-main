import React from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import { useQuery, gql } from '@apollo/client';

const Navbar = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const ProductImage = styled.div`
  width: 90%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
`;

const ProductDetails = styled.section`
  padding-left: 20px;
  padding-right: 20px;
`;

const ProductName = styled.h1`
  font-size: x-large;
`;

const ProductOverview = styled.p`
  
`;
const ProductHeader = styled.h2`
  font-size: large;
`;

const ProductDescription = styled.section`
  padding-top: 10px;
  padding-bottom: 5px;
  background-color: var(--hemocyanin);
`;

const ProductSpecifications = styled.section`
  margin-bottom: 15px;
`;

const SpecificationTable = styled.table`
  border-spacing: 15px;
`;

const PageCopy = styled.section`
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: x-small;
  background-color: var(--hemocyanin);
`;

const GET_PRODUCT = gql`
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

export default function Product() {
  const { loading, error, data } = useQuery(GET_PRODUCT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <div>
      <Navbar>
        <Button size="small">
          <img src='/octopus-logo.svg' alt='octopus logo' style={{ width: 180 }}/>
        </Button>
        <IconButton size="small">
          <img src='/basket.svg' alt='basket' style={{ width: 25 }}/>
        </IconButton>
      </Navbar>
      <ProductImage>
        <img src='/philips-plumen.jpg' alt='Philips Plumen bulb' style={{ width: "100%" }}/>
      </ProductImage>
      <ProductDetails>
        <ProductName>{ data.Product.name }</ProductName>
        <ProductOverview>{ data.Product.power } // Packet of { data.Product.quantity }</ProductOverview>
        <ProductHeader>£12.99</ProductHeader>
      </ProductDetails>
      <ProductDescription>
        <ProductDetails>
          <ProductHeader>Description</ProductHeader>
          <p>{ data.Product.description }</p>
        </ProductDetails>
      </ProductDescription>
      <ProductSpecifications>
        <ProductDetails>
          <ProductHeader>Specifications</ProductHeader>
          <SpecificationTable>
            <tr>
              <td>Brand</td>
              <td>{ data.Product.brand }</td>
            </tr>
            <tr>
              <td>Item weight</td>
              <td>{ data.Product.weight }</td>
            </tr>
            <tr>
              <td>Dimensions</td>
              <td>{ data.Product.height } x { data.Product.width } x { data.Product.length }</td>
            </tr>
            <tr>
              <td>Item Model number</td>
              <td>{ data.Product.model_code }</td>
            </tr>
            <tr>
              <td>Colour</td>
              <td>{ data.Product.colour }</td>
            </tr>
          </SpecificationTable>
        </ProductDetails>
      </ProductSpecifications>
      <PageCopy>
        Octopus Energy Ltd is a company registered in England and Wales.
        Registered number: 09263424. Registered office 33 Holborn,
        London, EC1N 2HT. Trading office: 20-24 Broadwick Street, London,
        W1F 8HT
      </PageCopy>
    </div>
}
