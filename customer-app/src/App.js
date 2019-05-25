import React from "react";
import logo from "./logo.svg";
import "./App.css";
import OrderForm from "./components/OrderForm.js";
import styled from "styled-components";

const Button = styled.button`
  background-color: blue;
  color: teal;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function App() {
  return (
    <>
      <Button>HELLO</Button>
      <OrderForm />
    </>
  );
}

export default App;
