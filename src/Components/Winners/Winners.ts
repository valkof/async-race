import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services, Status } from "../../Interfaces/Types";
import { WinnersHeader } from "./WinnersHeader";
import { WinnersHeaderList } from "./WinnersHeaderList/WinnersHeaderList";
import { WinnersPagination } from "./WinnersPagination/WinnersPagination";

export class Winners extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('section', ['winners']);
  }

  render(): void {
    new WinnersHeader(this.element, this.services).render();
    new WinnersPagination(this.element, this.services).render();
    new WinnersHeaderList(this.element, this.services).render();
    
    this.parent.appendChild(this.element);

    this.services.Race.addListener('openPage', (status: Status) => {
      if (status.currentPage === 'winners') {
        this.element.classList.remove('deactive');
      } else {
        this.element.classList.add('deactive');
      }
    })
  }
}