import { Observer } from "../Abstract/Observer";
import { Car, CarQuery, CarResponse, Settings, Winner, WinnerResponse } from "../Interfaces/Types";
import { createCar, getCars, updateCar } from "./GarageService";
import { getInitSettingsFromJSON } from "./getSetting";
import { getWinners } from "./WinnersService";

export class RaceService extends Observer {
  
  private settings = {} as Settings;

  private pageGarage = {} as CarResponse;

  private pageWinners = {} as WinnerResponse;
  
  private newCar = {name: '', color: ''} as CarQuery;
  
  private oldCar = {name: '', color: '', id: 0} as Car;
  
  constructor(settings: string) {
    super();

    Object.assign(this.settings, JSON.parse(settings));

    this.updatePages();
  }

  static getInitSettings(): Promise<string> {
    return new Promise((resolve, reject) => {
      getInitSettingsFromJSON()
        .then(initSetting => {
          const strInitSetting = JSON.stringify(initSetting);
          resolve(strInitSetting);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  toggleSection(nameSection: string) {
    if (nameSection === 'openGarage') {
      this.dispath('openGarage');
    } else {
      this.dispath('openWinners');
    }
  }

  updatePages(pageGarage = 1, pageWinners = 1, sort = 'time', order = 'ASC'): void {
    this.updateGarage(pageGarage);
    this.updateWinners(pageWinners, sort, order);
  }

  updateGarage(page = 1): void {
    getCars(page)
      .then(results => {
        Object.assign(this.pageGarage, results);
        this.dispath('updateGarage');
      });
  }

  updateWinners(page = 1, sort = 'time', order = 'ASC'): void {
    getWinners(page, sort, order)
      .then(results => {
        Object.assign(this.pageWinners, results);
        this.dispath('updateWinners');
      });
  }

  getCountRecords(section: 'garage' | 'winners'): string {
    if (section === 'garage') {
      return this.pageGarage.count ? this.pageGarage.count : '0';
    }
    if (section === 'winners') {
      return this.pageWinners.count ? this.pageWinners.count : '0';
    }
    return '';
  }

  getRecords(section: 'garage' | 'winners'): Car[] | Winner[] {
    if (section === 'garage') {
      return this.pageGarage.cars;
    }
    if (section === 'winners') {
      return this.pageWinners.cars;
    }
    return [];
  }

  createNewCar(): void {
    this.dispath('createCar');
    createCar(this.newCar)
      .then(() => {
        this.updateGarage(this.pageGarage.page);
      });
  }

  updateOldCar(): void {
    this.dispath('updateCar');
    updateCar(this.oldCar)
      .then(() => {
        this.updateGarage(this.pageGarage.page);
      });
  }

  setSettingsCar(typeCar: 'new' | 'old', obj: Record<string, string | number>): void {
    if (typeCar === 'new') {
      Object.assign(this.newCar, obj);
    } else {
      Object.assign(this.oldCar, obj);
    }
  }

  getSettingCar(typeCar: 'new' | 'old', key: 'name' | 'color'): string {
    if (typeCar === 'new') return  this.newCar[key as keyof CarQuery];
    return this.oldCar[key as keyof Car] as string;
  }

  tooglePanelUpdate(action: 'openPanelUpdate' | 'closePanelUpdate'): void {
    if (action === 'openPanelUpdate') this.dispath('getSettingsOldCar');
    this.dispath(action);
  }
}