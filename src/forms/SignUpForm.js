import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import { Form, Message, Button } from "semantic-ui-react";

import InlineError from "../messages/InlineError";
class SignUpForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
    loading: false
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
    if (!isEmail(user.email)) errors.email = "Email cant be blank";
    if (!user.password) errors.password = "Password cant be blank";
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
        <Form.Field error={!!errors.email}>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={this.handleChange}
          />
          {errors.email && <InlineError error={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={this.handleChange}
          />
          {errors.password && <InlineError error={errors.password} />}
        </Form.Field>
        <Button primary>SignUp</Button>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default SignUpForm;
