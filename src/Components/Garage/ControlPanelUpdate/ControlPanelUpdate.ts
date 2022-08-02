import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";
import { ButtonUpdate } from "./ButtonUpdate";
import { ColorUpdate } from "./ColorUpdate";
import { InputUpdate } from "./InputUpdate";

export class ControlPanelUpdate extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['panel_update', 'disabled']);
  }

  render(): void {
    new InputUpdate(this.element, this.services).render();
    new ColorUpdate(this.element, this.services).render();
    new ButtonUpdate(this.element, this.services).render();

    this.parent.appendChild(this.element);

    this.services.Race.addListener('openPanelUpdate', () => {
      this.element.classList.remove('disabled');
    })

    this.services.Race.addListener('closePanelUpdate', () => {
      this.element.classList.add('disabled');
    })
  }
}