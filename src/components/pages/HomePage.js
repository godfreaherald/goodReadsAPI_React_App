import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../actions/user";

const HomePage = ({ isAuthenticated, logout }) => {
  return (
    <div>
      <h1> HomePage</h1>
      {isAuthenticated ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <div>
          <div>
            <Link to="/login">Login</Link>
          </div>
          OR
          <div>
            <Link to="/signup">SignUp</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state.user);
  return { isAuthenticated: !!state.user.token };
};

HomePage.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
