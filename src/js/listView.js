import View from "./view.js";
class ListView extends View {
  _newListInput = document.querySelector(".new-list-input");
  _newListForm = document.querySelector(".new-list-form ");
  _task_container = document.querySelector(".task-list");
  tasksContainer = document.querySelector(".tasks");
  deleteListBtn = document.querySelector(".del-btn");
  //adding event listener to form
  addNewListHandler(handler) {
    this._newListForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newListName = this._newListInput.value;
      if (!newListName) return;
      this._newListInput.value = "";
      handler(newListName);
    });
  }
  addHandlerDeleteButton(handler) {
    this.deleteListBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
  addHandlerListContainer(handler) {
    this._task_container.addEventListener("click", (e) => {
      const activeItem = e.target.closest(".list-name");
      if (!activeItem) return;
      handler(activeItem);
    });
  }
  render = function (lists, selectedListId) {
    this.clearListContainer(this._task_container);

    this.renderLists(lists, selectedListId);
  };

  renderLists(lists, selectedListId) {
    lists.forEach((list) => {
      const listEl = document.createElement("li");
      listEl.dataset.listId = list.id;

      listEl.classList.add("list-name");
      if (selectedListId == list.id) {
        listEl.classList.add("active-list");
      }
      listEl.innerText = list.name;
      this._task_container.appendChild(listEl);
    });
  }
}

export default new ListView();
