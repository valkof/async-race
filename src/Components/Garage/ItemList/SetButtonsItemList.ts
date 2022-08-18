import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Car, ServiceItem, Services, Status } from "../../../Interfaces/Types";
import { ItemService } from "../../../Services/ItemService";
import { ButtonRemove } from "./ButtonRemove";
import { ButtonSelect } from "./ButtonSelect";
import { ButtonStart } from "./ButtonStart";
import { ButtonStop } from "./ButtonStop";

export class SetButtonsItemList extends BaseComponent implements IBaseInterface {
  private readonly serviceItem: ServiceItem;
  
  constructor(private readonly parent: HTMLElement, private readonly services: Services, private readonly car: Car) {
    super('div', ['item__set_buttons']);
    
    this.serviceItem = {
      Item: new ItemService()
    };
  }

  render(): void {
    new ButtonSelect(this.element, this.services, this.car, this.serviceItem).render();
    new ButtonRemove(this.element, this.services, this.car, this.serviceItem).render();
    new ButtonStart(this.element, this.services, this.car, this.serviceItem).render();
    new ButtonStop(this.element, this.services, this.car, this.serviceItem).render();

    const span = new BaseComponent('span', ['item__name']);
    span.element.innerText = this.car.name;
    this.element.appendChild(span.element);

    this.parent.appendChild(this.element);

    this.services.Race.addListener('game', (status: Status) => {
      if (status.game === 'restart') {
        this.element.classList.remove('disabled');
      } else {
        this.element.classList.add('disabled');
      }
    })

    this.services.Race.addListener('updateGarage', (status: Status) => {
      if (status.game === 'restart') {
        this.element.classList.remove('disabled');
      } else {
        this.element.classList.add('disabled');
      }
    })
  }
}