let initialTasks = [];

async function fetchTasksFromAPI() {
  try {
    const response = await fetch("https://jsl-kanban-api.vercel.app");
    if (!response.ok) throw new Error("Network response was not ok");
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks from API:", error);
    return [];
  }
}
// This function initializes the tasks from localStorage or fetches them from the API if not available.
async function initializeTasks() {
  if (localStorage.getItem("fetchedkanbanTask4")) {
    initialTasks = JSON.parse(localStorage.getItem("fetchedkanbanTask4"));
    updateCanban();
  } else {
    initialTasks = await fetchTasksFromAPI();
    saveTasksToLocalStorage();
    updateCanban();
  }
}

let currentTask;
var todoDiv = document.getElementById("todo-tasks");
var doingDiv = document.getElementById("doing-tasks");
var doneDiv = document.getElementById("done-tasks");
initializeTasks(); // Use async initialization

/**
 * Updates the Kanban columns with the current tasks.
 * Clears and repopulates the columns based on task status.
 */
function updateCanban() {
  todoDiv.innerHTML = "";
  doingDiv.innerHTML = "";
  doneDiv.innerHTML = "";

  initialTasks.forEach((task) => {
    /**
     * Create new tasks element
     */
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-div";
    taskDiv.setAttribute("id", task.id);
    taskDiv.innerText = task.title;
    taskDiv.onclick = () => {
      setUpdateTaskValues(taskDiv.getAttribute("id"));
    };

    if (task.status === "todo") {
      todoDiv.appendChild(taskDiv);
    } else if (task.status === "doing") {
      doingDiv.appendChild(taskDiv);
    } else if (task.status === "done") {
      doneDiv.appendChild(taskDiv);
    }
  });
}

/**
 * Opens the modal dialog for adding a new task.
 */
function openAddTaskModal() {
  /**
   * Reset input fields.
   */
  const modal = document.getElementById("task-modal1");
  if (modal) {
    modal.showModal();
  }
}

/**
 * Adds a new task to the task list and updates storage and UI.
 */
function addTask() {
  const taskTitle = document.getElementById("add-task-title").value;
  const taskDescription = document.getElementById("add-task-description").value;
  const taskStatus = document.getElementById("add-task-status").value;

  /**
   * Validate input.
   */
  const newTask = {
    id:
      initialTasks.length > 0
        ? Math.max(...initialTasks.map((t) => t.id)) + 1
        : 1,
    title: taskTitle,
    description: taskDescription,
    status: taskStatus,
  };

  initialTasks.push(newTask); /*Add the task to the array*/

  saveTasksToLocalStorage(); /* Save after adding*/

  updateCanban();

  document.getElementById("add-task-title").value = "";
  document.getElementById("add-task-description").value = "";
  document.getElementById("add-task-status").value = "todo";
}

/**
 * Sets the values in the edit modal for the selected task.
 */
function setUpdateTaskValues(taskId) {
  currentTask = initialTasks.find((task) => task.id === +taskId);
  console.log(currentTask);
  document.getElementById("edit-task-title").value = currentTask.title;
  document.getElementById("edit-task-description").value =
    currentTask.description;
  document.getElementById("edit-task-status").value = currentTask.status;
  /*Open modal.*/
  const modal = document.getElementById("task-modal");
  if (modal) {
    modal.showModal();
  }
}

/**
 * Closes both the add and edit modals.
 */
function closeModal() {
  const addModal = document.getElementById("task-modal1");
  if (addModal) {
    addModal.close();
  }
  const modal = document.getElementById("task-modal" || "task-modal1");
  if (modal) {
    modal.close();
  }
  console.log("All tasks: ", initialTasks);
  console.log("Completed tasks: ", getCompletedTasks());
}

/**
 * Updates the current task with values from the edit modal,
 * saves to localStorage, and updates the UI.
 */
function updateTask() {
  currentTask.title = document.getElementById("edit-task-title").value;
  currentTask.description = document.getElementById(
    "edit-task-description"
  ).value;
  currentTask.status = document.getElementById("edit-task-status").value;

  saveTasksToLocalStorage(); /*Save after editing.*/

  updateCanban();
}

/**
 * Deletes the selected task from the task list and updates storage and UI.
 */
function deleteTask() {
  if (!currentTask) return;
  // Remove the task from the array
  initialTasks = initialTasks.filter((task) => task.id !== currentTask.id);
  saveTasksToLocalStorage();
  updateCanban();
  closeModal();
}

/**
 * Returns all tasks with status 'done'.
 */
const getCompletedTasks = () =>
  initialTasks.filter((task) => task.status === "done");

/**
 * Display tasks in the console
 */
console.log("All tasks: ", initialTasks);
console.log("Completed tasks: ", getCompletedTasks());

/**
 * Saves the current tasks array to localStorage.
 */
function saveTasksToLocalStorage() {
  localStorage.setItem("fetchedkanbanTask4", JSON.stringify(initialTasks));
}

//Hidse sidebar if it exists
function hideSidebar() {
  const sidebar = document.getElementById("side-bar-div");
  if (sidebar) {
    sidebar.style.display = "none";
  }
}
