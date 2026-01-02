const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const showBackdrop = document.querySelector(".black-backdrop");

// function to toggle and show category
const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

// function to toggle and show add task button
const toggleAddTaskForm = () => {
  addTaskForm.classList.toggle("active");
  showBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
