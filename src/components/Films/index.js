import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import withAuthorization from "../Session/withAuthorization";
import { db } from "../../firebase";
import { FilmNewLink } from "../FilmNew";

class Films extends Component {
  componentDidMount() {
    const { onSetFilms } = this.props;
    db.onceGetFilms().then(snapshot => onSetFilms(snapshot.val()));
  }

  handleRemove(key) {
    const { onRemoveFilm } = this.props;
    db.doRemoveFilm(key).then(res => {
      onRemoveFilm(key);
    });
  }

  render() {
    const { films, authUser } = this.props;
    console.log(films);
    return (
      <div>
        <h1>Films</h1>
        {!!films && Object.keys(films).length > 0 ? (
          <div>
            {Object.keys(films).map(key => (
              <div key={key}>
                {films[key].title} {films[key].kinopoiskLink}
                {authUser && (
                  <button type="button" onClick={() => this.handleRemove(key)}>
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          "No films added"
        )}
        {authUser && <FilmNewLink />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  films: state.filmState.films,
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetFilms: films => dispatch({ type: "FILMS_SET", films }),
  onRemoveFilm: key => dispatch({ type: "FILM_REMOVE", key })
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Films);
