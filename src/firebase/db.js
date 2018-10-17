import { db } from "./firebase";

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () => db.ref("users").once("value");

// Other db APIs ...

export const doCreateFilm = (id, title, kinopoiskLink) =>
  db.ref(`films/${id}`).set({
    title,
    kinopoiskLink
  });

export const doRemoveFilm = id => db.ref(`films/${id}`).remove();

export const onceGetFilms = () => db.ref("films").once("value");
export const onceGetFilm = id => db.ref(`films/${id}`).once("value");
