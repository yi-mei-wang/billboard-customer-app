import React from "react";
import styled from "styled-components";

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
        style={{ right: collapsed ? "-270px" : "0px" }}
      >
        <button className="my-button" onClick={this.toggleSidebar}>
          {collapsed ? "☰" : "X"}
        </button>
        <div className="sidebar text-center">
          <Logo>Advengers</Logo>
        </div>
      </div>
    );
  }
}
export default SideBar;
