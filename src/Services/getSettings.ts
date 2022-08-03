import { NamesOfCars, Status } from '../Interfaces/Types';

export async function getNamesOfCarsFromJSON(): Promise<NamesOfCars> {
  const response = await fetch('./settings/namesOfCars.json');
  const settings: NamesOfCars = await response.json();
  return settings;
}

export async function getInitSettingsFromJSON(): Promise<Status> {
  const response = await fetch('./settings/initSettings.json');
  const settings: Status = await response.json();
  return settings;
}