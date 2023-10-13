"use strict";

import { imageBaseURL } from "./api.js";

// ! Movie Card
export function createMovieCard(movie) {
  const { poster_path, title, vote_average, release_date, id } = movie;

  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
    <figure class="poster-box card-banner">
      <img loading="lazy" src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover" />
    </figure>
    <h4 class="title">${title}</h4>
    <div class="meta-list">
      <div class="meta-item">
        <img
          loading="lazy"
          style="filter: invert(92%) sepia(100%) saturate(3952%) hue-rotate(318deg) brightness(100%) contrast(94%)"
          width="16px"
          height="16px"
          src="./assets/images/icons/star.svg"
          alt="rating" />
        <span class="span">${vote_average.toFixed(1)}</span>
      </div>
      <div class="card-badge">${release_date.split("-")[0]}</div>
    </div>

    <a href="./details.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>
  `;

  return card;
}
