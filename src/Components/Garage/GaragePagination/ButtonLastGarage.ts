import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonLastGarage extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Last', ['section__pagination__button_last']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.element.addEventListener('click', () => {
      this.services.Race.lastPaginationGarage();
    })

    this.services.Race.addListener('updateGarage', (status: Status) => {
      this.element.disabled = !(status.paginationGarage > 1);
    })

    this.services.Race.addListener('game', (status: Status) => {
      this.element.disabled = !(status.game === 'restart');
    })
  }
}