import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services, Status } from "../../Interfaces/Types";

export class GarageHeader extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__header']);
  }

  render(): void {
    const h2 = new BaseComponent('h2');
    h2.element.innerText = 'Garage';

    const span = new BaseComponent('span', ['span_count']);
    
    this.element.appendChild(h2.element);
    this.element.appendChild(span.element);

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateGarage', (status: Status) => {
      span.element.innerText = `(${status.countCarsGarage})`;
    })
  }
}