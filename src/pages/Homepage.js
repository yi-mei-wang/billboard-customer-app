import React from "react";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import BottomBar from "../components/Bottom";
import ExpiredAds from "../components/ads/ExpiredAds";
import ResultMessage from "../components/ResultMessage";
import NewAd from "../components/ads/NewAd";
import ScheduledAds from "../components/ads/ScheduledAds";
import Selection from "../components/ads/Selection";
import Summary from "../components/ads/Summary";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import background from "../images/background.jpg"

const Main = styled.div`
  // padding-top: 50px;
  background-image: url(${background});
  background-size: 100vw;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
`;

const CallToAction = styled.div`
  color: #fff;
  padding: 1.5rem;
  padding-right: 50px;
`;

const Heading = styled.h1`
  background-color: #3b4158;
  display: inline-block;
`;

const Subheading = styled.h3`
  background-color: white;
  color: #3b4158;
`;

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history, currentUser } = this.props;

    if (!currentUser) return <Redirect to="/login" />;

    let Container =
      this.props.match.url === "/" ?
        // <Selection history={history} /> 
        <CallToAction>
          <Heading className="my-1 p-2">Reach out to</Heading>
          <Heading className="p-2"> your audience today!</Heading>
          <Subheading className="my-2 p-2">Schedule an ad with us now.</Subheading>
        </CallToAction>
        :
        <h1 />;

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
