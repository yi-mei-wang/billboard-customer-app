import styled from "styled-components";

const Underline = styled.span`
background-color: #ffbf00;
width: 200px;
height: 10px;
display: inline-block;
margin-bottom: 0.5rem;
`

const BottomContainer = styled.div`
  width: 100vw;
  height: 90px;
  background-color: #3b4158;
  border-radius: 10px 10px 0px 0px;
  position: fixed;
  bottom: 0;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);
`;

const Bottom = styled.div`
  width: 100vw;
  height: 80px;
  background-color: #3b4158;
  color: white;
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5em;

  svg {
    height: 32px;
    width: 32px;
  }
`;

const AddButtonBackground = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  bottom: 46px;
  background-color: white;
  margin-right: auto;
  margin-left: auto;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
`;

const AddButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #3b4158;
  margin-right: auto;
  margin-left: auto;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.5s;

  svg {
    height: 50%;
    width: 50%;
    fill: white;
  }

  @keyframes wiggle {
    0% {
      transform: rotate(10deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(20deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  &:hover {
    & {
      width: 58px;
      height: 58px;
    }

    svg {
      animation: wiggle 1s 1;
    }
  }
`;

const NavLinks = styled.p`
  bottom: 50px;
  font-size: 80px;
  color: red;
`;

const Button = styled.button`
  /* width: 50px; */
  /* height: 50px; */
  background-color: transparent;
  border: none;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  small {
    color: white;
  }

  &:hover {
    small {
      color: #b4c5f2;
    }

    svg {
      transform: scale(0.9);
    }
  }
`;

export { Underline, Bottom, BottomContainer, AddButton, AddButtonBackground, Button, NavLinks };