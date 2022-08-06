import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonRace extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Race', ['panel_game__button']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    this.element.addEventListener('click', () => {
      this.services.Race.carsRace();
    })

    this.services.Race.addListener('game', (status: Status) => {
      this.element.disabled = !(status.game === 'restart');
    })

    this.services.Race.addListener('updateGarage', (status: Status) => {
      this.element.disabled = !(status.game === 'restart');
    })
  }
}