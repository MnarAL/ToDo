const addButton = document.getElementById("add-btn");
const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      const newTaskText = prompt("Edit your task:", task);
      if (newTaskText) {
        tasks[index] = newTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      }
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });

  document.getElementById(
    "todo-counter"
  ).textContent = `Total Todos: ${filteredTasks.length}`;
}

addButton.addEventListener("click", () => {
  const newTask = newTaskInput.value.trim();
  if (newTask) {
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    newTaskInput.value = "";
    renderTasks();
  }
});

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(searchValue)
  );
  renderTasks(filteredTasks);
});

renderTasks();
