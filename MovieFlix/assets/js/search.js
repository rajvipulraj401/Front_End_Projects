"use strict";

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movieCard.js";

export function search() {
  const searchWrapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");

  const searchResultModel = document.createElement("div");
  searchResultModel.classList.add("search-model");

  document.querySelector("main").appendChild(searchResultModel);

  let searchTimeout;

  searchField.addEventListener("input", function () {
    if (!searchField.value.trim()) {
      searchResultModel.classList.remove("active");
      searchWrapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return;
    }

    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
      fetchDataFromServer(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField.value}&page=1&include_adult=false`,
        function ({ results: movieList }) {
          searchWrapper.classList.remove("searching");
          searchResultModel.classList.add("active");
          searchResultModel.innerHTML = "";

          searchResultModel.innerHTML = `
            <p class="label">Results for</p>
            <h1 class="heading">${searchField.value}</h1>

            <div class="movie-list">
              <div class="grid-list"></div>
            </div>
          `;

          for (const movie of movieList) {
            const movieCard = createMovieCard(movie);
            searchResultModel.querySelector(".grid-list").appendChild(movieCard);
          }
        }
      );
    }, 500);
  });
}
