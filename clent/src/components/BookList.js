import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

const BookList = props => {
  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    if (props.data.loading) return <li>Loading</li>;
    else
      return props.data.books.map(book => (
        <li key={book.id} onClick={() => setSelected(book.id)}>
          {book.name}
        </li>
      ));
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
