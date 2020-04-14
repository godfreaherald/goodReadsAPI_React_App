import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Message, Icon } from "semantic-ui-react";
import { confirm } from "../../actions/user";

class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false,
    errors: {}
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(err =>
        this.setState({
          loading: false,
          success: false,
          errors: err.response.data.errors
        })
      );
  }

  render() {
    const { loading, success, errors } = this.state;
    return (
      <div>
        {loading && (
          <Message icon loading>
            <Icon name="circle notched" />
            <Message.Header>Verifying your Email</Message.Header>
          </Message>
        )}

        {!loading && success && (
          <Message icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>Your Email Confirmed</Message.Header>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Message.Content>
          </Message>
        )}
        {!loading && !success && errors.global && (
          <Message icon>
            <Icon name="error" />
            <Message.Content>
              <Message.Header>{errors.global}</Message.Header>
              <Link to="/signup">Sign Up again</Link>
            </Message.Content>
          </Message>
        )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  }).isRequired,
  confirm: PropTypes.func.isRequired
};
export default connect(null, { confirm })(ConfirmationPage);
