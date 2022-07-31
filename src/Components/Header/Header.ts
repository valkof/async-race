import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services } from "../../Interfaces/Types";
import { ButtonGarage } from "./ButtonGarage";
import { ButtonWinners } from "./ButtonWinners";

export class Header extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('header', ['header']);
  }

  render(): void {
    const div = new BaseComponent('div', ['navigation', 'header__navigation']);
    
    new ButtonGarage(div.element, this.services).render();
    new ButtonWinners(div.element, this.services).render();

    this.element.appendChild(div.element);
    this.parent.appendChild(this.element);
  }
}