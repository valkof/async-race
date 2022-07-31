import { Garage } from "./Components/Garage/Garage";
import { Header } from "./Components/Header/Header";
import { Winners } from "./Components/Winners/Winners";
import { Services } from "./Interfaces/Types";
import { RaceService } from "./Services/RaceService";

interface IApp {
  render: () => void;
}

export class App implements IApp {
  private readonly services: Services;

  constructor(private readonly root: HTMLElement, settings: string) {
    this.services = {
      Race: new RaceService(settings)
    };
  }

  static getInitSettings(): Promise<string> {
    return RaceService.getInitSettings();
  }

  render(): void {
    new Header(this.root, this.services).render();
    
    new Winners(this.root, this.services).render();

    new Garage(this.root, this.services).render();
  }
}
