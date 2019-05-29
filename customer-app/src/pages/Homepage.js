import React from "react";
import SideBar from "../components/SideBar";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Selection from "../components/Ads/Selection";
import NewAd from "../components/Ads/NewAd";
import ScheduledAds from "../components/Ads/ScheduledAds";
import ExpiredAds from "../components/Ads/ExpiredAds";
import BottomBar from "../components/Bottom";

const Main = styled.div`
  /* CHANGE STYLE */
  margin-bottom: 65px;
`;

class Homepage extends React.Component {
    render() {
        const { history, currentUser } = this.props;
        if (!currentUser) return <Redirect to="/login" />;
        let Container =
            this.props.match.url === "/" ? <Selection history={history} /> : <h1 />;

        return (
            <>
                <SideBar removeUser={this.removeUser} />
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
                    </Switch>

                    {Container}
                    <BottomBar history={history} />
                </Main>
            </>
        );
    }
}

export default Homepage;
