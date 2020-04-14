import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import GuestRoute from "./routes/guestRoute";
import UserRoute from "./routes/userRoute";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import DashboardPage from "./components/pages/DashBoardPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import NavigationBar from "./components/pages/NavigationBar";
import AddNewBookPage from "./components/pages/AddNewBookPage";

function App({ location, isAuthenticated }) {
  return (
    <Router>
      {isAuthenticated && <NavigationBar />}
      <Switch>
        <Route location={location} path="/" exact component={HomePage} />
        <GuestRoute
          location={location}
          path="/login"
          exact
          component={LoginPage}
        />
        <GuestRoute
          location={location}
          path="/signup"
          exact
          component={SignUpPage}
        />
        <GuestRoute
          location={location}
          path="/forgotPassword"
          exact
          component={ForgotPasswordPage}
        />

        <GuestRoute
          location={location}
          path="/resetPassword/:token"
          exact
          component={ResetPasswordPage}
        />

        <UserRoute
          location={location}
          path="/confirmation/:token"
          exact
          component={ConfirmationPage}
        />

        <UserRoute
          location={location}
          path="/dashboard"
          exact
          component={DashboardPage}
        />
        <UserRoute
          location={location}
          path="/book/new"
          exact
          component={AddNewBookPage}
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.user.email,
  };
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(App);
