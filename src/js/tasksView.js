import View from "./view.js";
class TasksView extends View {
  _todoListContainer = document.querySelector(".todo-list");
  task_list_title = document.querySelector(".list-title");
  task_list_count = document.querySelector(".task-count");
  taskTemplate = document.getElementById("task-template");
  _todoListBody = document.querySelector(".task-body");
  new_task_form = document.querySelector(".new-task-form");
  clearBtn = document.querySelector(".clear-btn");
  updateTasks(selectedListId, selectedList) {
    if (!selectedListId) this._todoListContainer.style.display = "none";
    else {
      todoListContainer.style.display = "";
      task_list_title.innerText = selectedList.name;
      renderTaskCount(selectedList);
      clearListContainer(todoListBody);
      renderTasks(selectedList);
    }
  }
  newTaskFormHandler(handler) {
    // adding evenet listener to new task btn
    this.new_task_form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTaskName = document.querySelector(".new-task-form-input").value;
      if (!newTaskName) return;
      document.querySelector(".new-task-form-input").value = "";
      // renderTasksList();
      handler(newTaskName);
    });
  }
  renderTasks(selectedList) {
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

  renderTaskCount(list) {
    const incompleteTasksCount = list.tasks.filter(
      (task) => !task.completed
    ).length;
    const taskString = incompleteTasksCount == 1 ? "task" : "tasks";
    task_list_count.innerText = `${incompleteTasksCount} ${taskString} remaing`;
  }
  todoListBodyClickHandler(selectedList, handler) {
    this._todoListBody.addEventListener("click", (e) => {
      if (e.target.closest("input")) {
        //   console.log("clicked");
        const selectedTask = selectedList.tasks.find(
          (task) => task.id == e.target.closest("input").id
        );
        console.log(selectedTask);
        selectedTask.completed = e.target.closest("input").checked;
        handler();
      }
    });
  }
  addHandlerClearBtn(handler) {
    this.clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new TasksView();
