import React from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import BottomBar from "../components/Bottom";
import ExpiredAds from "../components/Ads/ExpiredAds";
import Mes from "../components/Mes";
import Navbar from "../components/Navbar";
import NewAd from "../components/Ads/NewAd";
import ScheduledAds from "../components/Ads/ScheduledAds";
import Selection from "../components/Ads/Selection";
import SideBar from "../components/SideBar";
import Summary from "../components/Ads/Summary";

const Main = styled.div`
  margin-bottom: 70px;
`;

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history, currentUser } = this.props;
    if (!currentUser) return <Redirect to="/login" />;
    let Container =
      this.props.match.url === "/" ? <Selection history={history} /> : <h1 />;

    return (
      <>
        {/* <Navbar history={history} removeUser={this.props.removeUser} /> */}
        <SideBar history={history} removeUser={this.props.removeUser} />

        <Main>
          <Switch>
            <Route
              exact
              path="/new"
              component={props => <NewAd {...props} />}
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
            <Route
              path="/:id"
              component={props => (
                <Summary {...props} orderId={props.match.params.id} />
              )}
            />
            <Route exact path="/mes" component={props => <Mes {...props} />} />
          </Switch>

          {Container}
          <BottomBar history={history} />
        </Main>
      </>
    );
  }
}

export default Homepage;
