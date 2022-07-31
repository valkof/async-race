import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services } from "../../Interfaces/Types";

export class Winners extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', ['winners']);
  }

  render(): void {
    const html = `
      <div class="section__header">
        <h2>Winners ()</h2>
      </div>
    `

    this.services.Race.addListener('winners', () => {
      this.element.classList.remove('deactive');
    })

    this.services.Race.addListener('garage', () => {
      this.element.classList.add('deactive');
    })

    this.element.innerHTML = html;
    this.element.classList.add('deactive');
    this.parent.appendChild(this.element);
  }
}