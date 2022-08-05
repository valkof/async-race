import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { CarWinner, Services } from "../../../Interfaces/Types";
import { MiniCar } from "./MiniCar";

export class WinnersItemList extends BaseComponent implements IBaseInterface {
  constructor(
    private readonly parent: HTMLElement,
    private readonly services: Services,
    private readonly car: CarWinner
  ) {
    super('div', ['winner_list__item']);
  }

  render(): void {
    const spanNumber = new BaseComponent('span', ['span_number']);
    spanNumber.element.innerText = `${this.car.id}`;
    this.element.append(spanNumber.element);
    
    const spanCar = new BaseComponent('span', ['span_car']);
    // spanCar.element.innerText = '';
    new MiniCar(spanCar.element, this.services, this.car).render();
    this.element.append(spanCar.element);

    const spanName = new BaseComponent('span', ['span_name']);
    spanName.element.innerText = this.car.name;
    this.element.append(spanName.element);

    const spanWins = new BaseComponent('span', ['span_wins']);
    spanWins.element.innerText = `${this.car.wins}`;
    this.element.append(spanWins.element);

    const spanTime = new BaseComponent('span', ['span_time']);
    spanTime.element.innerText = `${this.car.time}`;
    this.element.append(spanTime.element);

    this.parent.appendChild(this.element);
  }
}