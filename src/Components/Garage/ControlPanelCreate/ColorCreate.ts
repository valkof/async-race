import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";

export class ColorCreate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('input', ['color', 'panel_create__color']);
  }

  render(): void {
    const inputElement = this.element as HTMLInputElement;
    inputElement.type = 'color';

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateGarage', (status: Status) => {
      inputElement.value = status.newCar.color;
    })
    
    this.services.Race.addListener('createCar', (status: Status) => {
      status.newCar.color = inputElement.value;
    })
  }
}