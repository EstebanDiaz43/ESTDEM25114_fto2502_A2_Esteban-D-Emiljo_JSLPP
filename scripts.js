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

/**
 * Initializes the Kanban tasks from localStorage or fetches them from the API if not available.
 * @returns {Promise<void>}
 */
async function initializeTasks() {
  if (localStorage.getItem("fetchedkanbanTask5")) {
    initialTasks = JSON.parse(localStorage.getItem("fetchedkanbanTask5"));
    updateCanban();
  } else {
    initialTasks = await fetchTasksFromAPI();
    saveTasksToLocalStorage();
    updateCanban();
  }
}

/**
 * Updates the Kanban columns with the current tasks.
 * Clears and repopulates the columns based on task status.
 * @returns {void}
 */
function updateCanban() {
  todoDiv.innerHTML = "";
  doingDiv.innerHTML = "";
  doneDiv.innerHTML = "";

  initialTasks.forEach((task) => {
    /**
     * Create new tasks element
     * @type {HTMLDivElement}
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
 * @returns {void}
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
 * @returns {void}
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
 * @param {string|number} taskId - The ID of the task to edit.
 * @returns {void}
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
 * @returns {void}
 */
function closeModal() {
  const addModal = document.getElementById("task-modal1");
  if (addModal) {
    addModal.close();
  }
  const modal = document.getElementById("task-modal");
  if (modal) {
    modal.close();
  }

  const topmodal = document.getElementById("top-modal");
  if (topmodal) {
    topmodal.close();
  }

  console.log("All tasks: ", initialTasks);
  console.log("Completed tasks: ", getCompletedTasks());
}

/**
 * Updates the current task with values from the edit modal,
 * saves to localStorage, and updates the UI.
 * @returns {void}
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
 * @returns {void}
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
 * @returns {Array<Object>} Array of completed task objects.
 */
const getCompletedTasks = () =>
  initialTasks.filter((task) => task.status === "done");

/**
 * Saves the current tasks array to localStorage.
 * @returns {void}
 */
function saveTasksToLocalStorage() {
  localStorage.setItem("fetchedkanbanTask5", JSON.stringify(initialTasks));
}

/**
 * Hides the sidebar and shows the show-sidebar button.
 * @returns {void}
 */
function hideSidebar() {
  const sidebar = document.getElementById("side-bar-div");
  const showBtn = document.getElementById("show-sidebar-btn");
  if (sidebar) {
    sidebar.style.display = "none";
  }
  if (showBtn) {
    showBtn.style.display = "block"; // Only show after hiding sidebar
  }
}

/**
 * Opens the top modal dialog.
 * @returns {void}
 */
function openTopModal() {
  const modal = document.getElementById("top-modal");
  if (modal) {
    modal.showModal();
  }
}

/**
 * Shows the sidebar and hides the show-sidebar button.
 * @returns {void}
 */
function showSidebar() {
  const sidebar = document.getElementById("side-bar-div");
  const showBtn = document.getElementById("show-sidebar-btn");
  if (sidebar) {
    sidebar.style.display = "block";
  }
  if (showBtn) {
    showBtn.style.display = "none"; // Hide button after showing sidebar
  }
}

/**
 * Toggles the theme for the app, including sidebar, header, layout, modals, and tasks.
 * @returns {void}
 */
function toggleTheme() {
  //Body elements
  const sidebar = document.getElementById("side-bar-div");
  const header = document.getElementById("header");
  const layout = document.getElementById("layout");
  const darklogo = document.getElementById("logo");

  //Modal elements
  const modal = document.getElementById("task-modal");
  const modal1 = document.getElementById("task-modal1");
  const topmodal = document.getElementById("top-modal");
  const modalheader1 = document.getElementById("modal-header1");
  const modalheader = document.getElementById("modal-header");
  const modalclosebtn = document.getElementById("close-btn");
  const modalclosebtn1 = document.getElementById("close-btn1");
  const modalclosebtn2 = document.getElementById("close-btn2");
  const toggleswitchdiv1 = document.getElementById("toggleswitch-div1");
  const toggleswitchbtn1 = document.getElementById("toggleswitch-btn1");
  //Sidebar elements
  const toggleswitchdiv = document.getElementById("toggleswitch-div");
  const toggleswitchbtn = document.getElementById("toggleswitch-btn");
  const hidesidebarbtn = document.getElementById("hide-sidebar-btn");

  // You can use a data attribute to track the current theme
  const isDark = document.body.getAttribute("data-theme") === "dark";

  // Get all task elements
  const taskDivs = document.querySelectorAll(".task-div");

  if (!isDark) {
    // Switch to dark theme
    // Body elements
    if (sidebar) sidebar.style.backgroundColor = "#393E46";
    if (header) header.style.backgroundColor = "#393E46";
    if (header) header.style.color = "#FFFFFF";
    if (layout) layout.style.backgroundColor = "#222831";
    if (darklogo) darklogo.src = "./assets/logo-dark.svg"; // Change logo for dark theme
    // Modal elements
    if (modal) modal.style.backgroundColor = "#2B2C37";
    if (modal1) modal1.style.backgroundColor = "#2B2C37";
    if (topmodal) topmodal.style.backgroundColor = "#2B2C37";
    if (modalheader1) modalheader1.style.color = "#FFFFFF";
    if (modalheader) modalheader.style.color = "#FFFFFF";
    if (modalclosebtn) modalclosebtn.style.backgroundColor = "#2B2C37";
    if (modalclosebtn1) modalclosebtn1.style.backgroundColor = "#2B2C37";
    if (modalclosebtn2) modalclosebtn2.style.backgroundColor = "#2B2C37";
    if (toggleswitchdiv1) toggleswitchdiv1.style.backgroundColor = "#635FC7";
    if (toggleswitchbtn1) toggleswitchbtn1.style.backgroundColor = "#20212C";

    // Sidebar elements
    if (toggleswitchdiv) toggleswitchdiv.style.backgroundColor = "#635FC7";
    if (toggleswitchbtn) toggleswitchbtn.style.backgroundColor = "#20212C";
    if (hidesidebarbtn) hidesidebarbtn.style.backgroundColor = "#635FC7";
    if (hidesidebarbtn) hidesidebarbtn.style.color = "#FFFFFF";
    // Change all task backgrounds
    taskDivs.forEach((div) => {
      div.style.backgroundColor = "#3E3F4E";
      div.style.color = "#FFFFFF";
    });

    document.body.setAttribute("data-theme", "dark");
  } else {
    // Switch back to light/default theme
    // Body elements
    if (sidebar) sidebar.style.backgroundColor = "";
    if (header) header.style.backgroundColor = "";
    if (header) header.style.color = "";
    if (layout) layout.style.backgroundColor = "";
    if (darklogo) darklogo.src = "./assets/logo-light.svg "; // Change logo for light theme
    // Modal elements
    if (modal) modal.style.backgroundColor = "";
    if (modal1) modal1.style.backgroundColor = "";
    if (topmodal) topmodal.style.backgroundColor = "";
    if (modalheader1) modalheader1.style.color = "";
    if (modalheader) modalheader.style.color = "";
    if (modalclosebtn) modalclosebtn.style.backgroundColor = "";
    if (modalclosebtn1) modalclosebtn1.style.backgroundColor = "";
    if (modalclosebtn2) modalclosebtn2.style.backgroundColor = "";
    if (toggleswitchdiv1) toggleswitchdiv1.style.backgroundColor = "";
    if (toggleswitchbtn1) toggleswitchbtn1.style.backgroundColor = "";
    // Sidebar elements
    if (toggleswitchdiv) toggleswitchdiv.style.backgroundColor = "";
    if (toggleswitchbtn) toggleswitchbtn.style.backgroundColor = "";
    if (hidesidebarbtn) hidesidebarbtn.style.backgroundColor = "";
    if (hidesidebarbtn) hidesidebarbtn.style.color = "";
    // Reset all task backgrounds
    taskDivs.forEach((div) => {
      div.style.backgroundColor = "";
      div.style.color = "";
    });

    document.body.setAttribute("data-theme", "light");
  }
}

let currentTask;
var todoDiv = document.getElementById("todo-tasks");
var doingDiv = document.getElementById("doing-tasks");
var doneDiv = document.getElementById("done-tasks");
initializeTasks(); // Use async initialization

updateCanban(); // Initial call to populate the Kanban board
