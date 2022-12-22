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

const ImageWrapper = styled.div`
  width: 90%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
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
    <ImageWrapper>
      <img src='/philips-plumen.jpg' alt='Philips Plumen bulb' style={{ width: "100%" }}/>
    </ImageWrapper>
  </div>;
}
