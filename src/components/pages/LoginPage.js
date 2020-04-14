import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "../../forms/LoginForm";
import { login } from "../../actions/user";

class LoginPage extends React.Component {
  // submit = async data => {
  //   const user = await this.props.signUp(data);
  //   if (user) this.props.history.push("/dashboard");
  //   else {
  //     console.log();
  //   }
  // };

  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/dashboard"));
  //.catch(err => console.log(err));

  render() {
    return (
      <div>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { login })(LoginPage);
