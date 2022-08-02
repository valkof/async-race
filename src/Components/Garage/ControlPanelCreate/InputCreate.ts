import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";

export class InputCreate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('input', ['input', 'panel_create__input']);
  }

  render(): void {
    (this.element as HTMLInputElement).type = 'text';

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('createCar', () => {
      this.services.Race.putSettingsCar('new', 'name', (this.element as HTMLInputElement).value);
      (this.element as HTMLInputElement).value = '';
    })
  }
}