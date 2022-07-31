import { Observer } from "../Abstract/Observer";
import { Settings } from "../Interfaces/Types";
import { getInitSettingsFromJSON } from "./getSetting";

export class RaceService extends Observer {
  
  private settings = {} as Settings;
  
  constructor(settings: string) {
    super();

    Object.assign(this.settings, JSON.parse(settings));
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

  getSettings(): Settings {
    return this.settings;
  }
}