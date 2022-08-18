import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";

export class ColorUpdate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('input', ['color', 'panel_update__color']);
  }

  render(): void {
    const inputElement = this.element as HTMLInputElement;
    inputElement.type = 'color';

    this.parent.appendChild(this.element);

    this.services.Race.addListener('updatePanel', (status: Status) => {
      inputElement.value = status.oldCar.color;
    })

    this.services.Race.addListener('updateGarage', (status: Status) => {
      inputElement.value = status.oldCar.color;
    })

    this.services.Race.addListener('updateCar', (status: Status) => {
      status.oldCar.color = inputElement.value;
    })
  }
}