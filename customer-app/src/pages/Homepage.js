import React from "react";
import Navbar from "../components/Navbar.js";
import { Redirect } from "react-router-dom";
import { Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import Selection from "../components/Ads/Selection";
import OrderForm from "../components/OrderForm";
import ScheduledAds from "../components/Ads/ScheduledAds";
import ExpiredAds from "../components/Ads/ExpiredAds";
import BottomBar from "../components/Bottom";

const Main = styled.div`
  top: 50px;
  height: 88vh;
  overflow: scroll;
`;

class Homepage extends React.Component {
  render() {
    const { history, currentUser } = this.props;
    if (!currentUser) return <Redirect to="/login" />;
    let Container =
      this.props.match.url === "/" ? <Selection history={history} /> : <h1 />;

    return (
      <>
        {/* <Navbar history={history} removeUser={this.props.removeUser} /> */}
        <Main>
          <Switch>
            <Route
              exact
              path="/new"
              component={props => <OrderForm {...props} />}
            />
            <Route
              exact
              path="/scheduled"
              component={props => <ScheduledAds {...props} />}
            />
            <Route
              exact
              path="/expired"
              component={props => <ExpiredAds {...props} />}
            />
          </Switch>

          {Container}
          <BottomBar history={history} />
        </Main>
      </>
    );
  }
}

export default Homepage;
