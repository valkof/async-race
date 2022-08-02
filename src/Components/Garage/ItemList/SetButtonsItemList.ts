import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";
import { ButtonRemove } from "./ButtonRemove";
import { ButtonSelect } from "./ButtonSelect";
import { ButtonStart } from "./ButtonStart";
import { ButtonStop } from "./ButtonStop";

export class SetButtonsItemList extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('div', ['item__set_buttons']);
  }

  render(): void {
    new ButtonSelect(this.element, this.services, this.car).render();
    new ButtonRemove(this.element, this.services, this.car).render();
    new ButtonStart(this.element, this.services, this.car).render();
    new ButtonStop(this.element, this.services, this.car).render();

    const span = new BaseComponent('span', ['item__name']);
    span.element.innerText = this.car.name;
    this.element.appendChild(span.element);

    this.parent.appendChild(this.element);
  }
}