import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";

export class ColorCreate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('input', ['color', 'panel_create__color']);
  }

  render(): void {
    (this.element as HTMLInputElement).type = 'color';

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('createCar', () => {
      this.services.Race.putSettingsCar('new', 'color', (this.element as HTMLInputElement).value);
    })
  }
}