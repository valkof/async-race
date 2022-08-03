import { Services } from "../../Interfaces/Types";
import { ElementButton } from "../Elements/ElementButton";

export class ButtonGarage extends ElementButton {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Garage', ['header__button', 'button_garage']);
  }

  render(): void {
    this.element.disabled = true;
    this.parent.appendChild(this.element);

    this.element.addEventListener('click', () => {
      this.element.disabled = true;
      this.services.Race.openPage('garage');
    })
    
    this.services.Race.addListener('openPage', (namePage: string) => {
      this.element.disabled = (namePage === 'garage');
    })
  }
}