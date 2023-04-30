const taskInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");

let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo() {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      li += `<li class="task">
          <label for="${id}">
            <input onClick="updateStatus(this)" type="checkbox" id="${id} "${isCompleted}">
            <p class="${isCompleted}">${todo.name}</p>
          </label>
          <div class="settings">
              <i onClick="showMenu(this)" class="uil uil-ellpsih-h"></i> 
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
              </svg>
          <ul class="task-menu">
            <li><i class="uil uil-pen"></i>Edit</li>
            <li onClick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
          </ul>
          </div>
        </li>`;
    });
  }
  taskBox.innerHTML = li;
}

function deleteTask(deleteId) {
  console.log(deleteId)
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

showTodo();
function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  })
}
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  }
  else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
taskInput.addEventListener("keyup", e => {

  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    console.log(userTask)
    if (!todos) {
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});








