import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonLastWinners extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Last', ['section__pagination__button_last']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.element.addEventListener('click', () => {
      this.services.Race.lastPaginationWinners();
    })

    this.services.Race.addListener('updateWinners', (status: Status) => {
      this.element.disabled = !(status.paginationWinners > 1);
    })
  }
}