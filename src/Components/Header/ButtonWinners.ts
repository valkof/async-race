import { Services, Status } from "../../Interfaces/Types";
import { ElementButton } from "../Elements/ElementButton";

export class ButtonWinners extends ElementButton {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Winners', ['header__button', 'button_winners']);
  }

  render() {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.services.Race.openPage('winners');
    })
    
    this.services.Race.addListener('openPage', (status: Status) => {
      this.element.disabled = (status.currentPage === 'winners');
    })
  }
}