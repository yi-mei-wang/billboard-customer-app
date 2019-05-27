import React from "react";

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
        <div className="sidebar">
          {users &&
            users.map((user, index) => (
              <div key={index}>
                <img
                  src={`https://api.adorable.io/avatars/40/${
                    user.username
                  }.png`}
                  alt="Profile"
                  className="profile-pic m-2"
                />
                <p className="d-inline-block">
                  {user.username} {user.username === isSelf.username && "(you)"}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default SideBar;
