const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");

// function to toggle and show category
const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);


