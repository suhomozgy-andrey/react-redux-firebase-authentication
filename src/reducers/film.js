import * as types from "../actionTypes";

const INITIAL_STATE = {
  films: {},
  loading: false
};

const applySetFilms = (state, action) => ({
  ...state,
  films: action.payload.data
});

const applySetFilm = (state, action) => ({
  ...state,
  film: action.payload.data
});

const applyRemoveFilm = (state, films) => ({
  ...state,
  films: films
});

function filmReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FILMS_SET: {
      return applySetFilms(state, action);
    }
    case types.START_FILMS_SET: {
      return {
        ...state,
        loading: true
      };
    }
    case types.STOP_FILMS_SET: {
      return {
        ...state,
        loading: false
      };
    }
    case types.START_FILM_SET: {
      return {
        ...state,
        filmLoading: true
      };
    }
    case types.STOP_FILM_SET: {
      return {
        ...state,
        filmLoading: false
      };
    }
    case types.FILM_CREATE_ERROR: {
      return {
        ...state,
        filmCreateError: action.payload.data
      };
    }
    case types.FILM_UPDATE_ERROR: {
      return {
        ...state,
        filmUpdateError: action.payload.data
      };
    }
    case types.FILM_SET: {
      return applySetFilm(state, action);
    }
    case types.FILM_CLEAR: {
      return applySetFilm(state, action);
    }

    case types.FILM_REMOVE: {
      const films = { ...state.films };
      delete films[action.payload.data];
      return applyRemoveFilm(state, films);
    }
    default:
      return state;
  }
}

export default filmReducer;
