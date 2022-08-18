import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services, Status } from "../../Interfaces/Types";
import { GarageItemList } from "./ItemList/GarageItemList";

export class GarageList extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__list']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateGarage', (status: Status) => {
      this.element.innerHTML = '';
      
      status.carsGarage.forEach(car => {
        new GarageItemList(this.element, this.services, car).render();
      })
    })
  }
}