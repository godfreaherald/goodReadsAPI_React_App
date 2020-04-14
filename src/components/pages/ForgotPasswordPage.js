import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestPasswordReset } from "../../actions/user";
import ForgotPasswordForm from "../../forms/ForgotPasswordForm";
import { Message } from "semantic-ui-react";
class ForgotPaswordPage extends Component {
  state = {
    success: false
  };

  submit = data =>
    this.props
      .requestPasswordReset(data)
      .then(() => this.setState({ success: true }));

  render() {
    const { success } = this.state;
    return (
      <div>
        {!success ? (
          <ForgotPasswordForm submit={this.submit} />
        ) : (
          <Message>
            <Message.Header>
              Reset Password Link has been send to your Email.
            </Message.Header>
          </Message>
        )}
      </div>
    );
  }
}

ForgotPaswordPage.propTypes = {
  requestPasswordReset: PropTypes.func.isRequired
};
export default connect(null, { requestPasswordReset })(ForgotPaswordPage);
