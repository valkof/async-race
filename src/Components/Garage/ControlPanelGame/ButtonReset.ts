import { IBaseInterface } from "../../../Interfaces/Interfaces";
import { Services } from "../../../Interfaces/Types";
import { ElementButton } from "../../Elements/ElementButton";

export class ButtonReset extends ElementButton implements IBaseInterface {
  constructor(private readonly parent: HTMLElement, private readonly services: Services) {
    super('Reset', ['panel_game__button']);
  }

  render(): void {
    this.parent.appendChild(this.element);
    
    // this.element.addEventListener('click', () => {
    //   this.services.Race.createNewCar();
    // })
  }
}