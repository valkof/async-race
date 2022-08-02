import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";

export class ColorUpdate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('input', ['color', 'panel_update__color']);
  }

  render(): void {
    (this.element as HTMLInputElement).type = 'color';
    (this.element as HTMLInputElement).value = '#2548D4';

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateCar', () => {
      this.services.Race.setSettingsCar('old', {
        'color': (this.element as HTMLInputElement).value
      });
    })

    this.services.Race.addListener('getSettingsOldCar', () => {
      const color = this.services.Race.getSettingCar('old', 'color');
      (this.element as HTMLInputElement).value = color;
    })
  }
}