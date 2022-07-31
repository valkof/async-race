interface IElementButton {
  readonly element: HTMLButtonElement;
}

export class ElementButton implements IElementButton {
  readonly element: HTMLButtonElement;

  constructor(caption: string, addStyles: string[] = []) {
    this.element = document.createElement('button');
    if (addStyles.length) {
      this.element.classList.add('button', ...addStyles);
    }
    this.element.innerText = caption;
  }
}