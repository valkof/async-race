import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";
import { ObjectCar } from "./ObjectCar";

export class RoadCar extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('div', ['item__road']);
  }

  render(): void {
    new ObjectCar(this.element, this.services, this.car).render();

    this.parent.appendChild(this.element);
  }
}