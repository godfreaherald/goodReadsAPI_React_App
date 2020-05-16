import React from "react";
import PropTypes from "prop-types";

import { Form, Dropdown } from "semantic-ui-react";
import Axios from "../utils/setAuthorisationHeader";

class SearchBookForm extends React.Component {
  state = {
    query: "",
    loading: false,
    books: {},
    options: [],
  };

  onChange = (e, data) => {
    console.log(e.target.value);
    this.setState({ query: data.value });
    console.log(data.value);
    this.props.onBookSelect(this.state.books[data.value]);
  };

  onSearchChange = (e, data) => {
    console.log(data);
    console.log(e.target.value);
    clearTimeout(this.timer);
    this.setState({ query: data });

    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    Axios.get(`http://localhost:8080/books/search?q=${this.state.query}`)
      .then((res) => res.data.books)
      .then((books) => {
        const options = [];
        const bookHash = {};
        books.forEach((book) => {
          bookHash[book.goodReadsId] = book;
          console.log(book);
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
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired,
};

export default SearchBookForm;
