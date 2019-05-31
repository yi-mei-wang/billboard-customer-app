import React, { Component } from "react";
import styled from "styled-components";
import logo from "./images/adlogo.png";
import logo1 from "./images/adlogo1.png";

const Logo = styled.h3`
  font-family: "Staatliches", "open sans";
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  // justify-content: flex-start;
`;

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  toggleSidebar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { users, isSelf } = this.props;
    const { collapsed } = this.state;
    console.log(isSelf);
    const handleSelection = e => {
      this.props.history.push("/");
    };
    return (
      <div
        className="sidebar-container"
        style={{
          right: collapsed ? "-270px" : "0px",
          height: collapsed ? "100vh" : "100vh"
        }}
      >
        <button className="my-button" onClick={this.toggleSidebar}>
          {collapsed ? "☰" : "X"}
        </button>
        <div className="sidebar text-center d-flex flex-column align-items-center ">
          <img src={logo1} style={{ width: "200px", marginBottom: "10px" }} onClick={handleSelection} />
          {/* <img src={logo} style={{ width: "200px", marginBottom: "10px" }} onClick={handleSelection} /> */}
          <button className="w-100"
            onClick={() => {
              this.props.removeUser();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }
}
export default SideBar;
