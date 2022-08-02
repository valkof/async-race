import { BaseComponent } from "../../Abstract/BaseComponent";
import { IBaseInterface } from "../../Interfaces/Interfaces";
import { Services } from "../../Interfaces/Types";
import { ControlPanelCreate } from "./ControlPanelCreate/ControlPanelCreate";
import { ControlPanelGame } from "./ControlPanelGame/ControlPanelGame";
import { ControlPanelUpdate } from "./ControlPanelUpdate/ControlPanelUpdate";

export class GarageControlPanel extends BaseComponent implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('div', ['section__control_panel']);
  }

  render(): void {
    new ControlPanelCreate(this.element, this.services).render();
    new ControlPanelUpdate(this.element, this.services).render();
    new ControlPanelGame(this.element, this.services).render();

    this.parent.appendChild(this.element);
  }
}