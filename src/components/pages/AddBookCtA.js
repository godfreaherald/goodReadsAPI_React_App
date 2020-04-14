import React from "react";
import { Card, CardContent, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddBookCtA = () => {
  return (
    <Card centred>
      <CardContent textAlign="center">
        <Card.Header>Add a New Book</Card.Header>
        <Link to="/book/new">
          <Icon name="plus circle" size="massive" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default AddBookCtA;
