import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, Services } from "../../../Interfaces/Types";
import { RoadCar } from "./RoadCar";
import { SetButtonsItemList } from "./SetButtonsItemList";

export class GarageItemList extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('div', ['list__item']);
  }

  render(): void {
    new SetButtonsItemList(this.element, this.services, this.car).render();
    new RoadCar(this.element, this.services, this.car).render();

    this.parent.appendChild(this.element);
    
    // this.services.Race.addListener('updateGarage', () => {
    //   const count = this.services.Race.getCountRecords('garage');
    //   span.element.innerText = `(${count})`;
    // })
  }
}