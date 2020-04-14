import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
};

UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.email
  };
};

export default connect(mapStateToProps)(UserRoute);
