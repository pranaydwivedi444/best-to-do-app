export default class View {
  clearListContainer(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
