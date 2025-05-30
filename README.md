# 🧩 Kanban Board – Feature Overview

This is a modular JavaScript-based Kanban Board that loads tasks from an external API or localStorage, organizes them into a 3-column UI, supports full CRUD operations, theme switching, responsive layout, and persistent state.

## 🙌 Author

- Developed by [Esteban D'Emiljo](https://github.com/EstebanDiaz43)
- [Link to presentation video](https://www.veed.io/view/9bb22cd5-e805-4d44-a9df-aca8dbe253ab?panel=share)


---

## 🌐 1. Fetching Initial Data (API + Local Storage)

### ✅ What it Does:
- On page load, the app tries to load tasks from localStorage (`Finalkanbanboard2`).
- If no data is found, it fetches from:  
  `https://jsl-kanban-api.vercel.app`.
- Loaded or fetched tasks are rendered into the UI.

### 🔧 Functions Involved:
- `initializeTasks()`:  
  - Shows a loading message  
  - Tries localStorage first  
  - Falls back to API  
  - Calls `updateCanban()` to render tasks
- `fetchTasksFromAPI()`: Makes the actual API call
- `saveTasksToLocalStorage()`: Persists tasks locally

---

## 🗂️ 2. Rendering & Organizing Tasks (Kanban UI)

### ✅ What it Does:
- Tasks are categorized into three columns:
  - **To Do**
  - **Doing**
  - **Done**
- Each task is rendered as a clickable card.

### 🔧 Function:
- `updateCanban()`:
  - Clears all columns
  - Loops through tasks and appends to the correct column
  - Adds `onclick` handlers to open the edit modal

---

## ➕ 3. Adding a Task

### ✅ What it Does:
- Opens a modal where users enter:
  - Title
  - Description
  - Status
- Task is validated, saved, and displayed.

### 🔧 Functions:
- `openAddTaskModal()`: Opens the task creation modal
- `addTask()`:
  - Validates input
  - Generates unique ID
  - Saves to array and `localStorage`
  - Updates UI via `updateCanban()`

---

## 📝 4. Editing an Existing Task

### ✅ What it Does:
- Opens a pre-filled modal of the selected task
- Allows users to update title, description, or status

### 🔧 Functions:
- `setUpdateTaskValues(taskId)`: Prepares the modal with task data
- `updateTask()`:
  - Updates the task object
  - Saves to storage
  - Refreshes UI

---

## 🗑️ 5. Deleting a Task

### ✅ What it Does:
- Deletes a selected task from memory and `localStorage`

### 🔧 Function:
- `deleteTask()`:
  - Uses `currentTask` to locate and remove the item
  - Re-renders board

---

## 📥 6. Modal Management

### ✅ What it Does:
- Opens and closes task-related modals

### 🔧 Functions:
- `openAddTaskModal()`
- `openTopModal()`
- `closeModal()`: Closes all modals

---

## 📁 7. Sidebar Controls (Responsive UI)

### ✅ What it Does:
- Allows users to toggle sidebar visibility (useful for mobile)

### 🔧 Functions:
- `hideSidebar()`: Hides the sidebar and shows a "Show" button
- `showSidebar()`: Reveals the sidebar and hides the toggle button

---

## 🌙 8. Dark/Light Mode Toggle

### ✅ What it Does:
- Toggles between light and dark themes dynamically

### 🔧 Function:
- `toggleTheme()`:
  - Uses the `data-theme` attribute on `<body>`
  - Updates CSS styles and class names
  - Changes image/logo sources accordingly

---

## ✅ 9. Completed Task Analytics

### ✅ What it Does:
- Filters and returns all tasks marked as `done`

### 🔧 Function:
- `getCompletedTasks()`: Returns array of completed tasks for stats/logging

---

## 🧠 Key Variables

| Variable         | Purpose                                      |
|------------------|----------------------------------------------|
| `initialTasks`   | Main array storing all task objects          |
| `currentTask`    | Temporarily stores task being edited         |
| `todoDiv`        | DOM container for "To Do" column             |
| `doingDiv`       | DOM container for "Doing" column             |
| `doneDiv`        | DOM container for "Done" column              |

---

## 🔄 App Initialization Flow

1. `initializeTasks()` is called on page load
2. Tasks are loaded from `localStorage` or fetched via API
3. Data is saved locally using `saveTasksToLocalStorage()`
4. `updateCanban()` renders tasks into the board
5. UI controls and modals are initialized

---

## 💡 Tips for Users

- Click on any task card to open it for editing
- Use the sidebar toggle to optimize layout on smaller screens
- Switch between light and dark mode with the the toggle button, between the sun and moon
- Tasks persist automatically between sessions

---

## 🛠 Technologies Used

- JavaScript
- HTML
- CSS
- External API: [Kanban API](https://jsl-kanban-api.vercel.app)
- Kanban Reverence Figma-Design: [Kanban Design](https://www.figma.com/design/y7bFCUYL5ZHfPeojACBXg2/Challenges-%7C-JSL?node-id=6033-11092&t=oznPnry5nyOlq4Hg-0)

