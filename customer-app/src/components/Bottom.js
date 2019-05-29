import React from "react";
import { Link } from "react-router-dom";
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

  svg {
    height: 50%;
    width: 50%;
    fill: white;
  }
`;

const NavLinks = styled.p`
  bottom: 50px;
  font-size: 80px;
  color: red;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  z-index: 11;
`;

const BottomBar = props => {
  const handleExpired = e => {
    props.history.push("/expired");
  };
  const handleScheduled = e => {
    props.history.push("/scheduled");
  };
  const handleNew = e => {
    props.history.push("/new");
  };
  return (
    <>
      <Bottom className={"px-5"}>
        <span>
          <Button>
            <PastAds onClick={handleExpired} />
          </Button>
        </span>

        <span>
          <Button>
            <FutureAds onClick={handleScheduled} style={{ zIndex: 10 }} />
          </Button>
        </span>
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
