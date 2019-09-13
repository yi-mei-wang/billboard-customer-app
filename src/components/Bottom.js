import React from "react";
import { ReactComponent as AddSvg } from "../images/add.svg";
import { ReactComponent as PastAds } from "../images/list.svg";
import { ReactComponent as FutureAds } from "../images/calendar.svg";
import { Bottom, AddButton, AddButtonContainer, Button, NavLinks } from "./atoms"


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

      <AddButtonContainer />
      <AddButton>
        <AddSvg onClick={handleNew} />
      </AddButton>

    </>
  );
};

export default BottomBar;
