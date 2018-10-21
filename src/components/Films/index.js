import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { FilmNewLink } from "../FilmNew";
import { FilmUpdateLink } from "../FilmEdit";

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
                <Link to={`/films/${key}`}>
                  {films[key].title} {films[key].kinopoiskLink}
                </Link>
                <b>Rate: </b> {films[key].rate || "Not Set"}
                {authUser && (
                  <button type="button" onClick={() => this.handleRemove(key)}>
                    &times;
                  </button>
                )}
                {authUser && <FilmUpdateLink id={key} />}
                <br />
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
