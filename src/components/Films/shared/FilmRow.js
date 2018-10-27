import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { Rate, Popconfirm, Button } from 'antd';
import { FilmUpdateLink } from '../../FilmEdit';
import * as actions from '../../../action';

class Film extends Component {
  handleRemove(key) {
    const { actions } = this.props;
    actions.removeFilmRequest(key);
  }

  render() {
    const {
      authUser,
      id,
      film: { title, kinopoiskLink, rate },
    } = this.props;
    return (
      <StyledFilm>
        <StyledFilmBody>
          <Link to={`/films/${id}`}>
            {title} {kinopoiskLink}
          </Link>
          <Rate defaultValue={parseFloat(rate)} disabled />
        </StyledFilmBody>

        {authUser && (
          <StyledFilmFooter>
            <FilmUpdateLink id={id} />{' '}
            <Popconfirm
              title="Are you sure delete this film?"
              onConfirm={() => this.handleRemove(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" icon="delete" />
            </Popconfirm>
          </StyledFilmFooter>
        )}
      </StyledFilm>
    );
  }
}
const StyledFilm = styled.div`
  background: #fff;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const StyledFilmBody = styled.div`
  flex: 1;
`;

const StyledFilmFooter = styled.div``;

const mapStateToProps = (state) => ({
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
)(Film);
