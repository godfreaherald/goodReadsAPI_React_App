import axios from "axios";

const token = localStorage.getItem("eccomJwtToken");
console.log("token:::" + token);
//axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common = { Authorization: `bearer ${token}` };
export default axios;
