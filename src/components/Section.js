export default class Section {
  constructor({items, renderer}, containerSelector) {
    //по ТЗ 8 ПР конструктор класса Section должен принимать объект с двумя свойствами: items и renderer
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemPrep(element) {
    this._container.prepend(element);
  }
}
