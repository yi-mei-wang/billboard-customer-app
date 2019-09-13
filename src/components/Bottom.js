import React from "react";
import { ReactComponent as AddSvg } from "../images/add.svg";
import { ReactComponent as PastAds } from "../images/list.svg";
import { ReactComponent as FutureAds } from "../images/calendar.svg";
import { Bottom, BottomContainer, AddButton, AddButtonBackground, Button, NavLinks } from "./atoms"


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
      <BottomContainer>
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
      </BottomContainer>


      <AddButtonBackground />
      <AddButton>
        <AddSvg onClick={handleNew} />
      </AddButton>
      <small className="mt-1 text-center" style={{ "color": "white", "position": "fixed", "bottom": "14px", "left": "50%", "transform": "translate(-50%,0)" }}>New Ad</small>

    </>

  );
};

export default BottomBar;
