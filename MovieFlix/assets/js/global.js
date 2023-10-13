"use strict";

//! addEventOnElements
const addEventOnElements = function (elements, eventType, callBack) {
  for (const elem of elements) elem.addEventListener(eventType, callBack);
};

//! SearchBox Toggle
const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function () {
  searchBox.classList.toggle("active");
});

//! Store movieIg in 'localStorage' when click on movie card
const getMovieDetail = function (movieId) {
  window.localStorage.setItem("movieId", String(movieId));
};

const getMovieList = function (urlParam, genreName) {
  window.localStorage.getItem("urlParam", urlParam);
  window.localStorage.getItem("genreName", genreName);
};
