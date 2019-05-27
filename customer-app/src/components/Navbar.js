import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

export default class NavBar extends React.Component {
  state = {
    collapsed: true
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { history } = this.props;

    return (
      <div>
        <Navbar color="light" light style={{ height: "50px" }}>
          <Link to="/">
            <img
              src={logo}
              width="30"
              height="30"
              alt=""
              className="rounded-circle"
            />
          </Link>
          <NavbarBrand className="mr-auto ml-2 my-auto">
            <Link to="/" style={{ color: "#000000", textDecoration: "none" }}>
              ADventure
            </Link>
          </NavbarBrand>

          {/* <NavbarToggler onClick={this.toggleNavbar} className="mr-2" /> <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink
                  onClick={() => history.push("/new")}
                  style={{ textDecoration: "none" }}
                >
                  New AD
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => history.push("/scheduled")}
                  style={{ textDecoration: "none" }}
                >
                  Scheduled AD
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => history.push("/expired")}
                  style={{ textDecoration: "none" }}
                >
                  Expired AD
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    this.props.removeUser();
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse> */}
        </Navbar>
      </div>
    );
  }
}
