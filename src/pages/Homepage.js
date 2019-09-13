import React from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import BottomBar from "../components/Bottom";
import ExpiredAds from "../components/Ads/ExpiredAds";
import ResultMessage from "../components/ResultMessage";
import Navbar from "../components/Navbar";
import NewAd from "../components/Ads/NewAd";
import ScheduledAds from "../components/Ads/ScheduledAds";
import Selection from "../components/Ads/Selection";
import SideBar from "../components/SideBar";
import Summary from "../components/Ads/Summary";

const Main = styled.div`
  margin-bottom: 100px;
  background-url: url()
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
            <Route exact path="/result" component={props => <ResultMessage {...props} />} />
            <Route
              exact
              path="/:id"
              component={props => (
                <Summary {...props} orderId={props.match.params.id} />
              )}
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
