import React from "react";
import PropTypes from "prop-types";

import { Form, Dropdown } from "semantic-ui-react";
import Axios from "axios";

class SearchBookForm extends React.Component {
  state = {
    query: "",
    loading: false,
    books: {},
    options: [],
  };

  onChange = (e, data) => {
    this.setState({ query: data.value });
    this.props.onBookSelect(this.state.books[data.value]);
  };

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({ query: data });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    Axios.get(`http://localhost:8080/books/search?q=${this.state.query}`)
      .then((res) => res.data.books)
      .then((books) => {
        const options = [];
        const bookHash = {};
        books.forEach((book) => {
          bookHash[book.goodReadsId] = book;
          options.push({
            key: book.goodReadsId,
            value: book.goodReadsId,
            text: book.title,
          });
        });
        this.setState({ loading: false, options, books: bookHash });
      });
  };

  render() {
    return (
      <div>
        <Form>
          <Dropdown
            search
            fluid
            placeholder="type the book"
            value={this.state.value}
            options={this.state.options}
            loading={this.state.loading}
            onSearchChange={this.onSearchChange}
            onChange={this.onChange}
          ></Dropdown>
        </Form>
      </div>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired,
};

export default SearchBookForm;
