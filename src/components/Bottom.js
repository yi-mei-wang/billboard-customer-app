import React from "react";
import styled from "styled-components";
import { ReactComponent as AddSvg } from "./images/add.svg";
import { ReactComponent as PastAds } from "./images/list.svg";
import { ReactComponent as FutureAds } from "./images/calendar.svg";

const Bottom = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #4056a1;
  color: white;
  position: fixed;
  bottom: 0;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5em;

  svg {
    height: 32px;
    width: 32px;
  }
`;

const AddButtonContainer = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  bottom: 25px;
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
  background-color: #4056a1;
  margin-right: auto;
  margin-left: auto;
  position: fixed;
  left: 50%;
  bottom: 29px;
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

const BottomBar = ({ history }) => {
  const handleExpired = e => {
    history.push("/expired");
  };
  const handleScheduled = e => {
    history.push("/scheduled");
  };
  const handleNew = e => {
    history.push("/new");
  };
  return (
    <>
      <Bottom className={"px-5"}>
        <Button>
          <PastAds onClick={handleExpired} />
          <small className="mt-1 text-center">Past Ads</small>
        </Button>

        <Button>
          <FutureAds onClick={handleScheduled} style={{ zIndex: 10 }} />
          <small className="mt-1 text-center">Future Ads</small>
        </Button>
      </Bottom>
      {/* <NavLinks>Past Ads</NavLinks> */}
      {/* <div
      className="text-center"
      style={{ width: "100vw", position: "fixed", bottom: "25px" }}
    > */}
      <AddButtonContainer />
      <AddButton>
        <AddSvg onClick={handleNew} />
      </AddButton>
      {/* </div> */}
    </>
  );
};

export default BottomBar;
