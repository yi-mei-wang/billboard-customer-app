import React from "react";
import styled from "styled-components";
import logo from "./images/adlogo.png";
import logo1 from "./images/adlogo1.png";

const Logo = styled.h3`
  font-family: "Staatliches", "open sans";
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
        <div className="sidebar text-center">
          {/* <Logo>Advengers</Logo> */}
          <img src={logo1} style={{ width: "200px", marginBottom: "10px" }} />
          <img src={logo} style={{ width: "200px" }} />
          <button
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
