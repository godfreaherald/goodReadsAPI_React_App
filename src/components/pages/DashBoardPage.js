import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ConfirmEmailMessage from "../../messages/ConfirmEmailMessage";
import AddBookCtA from "../pages/AddBookCtA";
import { allBooksSelector } from "./../../reducers/books";
class DashboardPage extends Component {
  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {isConfirmed && books.length == 0 && <AddBookCtA />}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  console.log(state.user);
  return {
    isConfirmed: !!state.user.isConfirmed,
    books: allBooksSelector(state),
  };
}
DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default connect(mapStateToProps)(DashboardPage);
