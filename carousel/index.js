const imgs = document.getElementById("imgs");

const img = document.querySelectorAll("#imgs img");

let idx = 0;

function run() {
  idx++;

  if (idx > img.length - 1) {
    idx = 0;
  }

  imgs.style.transform = `translateX(${-idx * 600}px)`;
  /* in the first iteration when idx is 0 there is no 
  translation and in second when idx =1 then the first image goes at left and the second image comes in picture and so on....
   IF THERE IS DOUBT JUST REMOVE OVERFLOW :VISBILE PROPERTY and evrything will  be clear
*/
}

setInterval(run, 2000);

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 4 + 3 + "s";

  heart.innerText = "💗";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 300);
