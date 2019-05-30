import React from "react";

class Selection extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="d-flex justify-content-around">
        <button
          className="selectionBtn"
          id="greybtn"
          onClick={() => history.push("/expired")}
        >
          Expired ADs
        </button>
        <button
          className="selectionBtn"
          id="goldbtn"
          onClick={() => history.push("/new")}
        >
          New AD
        </button>
        <button
          className="selectionBtn"
          id="bluebtn"
          onClick={() => history.push("/scheduled")}
        >
          Scheduled ADs
        </button>
      </div>
    );
  }
}
export default Selection;
