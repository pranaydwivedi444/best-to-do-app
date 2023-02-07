import { local_storage_list_key } from "./config.js";
export const state = {
  lists: JSON.parse(localStorage.getItem(local_storage_list_key)) || [],
  selectedListId: null,
  selectedList: [],
};

export const save = function () {
  //   localStorage.setItem(local_storage_list_key, JSON.stringify(lists));
  try {
    localStorage.setItem(local_storage_list_key, JSON.stringify(state.lists));
  } catch (error) {
    console.error(`Error storing data in local storage: ${error}`);
  }
};

export const updateSelectedList = function (activeItem) {
  state.selectedListId = activeItem.dataset.listId;
  state.selectedList = state.lists.find(
    (list) => list.id === state.selectedListId
  );
};

export const createList = function (name) {
  const list = {
    name: name,
    id: Date.now().toString(),
    tasks: [],
  };
  state.lists.push(list);
};
const createTasksList = function (name) {
  return {
    id: Date.now().toString(),
    name: name,
    completed: false,
  };
};

export const createNewTask = function (newTaskName) {
  const task = createTasksList(newTaskName);
  state.selectedList.tasks.push(task);
};

export const deleteList = function () {
  state.lists = state.lists.filter((list) => list.id != selectedListId);
  state.selectedListId = null;
};
