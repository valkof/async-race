import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services, Status } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonStop extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('Stop');
  }

  render(): void {
    this.element.disabled = true;
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.services.Race.restartDriveCar(this.car);
    })

  }
}