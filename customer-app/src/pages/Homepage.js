import React from "react";
import Navbar from "../components/Navbar.js";
import { Redirect } from "react-router-dom";
import { Route, Switch, Link } from "react-router-dom";
import Selection from "../components/Ads/Selection";
import OrderForm from "../components/OrderForm";
import ScheduledAds from "../components/Ads/ScheduledAds";
import ExpiredAds from "../components/Ads/ExpiredAds";





class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { history, currentUser } = this.props;
        if (!currentUser) return <Redirect to='/login' />;
        let Container = this.props.match.url == "/" ? <Selection history={history} /> : <h1></h1>;

        return (

            <div>
                <Navbar history={history} removeUser={this.props.removeUser} />

                <Switch>
                    <Route exact path="/new" component={props => <OrderForm {...props} />} />
                    <Route exact path="/scheduled" component={props => <ScheduledAds {...props} />} />
                    <Route exact path="/expired" component={props => <ExpiredAds {...props} />} />
                </Switch>

                {Container}

            </div>
        )
    }
}

export default Homepage;