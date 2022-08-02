import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonRemove extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('Remove');
  }

  render(): void {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      (this.element as HTMLButtonElement).disabled = true;
      // this.element.classList.add('disabled');
      this.services.Race.deleteOldCar(this.car.id);
    })
  }
}