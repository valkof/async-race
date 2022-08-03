import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonSelect extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('Select');
  }

  render(): void {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.services.Race.selectOldCar(this.car);
    })
  }
}