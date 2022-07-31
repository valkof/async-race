import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services } from "../../Interfaces/Types";
import { WinnersHeader } from "./WinnersHeader";

export class Winners extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', ['winners']);
  }

  render(): void {
    new WinnersHeader(this.element, this.services).render();

    this.services.Race.addListener('openWinners', () => {
      this.element.classList.remove('deactive');
    })

    this.services.Race.addListener('openGarage', () => {
      this.element.classList.add('deactive');
    })

    this.element.classList.add('deactive');
    this.parent.appendChild(this.element);
  }
}