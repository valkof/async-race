import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services, Status } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonRemove extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('Remove');
  }

  render(): void {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.element.disabled = true;
      this.services.Race.deleteOldCar(this.car.id);
    })

    this.services.Race.addListener('game', (status: Status) => {
      this.element.disabled = !(status.game === 'restart');
    })

    this.services.Race.addListener('updateGarage', (status: Status) => {
      this.element.disabled = !(status.game === 'restart');
    })
  }
}