import axios from "axios";

//const API_URI = process.env.API_URI;
const api = {
  user: {
    login: credentials => {
      return axios
        .post("http://localhost:8080/user/auth", { credentials })
        .then(res => {
          return res.data.user;
        });
    },
    signup: user => {
      console.log(user);
      return axios
        .post("http://localhost:8080/user/signup", { user })
        .then(res => {
          return res.data.user;
        });
    },
    confirm: token => {
      console.log(token);
      return axios
        .post("http://localhost:8080/user/confirm_email", { token })
        .then(res => {
          return res.data.user;
        });
    },
    requestPasswordReset: email => {
      console.log(email);
      return axios.post("http://localhost:8080/user/request_password_reset", {
        email
      });
    },
    resetPassword: data => {
      console.log(data);
      return axios.post("http://localhost:8080/user/reset_password", {
        data
      });
    }
  }
};

export default api;
