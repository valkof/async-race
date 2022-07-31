import { RaceService } from "../Services/RaceService";

export type Settings = {
  cars: {
    brand: string;
    models: string[]
  }[]
}

export type Services = {
  Race: RaceService;
}