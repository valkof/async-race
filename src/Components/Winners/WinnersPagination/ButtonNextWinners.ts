import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonNextWinners extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Next', ['section__pagination__button_next']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.element.addEventListener('click', () => {
      this.services.Race.nextPaginationWinners();
    })

    this.services.Race.addListener('updateWinners', (status: Status) => {
      this.element.disabled = !(status.countCarsWinners > status.paginationWinners * 10);
    })
  }
}