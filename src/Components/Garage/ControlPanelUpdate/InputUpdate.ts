import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";

export class InputUpdate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('input', ['input', 'panel_update__input']);
  }

  render(): void {
    (this.element as HTMLInputElement).type = 'text';

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateCar', () => {
      this.services.Race.setSettingsCar('old', {
        'name': (this.element as HTMLInputElement).value
      });
      (this.element as HTMLInputElement).value = '';
    })

    this.services.Race.addListener('getSettingsOldCar', () => {
      const text = this.services.Race.getSettingCar('old', 'name');
      (this.element as HTMLInputElement).value = text;
    })
  }
}