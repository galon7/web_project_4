export class Section {
  constructor({ items, renderer }, cardSelector) {
    this._items = items;
    this._renderer = renderer;
    this._cardSelector = cardSelector;
  }

  render() {
    this._items.forEach(this._renderer);
  }

  addItem(element) {
    this._cardSelector.prepend(element);
  }
}
