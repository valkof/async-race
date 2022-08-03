import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services, Status } from "../../Interfaces/Types";
import { GarageControlPanel } from "./GarageControlPanel";
import { GarageHeader } from "./GarageHeader";
import { GarageList } from "./GarageList";
import { GaragePagination } from "./GaragePagination/GaragePagination";

export class Garage extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', ['garage']);
  }

  render(): void {
    new GarageControlPanel(this.element, this.services).render();
    new GarageHeader(this.element, this.services).render();
    new GaragePagination(this.element, this.services).render();
    new GarageList(this.element, this.services).render();
    
    this.parent.appendChild(this.element);

    this.services.Race.addListener('openPage', (status: Status) => {
      if (status.currentPage === 'garage') {
        this.element.classList.remove('deactive');
      } else {
        this.element.classList.add('deactive');
      }
    })
  }
}