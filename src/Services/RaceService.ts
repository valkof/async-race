import { Observer } from "../Abstract/Observer";
import { CarResponse, Settings, WinnerResponse } from "../Interfaces/Types";
import { getCars } from "./GarageService";
import { getInitSettingsFromJSON } from "./getSetting";
import { getWinners } from "./WinnersService";

export class RaceService extends Observer {
  
  private settings = {} as Settings;

  private pageGarage = {} as CarResponse;

  private pageWinners = {} as WinnerResponse;
  
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

  getCountRecords(section: string): string {
    if (section === 'garage') {
      return this.pageGarage.count ? this.pageGarage.count : '0';
    }
    if (section === 'winners') {
      return this.pageWinners.count ? this.pageWinners.count : '0';
    }
    return '';
  }
}