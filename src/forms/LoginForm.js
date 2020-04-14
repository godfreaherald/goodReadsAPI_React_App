import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    this.setState({ loading: true });
    const errors = this.validate(data);
    this.setState({ errors: errors });
    if (Object.keys(errors).length == 0) {
      this.props.submit(data).catch(err => {
        console.log(err.response.data.errors);
        this.setState({ errors: err.response.data.errors, loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Invalid email.";
    if (!data.password) errors.password = "Password cannot be blank";
    return errors;
  };

  render() {
    const { loading, errors, data } = this.state;
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
        <Button primary>Login</Button>
        <Link to="/forgotPassword">Reset Forgotten Password</Link>
      </Form>
    );
  }
}
LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default LoginForm;
