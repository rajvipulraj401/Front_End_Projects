"use strict";

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movieCard.js";
import { search } from "./search.js";

// ! Collect genre name and url parameter from local storage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

let currentPage = 1;
let totalPage = 0;

fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, function ({ results: movieList, total_pages }) {
  totalPage = total_pages;

  document.title = `Movies - Filmoon`;

  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list", "genre-list");
  movieListElem.ariaLabel = `${genreName} Movies`;

  movieListElem.innerHTML = ` <div class="title-wrapper">
        <h1 class="heading">Movies List</h1>
      </div>

      <div class="grid-list"></div>

      <button class="btn load-more" load-more>Load More</button>`;

  // ! adding movie card based on fetched item

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);

    movieListElem.querySelector(".grid-list").appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);

  // ! Load more button
  document.querySelector("[load-more]").addEventListener("click", function () {
    if (currentPage >= totalPage) {
      this.style.display = "none";
      return;
    }

    currentPage++;
    this.classList.add("loading");

    fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({ results: movieList }) => {
      this.classList.remove("loading");

      for (const movie of movieList) {
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".grid-list").appendChild(movieCard);
      }
    });
  });
});

search();
