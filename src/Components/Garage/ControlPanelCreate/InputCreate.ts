import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";

export class InputCreate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('input', ['input', 'panel_create__input']);
  }

  render(): void {
    const inputElement = this.element as HTMLInputElement;
    inputElement.type = 'text';

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateGarage', (status: Status) => {
      inputElement.value = status.newCar.name;
    })
    
    this.services.Race.addListener('createCar', (status: Status) => {
      status.newCar.name = inputElement.value;
    })
  }
}