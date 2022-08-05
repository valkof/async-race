import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services, Status } from "../../Interfaces/Types";
import { WinnersItemList } from "./ItemList/WinnersItemList";

export class WinnersList extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__list']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateWinners', (status: Status) => {
      this.element.innerHTML = '';
      
      status.carsWinners.forEach(car => {
        new WinnersItemList(this.element, this.services, car).render();
      })
    })
  }
}