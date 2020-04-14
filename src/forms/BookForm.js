import React from "react";
import { Grid, Form, Button, Image } from "semantic-ui-react";

import InlineError from "../messages/InlineError";
class BookForm extends React.Component {
  state = {
    book: {
      goodreadsId: this.props.book.goodreadsId,
      author: this.props.book.author,
      pages: this.props.book.pages,
      cover: this.props.book.covers[0],
      title: this.props.book.title,
    },
    covers: this.props.book.covers,
    loading: false,
    errors: {},
    index: 0,
  };

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({
      index: newIndex,
      book: { ...this.state.book, cover: covers[newIndex] },
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ data: { ...this.state.book, [name]: value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { book } = this.state;

    const errors = this.validate(book);
    this.setState({ errors: errors });
    if (Object.keys(errors).length == 0) {
      this.setState({ loading: true });
      this.props.submit(book).catch((err) => {
        console.log(err.response.data.errors);
        this.setState({ errors: err.response.data.errors, loading: false });
      });
    }
  };

  validate = (book) => {
    const errors = {};
    if (!book.author) errors.author = "cannot be blank.";
    if (!book.title) errors.title = "cannot be blank.";
    if (!book.pages) errors.pages = "cannot be blank.";

    return errors;
  };

  render() {
    const { book, loading, errors } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} loading={loading}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title}>
                  <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={this.handleChange}
                  />
                  {errors.title && <InlineError>{errors.title}</InlineError>}
                </Form.Field>
                <Form.Field error={!!errors.author}>
                  <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={this.handleChange}
                  />
                  {errors.author && <InlineError>{errors.author}</InlineError>}
                </Form.Field>
                <Form.Field error={!!errors.pages}>
                  <input
                    type="text"
                    name="pages"
                    value={book.pages}
                    onChange={this.handleChange}
                  />
                  {errors.pages && <InlineError>{errors.pages}</InlineError>}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image size="small" src={book.cover} />
                <a role="button" tabIndex={0} onClick={this.changeCover}>
                  Another Cover
                </a>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </div>
    );
  }
}

export default BookForm;
