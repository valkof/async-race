import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services, Status } from "../../../Interfaces/Types";
import { ButtonCreate } from "./ButtonCreate";
import { ColorCreate } from "./ColorCreate";
import { InputCreate } from "./InputCreate";

export class ControlPanelCreate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['panel_create']);
  }

  render(): void {
    new InputCreate(this.element, this.services).render();
    new ColorCreate(this.element, this.services).render();
    new ButtonCreate(this.element, this.services).render();

    this.parent.appendChild(this.element);

    this.services.Race.addListener('game', (status: Status) => {
      if (status.game === 'restart') {
        this.element.classList.remove('disabled');
      } else {
        this.element.classList.add('disabled');
      }
    })

    this.services.Race.addListener('updateGarage', (status: Status) => {
      if (status.game === 'restart') {
        this.element.classList.remove('disabled');
      } else {
        this.element.classList.add('disabled');
      }
    })
  }
}