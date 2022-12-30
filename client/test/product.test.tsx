import { render, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Product from "../pages/product";
import { GET_PRODUCT } from "../schema/queries";

const mocks = [
  {
    request: {
      query: GET_PRODUCT,
      variables: {}
    },
    result: {
      data: {
        Product: {
          name: "Product Name",
          power: "Product Power",
          description: "This is the product description",
          price: "100",
          quantity: "10",
          brand: "Test Brand",
          weight: "15",
          height: "20",
          width: "25",
          length: "30",
          model_code: "Test Code",
          colour: "White",
          img_url: "test.jpg"
        }
      }
    }
  }
];

test("should be able to increase and decrease product quantity", async () => {
  const { findByText, getByText, getByTitle } = render(
    <MockedProvider mocks={mocks}>
      <Product />
    </MockedProvider>
  );

  await findByText("Product Name");

  const increaseQuantity = getByText("+");

  const currentQuantity = getByTitle("Current quantity");
  expect(currentQuantity).toHaveTextContent("1");

  fireEvent.click(increaseQuantity);
  expect(currentQuantity).toHaveTextContent("2");

  const decreaseQuantity = getByText("-");

  fireEvent.click(decreaseQuantity);
  expect(currentQuantity).toHaveTextContent("1");
});

test("should be able to add items to the basket", async () => {
  const { findByText, getByText, getByTitle } = render(
    <MockedProvider mocks={mocks}>
      <Product />
    </MockedProvider>
  );

  await findByText("Product Name");
  const increaseQuantity = getByText("+");

  const currentQuantity = getByTitle("Current quantity");

  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);

  expect(currentQuantity).toHaveTextContent("4");

  const addToBasketElement = getByText("Add to cart");
  fireEvent.click(addToBasketElement);

  const basketItems = getByTitle("Basket items");
  expect(basketItems).toHaveTextContent("4");
});

test("should show a loading screen instead of full page content until the product info is available", async() => {
  const { queryByText, queryByTitle } = render(
    <MockedProvider>
      <Product />
    </MockedProvider>
  );

  expect(queryByText('Loading...')).toBeTruthy();
  expect(queryByTitle('Product')).toBeNull();
});

test("should show full page content instead of loading screen if product info is available", async() => {
  const { findByText, queryByText, queryByTitle } = render(
    <MockedProvider mocks={mocks}>
      <Product />
    </MockedProvider>
  );

  await findByText("Product Name");
  expect(queryByText('Loading...')).toBeNull();
  expect(queryByTitle('Product')).toBeTruthy();
});

test("should not be able to decrease product quantity below 1", async() => {
  const { findByText, getByText, getByTitle } = render(
    <MockedProvider mocks={mocks}>
      <Product />
    </MockedProvider>
  );

  await findByText("Product Name");

  const decreaseQuantity = getByText("-");

  const currentQuantity = getByTitle("Current quantity");
  expect(currentQuantity).toHaveTextContent("1");
  expect(decreaseQuantity).toBeDisabled();

  fireEvent.click(decreaseQuantity);
  expect(currentQuantity).toHaveTextContent("1");
});

test("should be able to add multiple batches of items to the basket and combine the quantites", async() => {
  const { findByText, getByText, getByTitle } = render(
    <MockedProvider mocks={mocks}>
      <Product />
    </MockedProvider>
  );

  await findByText("Product Name");
  const increaseQuantity = getByText("+");

  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);

  const addToBasketElement = getByText("Add to cart");
  fireEvent.click(addToBasketElement);

  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(increaseQuantity);
  fireEvent.click(addToBasketElement);

  const basketItems = getByTitle("Basket items");
  expect(basketItems).toHaveTextContent("8");
});

