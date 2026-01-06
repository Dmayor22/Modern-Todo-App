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
// variables
const categoriesContainer = document.querySelector(".categories");
const categoryTask = document.querySelector(".category-task");
const categoryTitle = document.querySelector(".category-title");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");
const tasksContainer = document.querySelector(".tasks");

let selectedCategory = category[0];
const calculateTotalTasks = () => {
  const categoryTasks = tasks.filter((task) => {
    return task.category.toLowerCase() === selectedCategory.title.toLowerCase();
  });
  categoryTask.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = `${tasks.length}`;
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  // get all tasks of current category
  category.forEach((categoryList) => {
    const categoryTasks = tasks.filter((task) => {
      return task.category.toLowerCase() === categoryList.title.toLowerCase();
    });

    // div creation to render category using JS
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
    categoriesContainer.appendChild(div);

    // when user clicks category
    div.addEventListener("click", () => {
      wrapper.classList.add("show-category");
      selectedCategory = categoryList;
      console.log(selectedCategory);

      categoryTitle.innerHTML = categoryList.title;
      categoryImg.src = `${categoryList.img}`;
      calculateTotalTasks();
      // re-render tasks after change of tasks
      renderTasks();
    });
  });
};

const renderTasks = () => {
  const tasksContainer = document.querySelector(".tasks");
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter((task) => {
    return task.category.toLowerCase() === selectedCategory.title.toLowerCase();
  });

  // if no task found
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-task">No task found in this Category</p>`;
    return;
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;

      // if checkbox is checked
      checkbox.addEventListener("change", () => {
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveLocalItem();
        renderTasks();
      });

      div.innerHTML = `
                    <div class="delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                >
                  <path
                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                  />
                </svg>
              </div>
      `;

      label.innerHTML = `
                      <span class="checkmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="#fff"
                  >
                    <path
                      d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
                    />
                  </svg>
                </span>
                <p>${task.task}</p>
      `;

      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);
    });
  }
};

// save and get tasks from localStorage
const saveLocalItem = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocalItem = () => {
  let localTasks = localStorage.getItem("tasks");
  localTasks = localTasks ? JSON.parse(localTasks) : [];

  return localTasks;
};

getLocalItem();
renderCategories();
calculateTotalTasks();
renderTasks();
