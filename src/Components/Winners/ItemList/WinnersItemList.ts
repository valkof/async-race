import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";
import { MiniCar } from "./MiniCar";

export class WinnersItemList extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('div', ['winner_list__item']);
  }

  render(): void {
    const spanNumber = new BaseComponent('span', ['span_number']);
    spanNumber.element.innerText = '1';
    this.element.append(spanNumber.element);

    new MiniCar(this.element, this.services, this.car).render();

    const spanName = new BaseComponent('span', ['span_name']);
    spanName.element.innerText = 'name';
    this.element.append(spanName.element);

    const spanWins = new BaseComponent('span', ['span_wins']);
    spanWins.element.innerText = '2';
    this.element.append(spanWins.element);

    const spanTime = new BaseComponent('span', ['span_time']);
    spanWins.element.innerText = '3.45';
    this.element.append(spanTime.element);

    this.parent.appendChild(this.element);
  }
}