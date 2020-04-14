// import _ from "lodash"; es6
const { _ } = require("lodash");
const parseError = function ({ errors }) {
  let result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });
  return result;
};

module.exports = parseError; //es5
// export default parseError; es6 with babel enabled
