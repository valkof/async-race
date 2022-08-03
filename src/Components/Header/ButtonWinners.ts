import { Services } from "../../Interfaces/Types";
import { ElementButton } from "../Elements/ElementButton";

export class ButtonWinners extends ElementButton {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Winners', ['header__button', 'button_winners']);
  }

  render() {
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.element.disabled = true;
      this.services.Race.openPage('winners');
    })
    
    this.services.Race.addListener('openPage', (namePage: string) => {
      this.element.disabled = (namePage === 'winners');
    })
  }
}