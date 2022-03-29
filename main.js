let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// Empty Array to Store the tasks
let arrayOfTasks = [];

//Check if local not empty
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//get data from local
getDataFromLocalStorage();

// Add Task
submit.onclick = () => {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add task to array of tasks
    input.value = ""; // Empty the Input
  }
};

//click On Task Element
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // remoce Task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  // Task ELement
  if (e.target.classList.contains("task")) {
    // Toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Task to Local Storage
  addDataToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty the task div
  taskDiv.innerHTML = "";
  // Looping On Array of tasks
  arrayOfTasks.forEach((task) => {
    // Creat Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check if Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Creat Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    // Add tasks div to Tasks Container
    taskDiv.appendChild(div);
  });
}
function addDataToLocalStorage(addTaskToArray) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : arrayOfTasks[i].completed == false;
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}
