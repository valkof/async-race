import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";

export class SpanPageWinners extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('span', ['section__pagination__span']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.services.Race.addListener('updateWinners', (status: Status) => {
      this.element.innerText = `Page #${status.paginationWinners}`;
    })
  }
}