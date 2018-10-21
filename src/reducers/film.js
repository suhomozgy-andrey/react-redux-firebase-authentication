const INITIAL_STATE = {
  films: {}
};

const applySetFilms = (state, action) => ({
  ...state,
  films: action.films
});

const applySetFilm = (state, action) => ({
  ...state,
  film: action.film
});

const applyRemoveFilm = (state, films) => ({
  ...state,
  films: films
});

function filmReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FILMS_SET": {
      return applySetFilms(state, action);
    }
    case "FILM_SET": {
      return applySetFilm(state, action);
    }
    case "FILM_CLEAR": {
      return applySetFilm(state, action);
    }
    case "FILM_REMOVE": {
      const films = { ...state.films };
      delete films[action.key];
      return applyRemoveFilm(state, films);
    }
    default:
      return state;
  }
}

export default filmReducer;
