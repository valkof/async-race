import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services } from "../../Interfaces/Types";

export class Garage extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', ['garage']);
  }

  render(): void {
    const html = `
      <div class="section__header"> 
        <h2>Garage ()</h2>
      </div>
    `
    this.element.innerHTML = html;

    this.services.Race.addListener('garage', () => {
      this.element.classList.remove('deactive');
    })

    this.services.Race.addListener('winners', () => {
      this.element.classList.add('deactive');
    })

    this.parent.appendChild(this.element);
  }
}