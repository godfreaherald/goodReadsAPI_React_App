import React from "react";
import SearchBookForm from "../../forms/SearchBookForm";
import BookForm from "../../forms/BookForm";
import { Segment } from "semantic-ui-react";

class AddNewBookPage extends React.Component {
  state = {
    book: null,
  };

  onBookSelect = (book) => this.setState({ book });

  submit = (data) => {
    console.log(data);
  };
  render() {
    return (
      <div>
        <Segment>
          <SearchBookForm onBookSelect={this.onBookSelect} />
        </Segment>
        <Segment>
          {this.state.book && (
            <BookForm book={this.state.book} submit={this.submit} />
          )}
        </Segment>
      </div>
    );
  }
}

export default AddNewBookPage;
