import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Car, Services } from "../../Interfaces/Types";
import { GarageItemList } from "./ItemList/GarageItemList";

export class GarageList extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__list']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateGarage', () => {
      this.element.innerHTML = ''
      
      const cars = this.services.Race.getRecords('garage') as Car[];
      cars.forEach(car => {
        new GarageItemList(this.element, this.services, car).render();
      })
    })
  }
}