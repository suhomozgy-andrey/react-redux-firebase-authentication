import React, { lazy, Suspense, Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { FilmNewLink } from '../FilmNew';
import { Spin } from 'antd';
import * as actions from '../../action';

const FilmRow = lazy(() => import('./shared/FilmRow'));

class Films extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.setFilmsRequest();
  }

  render() {
    const { films, authUser, loading } = this.props;
    return (
      <StyledFilmsWrapper>
        {loading && <Spin size="small" />}
        {!loading &&
          !!films &&
          Object.keys(films).length > 0 && (
            <StyledFilms>
              {Object.keys(films).map((key) => (
                <React.Fragment key={key}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <FilmRow id={key} film={films[key]} />
                  </Suspense>
                </React.Fragment>
              ))}
            </StyledFilms>
          )}
        {!loading && !!films && Object.keys(films).length === 0 && 'No Films'}

        {!loading && authUser && <FilmNewLink />}
      </StyledFilmsWrapper>
    );
  }
}

const StyledFilmsWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledFilms = styled.div`
  flex: 1;
  display: grid;
  justify-items: stretch;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: minmax(150px, auto);
`;

const mapStateToProps = (state) => ({
  films: state.filmState.films,
  loading: state.filmState.loading,
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Films);
