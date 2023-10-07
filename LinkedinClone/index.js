let profileMenu = document.querySelector(".profile-menu-wrap");
const clickBtn = document.querySelector(".navbar-right");

// const showBtn = document.querySelector("#showMoreLink");
// to get the drop down menu of profile visible

// function toggleMenu() {
//   profileMenu.classList.toggle("open-menu");
// }

function toggleMenu() {
  profileMenu.classList.toggle("open-menu");
}

clickBtn.addEventListener("click", toggleMenu);

// moreLink.addEventListener("click", function () {
//   // sideActivity.classList.add("open-activity");
// });
