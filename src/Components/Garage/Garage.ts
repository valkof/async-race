import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services } from "../../Interfaces/Types";
import { GarageControlPanel } from "./GarageControlPanel";
import { GarageHeader } from "./GarageHeader";
import { GarageList } from "./GarageList";

export class Garage extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', ['garage']);
  }

  render(): void {
    new GarageControlPanel(this.element, this.services).render();
    new GarageHeader(this.element, this.services).render();
    new GarageList(this.element, this.services).render();
    
    this.parent.appendChild(this.element);

    this.services.Race.addListener('openPage', (namePage: string) => {
      if (namePage === 'garage') {
        this.element.classList.remove('deactive');
      } else {
        this.element.classList.add('deactive');
      }
    })
  }
}