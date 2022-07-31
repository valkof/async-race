import { Settings } from '../Interfaces/Types';

export async function getInitSettingsFromJSON(): Promise<Settings> {
  const response = await fetch('./settings/settings.json');
  const settings: Settings = await response.json();
  return settings;
}