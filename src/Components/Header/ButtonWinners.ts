import { Services } from "../../Interfaces/Types";
import { ElementButton } from "../Elements/ElementButton";

export class ButtonWinners extends ElementButton {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Winners', ['header__button', 'button_winners']);
  }

  render() {
    this.element.addEventListener('click', () => {
      this.element.disabled = true;
      this.services.Race.toggleSection('openWinners');
    })
    
    this.services.Race.addListener('openGarage', () => {
      this.element.disabled = false;
    })

    this.parent.appendChild(this.element);
  }
}