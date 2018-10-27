import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as actions from "../../action";

class Film extends Component {
  componentDidMount() {
    const {
      actions,
      match: {
        params: { id }
      }
    } = this.props;
    actions.setFilmRequest(id);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.clearFilm();
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
  actions: bindActionCreators(actions, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Film);
