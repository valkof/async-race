// import { Main } from './Components/Main';
// import { Header } from './Components/Header';
// import { Services } from './Service/Service';
// import { StoreService } from './Service/StoreService';
// import { Footer } from './Components/Footer';

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
    const settings = this.services.Race.getSettings();
    const html = `<h1>${settings.cars[0].brand}</h1>`;
    this.root.innerHTML = html;
    // new Header(this.root, this.services).render();
    
    // new Main(this.root, this.services).render();

    // new Footer(this.root, this.services).render();
  }
}
