import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, Message, Button } from "semantic-ui-react";

import InlineError from "../messages/InlineError";
class ResetPasswordForm extends Component {
  state = {
    data: {
      password: "",
      confirmPassword: "",
      token: this.props.token
    },

    loading: false,
    errors: {}
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleSubmit = e => {
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors: errors });
    if (Object.keys(errors).length == 0) {
      this.setState({ loading: true });
      this.props.submit(data).catch(err => {
        console.log(err.response.data.errors);
        this.setState({ errors: err.response.data.errors, loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  };

  validate = user => {
    const errors = {};
    if (!user.password) errors.email = "Password cant be blank";
    if (user.confirmPassword !== user.password)
      errors.password = "Passwords should match";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>SOmething went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.password}>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={this.handleChange}
          />
          {errors.password && <InlineError error={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={this.handleChange}
          />
          {errors.password && <InlineError error={errors.password} />}
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};
export default ResetPasswordForm;
