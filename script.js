const task_container = document.querySelector(".task-list");
const newListForm = document.querySelector(".new-list-form ");
const newListInput = document.querySelector(".new-list-input");
const deleteListBtn = document.querySelector(".del-btn");
const todoListContainer = document.querySelector(".todo-list");
const todoListBody = document.querySelector(".task-body");
const task_list_title = document.querySelector(".list-title");
const task_list_count = document.querySelector(".task-count");
const tasksContainer = document.querySelector(".tasks");
const new_task_form = document.querySelector(".new-task-form");
const clearBtn = document.querySelector(".clear-btn");
const taskTemplate = document.getElementById("task-template");

const local_storage_list_key = "tasks.lists";
// localStorage.clear("bookmarks");
let lists = JSON.parse(localStorage.getItem(local_storage_list_key)) || [];
let selectedListId = null;
let selectedList;

//add event listener to clearbtn
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  selectedList.tasks = selectedList.tasks.filter((task) => !task.completed);
  saveAndRender();
});
//add event listeer to todolist body
todoListBody.addEventListener("click", (e) => {
  if (e.target.closest("input")) {
    console.log("clicked");
    const selectedTask = selectedList.tasks.find(
      (task) => task.id == e.target.closest("input").id
    );
    console.log(selectedTask);
    selectedTask.completed = e.target.closest("input").checked;
    save();
    renderTaskCount(selectedList);
  }
});
//add event listener to task container
task_container.addEventListener("click", (e) => {
  const activeItem = e.target.closest(".list-name");
  if (!activeItem) return;
  selectedListId = activeItem.dataset.listId;
  saveAndRender();
});
//adding event listener to delete button
deleteListBtn.addEventListener("click", (e) => {
  e.preventDefault();
  lists = lists.filter((list) => list.id != selectedListId);
  selectedListId = null;
  saveAndRender();
  //hide tasklist
});
//adding event listener to form
newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = newListInput.value;
  if (!newListName) return;
  createList(newListName);
  newListInput.value = "";
  saveAndRender();
});

const render = function () {
  clearListContainer(task_container);
  renderLists();
  selectedList = lists.find((list) => list.id === selectedListId);
  if (!selectedListId) todoListContainer.style.display = "none";
  else {
    todoListContainer.style.display = "";
    task_list_title.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearListContainer(todoListBody);
    renderTasks(selectedList);
  }
};

// adding evenet listener to new task btn
new_task_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTaskName = document.querySelector(".new-task-form-input").value;
  if (!newTaskName) return;
  const task = createTasksList(newTaskName);
  document.querySelector(".new-task-form-input").value = "";
  // renderTasksList();
  selectedList.tasks.push(task);
  saveAndRender();
});
function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.completed;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    todoListBody.appendChild(taskElement);
  });
}

function renderTaskCount(list) {
  const incompleteTasksCount = list.tasks.filter(
    (task) => !task.completed
  ).length;
  const taskString = incompleteTasksCount == 1 ? "task" : "tasks";
  task_list_count.innerText = `${incompleteTasksCount} ${taskString} remaing`;
}
function renderLists() {
  lists.forEach((list) => {
    const listEl = document.createElement("li");
    listEl.dataset.listId = list.id;

    listEl.classList.add("list-name");
    if (selectedListId == list.id) {
      listEl.classList.add("active-list");
    }
    listEl.innerText = list.name;
    task_container.appendChild(listEl);
  });
}

function saveAndRender() {
  save();
  render();
}

function save() {
  //   localStorage.setItem(local_storage_list_key, JSON.stringify(lists));
  try {
    localStorage.setItem(local_storage_list_key, JSON.stringify(lists));
  } catch (error) {
    console.error(`Error storing data in local storage: ${error}`);
  }
}

function clearListContainer(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createList(name) {
  const list = {
    name: name,
    id: Date.now().toString(),
    tasks: [],
  };
  lists.push(list);
}
const createTasksList = function (name) {
  return {
    id: Date.now().toString(),
    name: name,
    completed: false,
  };
};
function init() {
  render();
}
init();

//adding evenet listener to new task btn
// new_task_form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newTaskName = document.querySelector(".new-task-form-input").value;
//   createTasksList(newTaskName);
//   document.querySelector(".new-task-form-input").value = "";
//   // renderTasksList();
//   saveAndRender();
// });
//Render Task list container
// const renderTasksList = function () {
//   clearListContainer(todoListBody);
//   currList.tasks.forEach((task) => {
//     const htmlTemp = ` <div class="task">
//         <input type="checkbox" id="${task.id}" />
//         <label for="${task.id}">
//           <span class="custom-checkbox"></span>
//           ${task.name}
//         </label>
//       </div>`;

//     todoListBody.insertAdjacentHTML("afterbegin", htmlTemp);
//     if (document.getElementById(task.id).checked) {
//       task.completed = true;
//       currList.task_count = currList.task_count + 1;
//     } else {
//       task.completed = false;
//     }
//   });
// };
// const renderTasks = function () {
//   todoListContainer.style.display = "block";

//   console.log(currList);
//   renderTasksList();
//   task_list_title.innerText = currList.name;
//   task_list_count.innerText = `${currList.task_count} tasks remaing`;
//   //rendering to do lists
// };
// renderTasks();
//function to save and render
// const createTasksList = function (name) {
//   currList.tasks.push({
//     id: Date.now().toString(),
//     name,
//     completed: false,
//   });
// };
