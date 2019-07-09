import React, { useState } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

const AddBook = props => {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  const displayAuthors = () => {
    let data = props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    // console.log(formData);

    // use the addBookMutation
    props.addBookMutation({
      variables: formData, // object
      refetchQueries: [{ query: getBooksQuery }] // where ever this query is used it'll update the component
    });
  };

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" name="genre" onChange={handleChange} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select name="authorId" onChange={handleChange}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
