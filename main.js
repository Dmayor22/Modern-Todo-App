import { tasks } from "./data.js";
import { category } from "./data.js";

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

// add category and tasks using js
const categoriesContainer = document.querySelector(".categories");
const categoryTask = document.querySelector(".category-task");
const categoryTitle = document.querySelector(".category-title");
const categoryImg = document.querySelector("#category-img");

let selectedCategory = category[0];

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  // get all tasks of current category
  category.forEach((categoryList) => {
    const categoryTasks = tasks.filter((task) => {
      return task.category.toLowerCase() === categoryList.title.toLowerCase();
    });

    // div creation to render category
    const div = document.createElement("div");
    div.classList.add("category");
    div.innerHTML = `
              <div class="left">
                <img src=${categoryList.img} alt=${categoryList.title}  />
                <div class="content">
                  <h1>${categoryList.title}</h1>
                  <p>${categoryTasks.length} tasks</p>
                </div>
              </div>

              <!-- options -->
              <div class="options">
                <div class="toggle-btn">
                  <!-- replace with svg when online -->
                  <img src="./asset/create.png" alt="" />
                </div>
              </div>`;

    div.addEventListener("click", () => {
      wrapper.classList.add("show-category");
      selectedCategory = categoryList;
      categoryTitle.innerHTML = categoryList.title;
      categoryImg.src = `${categoryList.img}`
    });
    categoriesContainer.appendChild(div);
  });
};

renderCategories();
