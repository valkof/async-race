import { BaseComponent } from "../../../Abstract/BaseComponent";
import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";
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
  }
}