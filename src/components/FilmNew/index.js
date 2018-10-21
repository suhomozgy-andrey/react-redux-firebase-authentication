import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { db } from "../../firebase";
import { db as database } from "../../firebase/firebase";
import * as routes from "../../constants/routes";
import withAuthorization from "../Session/withAuthorization";

const FilmNewFormPage = ({ history }) => (
  <div>
    <h1>Add new film</h1>
    <FilmNewForm history={history} />
  </div>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  title: "",
  kinopoiskLink: "",
  error: null
};

class FilmNewForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { title, kinopoiskLink } = this.state;

    const { history } = this.props;
    const id = database.ref("films").push().key;
    db.doCreateFilm(id, title, kinopoiskLink)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.FILMS);
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { title, kinopoiskLink, error } = this.state;

    const isInvalid = title === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={title}
          onChange={event =>
            this.setState(updateByPropertyName("title", event.target.value))
          }
          type="text"
          placeholder="Film title"
        />
        <input
          value={kinopoiskLink}
          onChange={event =>
            this.setState(
              updateByPropertyName("kinopoiskLink", event.target.value)
            )
          }
          type="text"
          placeholder="kinopoiskLink"
        />

        <button disabled={isInvalid} type="submit">
          Create
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const FilmNewLink = () => (
  <p>
    <Link to={routes.FILM_NEW}>Add new film</Link>
  </p>
);

const authCondition = authUser => !!authUser;

export default compose(
  withRouter,
  withAuthorization(authCondition)
)(FilmNewFormPage);

export { FilmNewForm, FilmNewLink };
