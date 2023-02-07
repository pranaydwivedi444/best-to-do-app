import listView from "./listView.js";
import tasksView from "./tasksView.js";
import * as model from "./model.js";

const controlNewList = function (name) {
  model.createList(name);
  saveAndRender();
};

const ToDoListUpdateTicks = function () {
  model.save();
  tasksView.renderTaskCount(model.state.selectedList);
};
function saveAndRender() {
  model.save();
  listView.render(model.state.lists, model.state.selectedListId);
}
const controlActiveListContainer = function (activeItem) {
  model.updateSelectedList(activeItem);
  saveAndRender();
};

const controlNewTask = function (newTaskName) {
  model.createNewTask(newTaskName);

  saveAndRender();
};

const controlClearCompletedTasks = function () {
  model.state.selectedList.tasks = model.selectedList.tasks.filter(
    (task) => !task.completed
  );
  saveAndRender();
};

const controlDeleteLists = function () {
  model.deleteList();
  saveAndRender();
};
function init() {
  listView.render(model.state.lists, model.state.selectedListId);

  listView.addNewListHandler(controlNewList);
  listView.addHandlerListContainer(controlActiveListContainer);
  tasksView.todoListBodyClickHandler(
    model.state.selectedList,
    ToDoListUpdateTicks
  );
  tasksView.newTaskFormHandler(controlNewTask);
  tasksView.addHandlerClearBtn(controlClearCompletedTasks);
  listView.addHandlerDeleteButton(controlDeleteLists);
}
init();
