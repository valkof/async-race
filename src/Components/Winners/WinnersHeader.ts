import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services } from "../../Interfaces/Types";

export class WinnersHeader extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__header']);
  }

  render(): void {
    const h2 = new BaseComponent('h2');
    h2.element.innerText = 'Winners';

    const span = new BaseComponent('span', ['span_count']);
    
    this.element.appendChild(h2.element);
    this.element.appendChild(span.element);

    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateWinners', () => {
      const count = this.services.Race.getCountRecords('winners');
      span.element.innerText = `(${count})`;
    })
  }
}