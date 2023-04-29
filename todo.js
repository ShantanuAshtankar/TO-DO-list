// Get the form and input elements
const newTaskForm = document.getElementById("new-task-form");
const newTaskInput = newTaskForm.querySelector("input");

// Get the task list and buttons
const taskList = document.getElementById("task-list");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");

// Load saved tasks from localStorage, if any
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render all saved tasks on the page
function renderTasks() {
  taskList.innerHTML = "";
  savedTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    const taskSpan = document.createElement("span");
    taskSpan.innerText = task.title;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTask(index);
    });
    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
  });
}

// Add a new task to the list
function addTask(title) {
  savedTasks.push({
    title: title,
    completed: false,
  });
  renderTasks();
  saveTasks();
}

// Delete a task from the list
function deleteTask(index) {
  savedTasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

// Save the current list of tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// When the form is submitted, add the new task to the list
newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTaskTitle = newTaskInput.value.trim();
  if (newTaskTitle !== "") {
    addTask(newTaskTitle);
    newTaskInput.value = "";
  }
});

// When the save button is clicked, save the current list of tasks
saveBtn.addEventListener("click", () => {
  saveTasks();
});

// When the delete button is clicked, delete the current list of tasks
deleteBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this list?")) {
    savedTasks = [];
    renderTasks();
    saveTasks();
  }
});

// Render the initial list of tasks on page load
renderTasks();
