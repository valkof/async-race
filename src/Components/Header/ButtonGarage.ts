import { Services, Status } from "../../Interfaces/Types";
import { ElementButton } from "../Elements/ElementButton";

export class ButtonGarage extends ElementButton {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Garage', ['header__button', 'button_garage']);
  }

  render(): void {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.services.Race.openPage('garage');
    })
    
    this.services.Race.addListener('openPage', (status: Status) => {
      this.element.disabled = (status.currentPage === 'garage');
    })
  }
}