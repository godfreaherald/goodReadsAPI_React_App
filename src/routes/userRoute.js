import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

GuestRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.email
  };
};

export default connect(mapStateToProps)(GuestRoute);
