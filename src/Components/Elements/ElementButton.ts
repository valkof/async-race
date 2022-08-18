interface IElementButton {
  readonly element: HTMLButtonElement;
}

export class ElementButton implements IElementButton {
  readonly element: HTMLButtonElement;

  constructor(caption: string, addStyles: string[] = []) {
    this.element = document.createElement('button');
    this.element.classList.add('button');
    if (addStyles.length) {
      this.element.classList.add(...addStyles);
    }
    this.element.innerText = caption;
  }
}