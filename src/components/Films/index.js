import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { FilmNewLink } from "../FilmNew";
import { Spin } from "antd";
import * as actions from "../../action";

const FilmRow = lazy(() => import("./shared/FilmRow"));

class Films extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.setFilmsRequest();
  }

  render() {
    const { films, authUser, loading } = this.props;
    return (
      <div>
        <h1>Films {loading && <Spin size="small" />}</h1>
        {!loading &&
          !!films &&
          Object.keys(films).length > 0 && (
            <div>
              {Object.keys(films).map(key => (
                <div key={key}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <FilmRow id={key} film={films[key]} />
                  </Suspense>
                </div>
              ))}
            </div>
          )}
        {!loading && !!films && Object.keys(films).length === 0 && "No Films"}

        {!loading && authUser && <FilmNewLink />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  films: state.filmState.films,
  loading: state.filmState.loading,
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
)(Films);
