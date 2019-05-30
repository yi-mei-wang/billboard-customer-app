export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Navbar color="light" light>
          <Link to="/">
            <img
              src={logo}
              width="30"
              height="30"
              alt=""
              className="rounded-circle"
            />
          </Link>
          <div id="separator"> </div>

          <NavbarBrand className="mr-auto ml-2 my-auto">
            <Link to="/" style={{ color: "#000000", textDecoration: "none" }}>
              ADventure
            </Link>
          </NavbarBrand>

          <Nav tabs className="mr-auto">
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
          </Nav>
          <Button
            color="primary"
            onClick={() => {
              this.props.removeUser();
            }}
          >
            Logout
          </Button>
        </Navbar>
      </div>
    );
  }
}
