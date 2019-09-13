import React, { Component } from "react";
import styled from "styled-components";
import logo from "./images/adlogo.png";
import logo1 from "./images/adlogo1.png";

const Logo = styled.h3`
  font-family: "Staatliches", "open sans";
`;

const Button = styled.button`
  text-align: center;
  color: #474350;
  background-color: #d79922;
  border: none;
  /* display: flex;
  justify-content: flex-start; */
  height: 30px;
  width: 100px;
`;

const Welcome = styled.p`
  line-height: 0.5rem;
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
    const handleSelection = e => {
      this.props.history.push("/");
    };
    const username = localStorage.getItem("username");
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
          <img
            src={logo1}
            style={{ width: "200px", marginBottom: "10px" }}
            onClick={handleSelection}
          />
          {/* <img src={logo} style={{ width: "200px", marginBottom: "10px" }} onClick={handleSelection} /> */}
          <Welcome className={"mt-4"}> Welcome back,</Welcome>
          <Welcome className={"mb-4"}>
            <i>{username}!</i>
          </Welcome>
          <Button
            className=""
            onClick={() => {
              this.props.removeUser();
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }
}
export default SideBar;
