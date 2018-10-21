import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";

import withAuthorization from "../Session/withAuthorization";
import { db } from "../../firebase";

class Film extends Component {
  componentDidMount() {
    const {
      onSetFilm,
      match: {
        params: { id }
      }
    } = this.props;
    db.onceGetFilm(id).then(snapshot => onSetFilm(snapshot.val()));
  }

  componentWillUnmount() {
    const { onClearFilm } = this.props;

    onClearFilm();
  }

  render() {
    const { film } = this.props;
    return (
      <div>
        {film && <h1>Film {film && film.title}</h1>}{" "}
        {!film && "No film with this id"}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  film: state.filmState.film
});

const mapDispatchToProps = dispatch => ({
  onSetFilm: film => dispatch({ type: "FILM_SET", film }),
  onClearFilm: film => dispatch({ type: "FILM_CLEAR", film: {} })
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Film);
