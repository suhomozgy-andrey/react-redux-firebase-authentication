import * as types from "../actionTypes";
import { db } from "../firebase";
import { db as database } from "../firebase/firebase";

function setFilms(data) {
  return {
    type: types.FILMS_SET,
    payload: {
      data
    }
  };
}
function setFilm(data) {
  return {
    type: types.FILM_SET,
    payload: {
      data
    }
  };
}

function startSetFilms() {
  return {
    type: types.START_FILMS_SET,
    payload: {
      data: true
    }
  };
}
function stopSetFilms() {
  return {
    type: types.STOP_FILMS_SET,
    payload: {
      data: false
    }
  };
}

function startSetFilm() {
  return {
    type: types.START_FILM_SET,
    payload: {
      data: true
    }
  };
}
function stopSetFilm() {
  return {
    type: types.STOP_FILM_SET,
    payload: {
      data: false
    }
  };
}

export function clearFilm() {
  return {
    type: types.FILM_CLEAR,
    payload: {
      data: {}
    }
  };
}

export function setFilmsRequest(films) {
  return (dispatch, getState) => {
    dispatch(startSetFilms());
    db.onceGetFilms().then(snapshot => {
      dispatch(setFilms(snapshot.val()));
      dispatch(stopSetFilms());
    });
  };
}

export function setFilmRequest(id) {
  return (dispatch, getState) => {
    dispatch(startSetFilm());
    db.onceGetFilm(id).then(snapshot => {
      dispatch(setFilm(snapshot.val()));
      dispatch(stopSetFilm());
    });
  };
}

function removeFilm(data) {
  return {
    type: types.FILM_REMOVE,
    payload: {
      data
    }
  };
}

export function removeFilmRequest(key) {
  return (dispatch, getState) => {
    db.doRemoveFilm(key).then(res => {
      dispatch(removeFilm(key));
    });
  };
}

// function filmCreate(data) {
//   return {
//     type: types.FILM_CREATE,
//     payload: {
//       data
//     }
//   };
// }

function filmCreateError(data) {
  return {
    type: types.FILM_CREATE_ERROR,
    payload: {
      data
    }
  };
}

export function filmCreateRequest(params = []) {
  return (dispatch, getState) => {
    const id = database.ref("films").push().key;
    dispatch(filmCreateError(undefined));
    return db
      .doCreateFilm(id, ...params)
      .then(res => {
        return { status: "ok", ...res };
      })
      .catch(error => {
        dispatch(filmCreateError(error));
        return { status: "error", ...error };
      });
  };
}

// function filmUpdate(data) {
//   return {
//     type: types.FILM_UPDATE,
//     payload: {
//       data
//     }
//   };
// }

function filmUpdateError(data) {
  return {
    type: types.FILM_UPDATE_ERROR,
    payload: {
      data
    }
  };
}

export function filmUpdateRequest(params) {
  return (dispatch, getState) => {
    dispatch(filmUpdateError(undefined));
    return db
      .doUpdateFilm(...params)
      .then(res => {
        return { status: "ok", ...res };
      })
      .catch(error => {
        dispatch(filmUpdateError(error));
        return { status: "error", ...error };
      });
  };
}
