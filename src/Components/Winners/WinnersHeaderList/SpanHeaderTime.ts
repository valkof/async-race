import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";

export class SpanHeaderTime extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('span', ['section__pagination__span_time']);
  }

  render(): void {
    this.element.innerText = 'Time';
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.services.Race.changeSortWinners('time');
    })
    
    // this.services.Race.addListener('updateWinners', (status: Status) => {
    //   this.element.innerText = `Page #${status.paginationWinners}`;
    // })
  }
}