"use strict";

import { sidebar } from "./sidebar.js";
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movieCard.js";
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");

sidebar();

// ! Home Page (top rated, upcoming, trending movies)
const homePageSelections = [
  {
    title: "Upcoming Movies",
    path: "/movie/upcoming",
  },
  {
    title: "Weekly Trending Movies",
    path: "/trending/movie/week",
  },
  {
    title: "Top Rated Movies",
    path: "/movie/top_rated",
  },
];

const genreList = {
  asString(genreList) {
    let newGenreList = [];

    for (const genreId of genreList) {
      this[genreId] && newGenreList.push(this[genreId]);
      // this == genreList
    }
    return newGenreList.join(", ");
  },
};

fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
  for (const { id, name } of genres) {
    genreList[id] = name;
  }
  fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`, heroBanner);
});

const heroBanner = function ({ results: movieList }) {
  const banner = document.createElement("section");
  banner.classList.add("banner");
  banner.ariaLabel = "Popular Movies";

  banner.innerHTML = ` <div class="banner-slider">

    </div>
    <div class="slider-control">
      <div class="control-inner"></div>
    </div>`;

  let controlItemIndex = 0;
  for (const [index, movie] of movieList.entries()) {
    const { backdrop_path, title, release_date, genre_ids, overview, poster_path, vote_average, id } = movie;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");

    sliderItem.innerHTML = `
      <img loading="lazy" src="${imageBaseURL}w1280${backdrop_path}" alt="${title}" class="img-cover" />

      <div class="banner-content">
        <h2 class="heading">${title}</h2>
        <div class="meta-list">
          <div class="meta-item">${release_date.split("-")[0]}</div>

          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
        </div>
        <p class="genre">${genreList.asString(genre_ids)}</p>
        <p class="banner-text">${overview}</p>
        <a href="./details.html" class="btn">
          <img
            loading="lazy"
            width="24"
            height="24"
            style="filter: invert(98%) sepia(4%) saturate(252%) hue-rotate(319deg) brightness(118%) contrast(100%)"
            aria-hidden="true"
            src="./assets/images/icons/play.svg"
            alt="Play Button" onclick="getMovieDetail(${id})" />
          <span class="span">Watch Now</span>
        </a>
      </div>
    `;

    banner.querySelector(".banner-slider").appendChild(sliderItem);

    const controlItem = document.createElement("button");
    controlItem.classList.add("poster-box", "slider-item");
    controlItem.setAttribute("slider-control", `${controlItemIndex}`);

    controlItemIndex++;

    controlItem.innerHTML = `
      <img loading="lazy" draggable="false" class="imag-cover" src="${imageBaseURL}w154${poster_path}" alt="Slide to ${title}" />
    `;
    banner.querySelector(".control-inner").appendChild(controlItem);
  }

  pageContent.appendChild(banner);
  addHeroSlide();

  // ! fetch data for home page (top rated, upcoming, trending movies)
  for (const { title, path } of homePageSelections) {
    fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}`, createMovieList, title);
  }
};

// ! Hero slider functionality
const addHeroSlide = function () {
  const sliderItem = document.querySelectorAll("[slider-item]");

  const sliderControls = document.querySelectorAll("[slider-control]");

  let lastSliderItem = sliderItem[0];
  let lastSliderControl = sliderControls[0];

  lastSliderItem.classList.add("active");
  lastSliderControl.classList.add("active");

  const sliderStart = function () {
    lastSliderItem.classList.remove("active");
    lastSliderControl.classList.remove("active");

    // * `this` == slider-control
    sliderItem[Number(this.getAttribute("slider-control"))].classList.add("active");
    this.classList.add("active");

    lastSliderItem = sliderItem[Number(this.getAttribute("slider-control"))];
    lastSliderControl = this;
  };

  addEventOnElements(sliderControls, "click", sliderStart);
};

const createMovieList = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = `${title}`;

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">${title}</h3>
    </div>

    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
  `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie); // * called from movie_card.js

    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }
  pageContent.appendChild(movieListElem);
};

search();
