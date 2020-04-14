import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUp } from "../../actions/user";
import SignUpForm from "../../forms/SignUpForm";
class SignUpPage extends Component {
  submit = data =>
    this.props.signUp(data).then(() => this.props.history.push("/dashboard"));

  render() {
    return (
      <div>
        <SignUpForm submit={this.submit} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signUp: PropTypes.func.isRequired
};
export default connect(null, { signUp })(SignUpPage);
