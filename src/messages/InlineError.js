import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ error }) => {
  return <span style={{ color: "#ae5856" }}>{error}</span>;
};
InlineError.propTypes = {
  error: PropTypes.string.isRequired
};

export default InlineError;
