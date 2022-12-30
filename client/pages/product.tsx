import React from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Badge from '@mui/material/Badge';
import { GET_PRODUCT } from '../schema/queries.js'
import { useQuery, gql } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f050f8',
      contrastText: "#100030"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "&.Mui-disabled": {
            background: "#600e6b",
            color: "#fff"
          }
        }
      }
    }
  }
});


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

const PurchaseDetails = styled.span`
  display: flex;
  justify-content: space-between;
`;

const PurchaseQty = styled.div`
  
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

export default function Product() {
  const [quantity, setQuantity] = React.useState(1);
  const [basketQty, setBasketQty] = React.useState(0);
  const { loading, error, data } = useQuery(GET_PRODUCT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const incrementQty = () => {
    setQuantity(quantity + 1)
  }

  const decrementQty = () => {
    setQuantity(quantity - 1)
  }

  const updateBasket = () => {
    setBasketQty(basketQty + quantity)
    setQuantity(1)
  }

  return <div>
    <ThemeProvider theme={theme}>
      <Navbar>
        <Button size="small">
          <img src='/octopus-logo.svg' alt='octopus logo' style={{ width: 180 }}/>
        </Button>
        <Badge color="primary" badgeContent={basketQty} title="Basket items">
          <IconButton size="small">
            <img src='/basket.svg' alt='basket' style={{ width: 25 }}/>
          </IconButton>
        </Badge>
      </Navbar>
      <ProductImage>
        <img src='/philips-plumen.jpg' alt='Philips Plumen bulb' style={{ width: "100%" }}/>
      </ProductImage>
      <ProductDetails>
        <ProductName title="Product">{ data.Product.name }</ProductName>
        <ProductOverview>{ data.Product.power } // Packet of { data.Product.quantity }</ProductOverview>
        <PurchaseDetails>
          <ProductHeader>£{ data.Product.price/100 }</ProductHeader>
          <PurchaseDetails>
            <Button
              variant="contained" 
              style={{ margin:"10px", maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} 
              disabled={quantity == 1}
              onClick={decrementQty}>
                -
            </Button>
            <span>
              Qty
              <PurchaseQty title="Current quantity">
                { quantity }
              </PurchaseQty>
            </span>
            <Button
              variant="contained" 
              style={{ margin:"10px", maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
              onClick={incrementQty}>
                +
            </Button>
          </PurchaseDetails>
        </PurchaseDetails>
        <Button
          variant="contained"
          style={{ 
            width: "100%", 
            padding: "15px", 
            marginTop:"20px", 
            marginBottom:"20px" 
          }}
          onClick={updateBasket}>
          Add to cart
        </Button>
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
            <tbody>
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
            </tbody>
          </SpecificationTable>
        </ProductDetails>
      </ProductSpecifications>
      <PageCopy>
        Octopus Energy Ltd is a company registered in England and Wales.
        Registered number: 09263424. Registered office 33 Holborn,
        London, EC1N 2HT. Trading office: 20-24 Broadwick Street, London,
        W1F 8HT
      </PageCopy>
    </ThemeProvider>
  </div>
}
