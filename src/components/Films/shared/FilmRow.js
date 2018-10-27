import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { FilmUpdateLink } from "../../FilmEdit";
import * as actions from "../../../action";

class Film extends Component {
  handleRemove(key) {
    const { actions } = this.props;
    actions.removeFilmRequest(key);
  }

  render() {
    const {
      authUser,
      id,
      film: { title, kinopoiskLink, rate }
    } = this.props;
    return (
      <React.Fragment>
        <Link to={`/films/${id}`}>
          {title} {kinopoiskLink}
        </Link>
        <b>Rate: </b> {rate || "Not Set"}
        {authUser && (
          <React.Fragment>
            <button type="button" onClick={() => this.handleRemove(id)}>
              &times;
            </button>
            <FilmUpdateLink id={id} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Film);
