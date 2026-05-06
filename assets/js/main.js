const searchbox = document.querySelector(".search-box");
const searchbtn = document.querySelector(".search-btn");
const searchinput = document.querySelector(".input-box");

const menuBtn = document.querySelector(".menu-btn");
const mobilemenu = document.querySelector(".mobile-menu");

searchbtn.addEventListener("click", () => {
  searchbox.classList.toggle("hidden");
  setTimeout(() => {
    searchinput.classList.toggle("opacity-0");
    searchinput.classList.toggle("translate-y-10");
  });
});

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mobilemenu.classList.toggle("hidden");
});

//-------------------------------------------------------------------------------------------
