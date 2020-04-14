import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, Message, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
class ForgotPasswordForm extends Component {
  state = {
    email: "",

    loading: false,
    errors: {}
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState({ email: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({ loading: true });
    const errors = this.validate(email);
    this.setState({ errors: errors });
    if (Object.keys(errors).length == 0) {
      this.props.submit(email).catch(err => {
        console.log(err.response.data.errors);
        this.setState({ errors: err.response.data.errors, loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  };

  validate = email => {
    const errors = {};
    if (!isEmail(email)) errors.email = "Invalid email.";

    return errors;
  };

  render() {
    const { loading, errors, email } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}

        <Form.Field error={!!errors.email}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          {errors.email && <InlineError error={errors.email} />}
        </Form.Field>

        <Button primary>Send Request</Button>
      </Form>
    );
  }
}
ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default ForgotPasswordForm;
