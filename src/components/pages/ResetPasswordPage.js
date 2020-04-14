import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/user";
import ResetPasswordForm from "../../forms/ResetPasswordForm";
//import { Message } from "semantic-ui-react";
class ResetPaswordPage extends Component {
  state = {
    token: this.props.match.params.token,
  };

  submit = (data) =>
    this.props
      .resetPassword(data)
      .then(() => this.props.history.push("/login"));

  render() {
    return (
      <div>
        <ResetPasswordForm submit={this.submit} token={this.state.token} />
      </div>
    );
  }
}

ResetPaswordPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetPassword: PropTypes.func.isRequired,
};
export default connect(null, { resetPassword })(ResetPaswordPage);
