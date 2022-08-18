import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";
import { ButtonGenerate } from "./ButtonGenerate";
import { ButtonRace } from "./ButtonRace";
import { ButtonReset } from "./ButtonReset";

export class ControlPanelGame extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['panel_game']);
  }

  render(): void {
    new ButtonRace(this.element, this.services).render();
    new ButtonReset(this.element, this.services).render();
    new ButtonGenerate(this.element, this.services).render();

    this.parent.appendChild(this.element);
  }
}