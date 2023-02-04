const task_container = document.querySelector(".task-list");
const newListForm = document.querySelector(".new-list-form ");
const newListInput = document.querySelector(".new-list-input");
const local_storage_list_key = "tasks.lists";
// localStorage.clear("bookmarks");
const lists = JSON.parse(localStorage.getItem(local_storage_list_key)) || [];

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
  lists.forEach((list) => {
    const listEl = document.createElement("li");
    listEl.dataset.listId = list.id;
    listEl.classList.add("list-name");
    listEl.innerText = list.name;
    task_container.appendChild(listEl);
  });
};
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
    name,
    id: Date.now().toString(),
    tasks: [],
  };
  lists.push(list);
}

function init() {
  render();
}
init();
