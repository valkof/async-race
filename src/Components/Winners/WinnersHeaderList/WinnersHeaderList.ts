import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";
import { SpanHeaderNumber } from "./SpanHeaderNumber";
import { SpanHeaderTime } from "./SpanHeaderTime";
import { SpanHeaderWins } from "./SpanHeaderWins";

export class WinnersHeaderList extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__header_list']);
  }

  render(): void {
    new SpanHeaderNumber(this.element, this.services).render();
    
    const spanCar = new BaseComponent('span', ['section__pagination__span_car']);
    spanCar.element.innerText = 'Car';
    this.element.append(spanCar.element);
    
    const spanName = new BaseComponent('span', ['section__pagination__span_name']);
    spanName.element.innerText = 'Name';
    this.element.append(spanName.element);
    
    new SpanHeaderWins(this.element, this.services).render();
    new SpanHeaderTime(this.element, this.services).render();

    this.parent.appendChild(this.element);
  }
}