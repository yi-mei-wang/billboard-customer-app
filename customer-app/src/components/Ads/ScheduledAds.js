import React from "react";

class ScheduledAds extends React.Component {
  render() {
    return (
      <>
        <div className={"px-4"}>
          <h2 className={"pt-3 m-0"}>Scheduled ADs</h2>
          <span
            className={"underline mb-2"}
            style={{
              backgroundColor: "#ffbf00",
              width: "200px",
              height: "10px",
              display: "inline-block"
            }}
          />
        </div>
      </>
    );
  }
}
export default ScheduledAds;
