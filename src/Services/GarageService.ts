import { CarResponse } from "../Interfaces/Types";

const host = 'http://127.0.0.1:3000';

const garage = `${host}/garage`;
// const winners = `${host}/winners`;
// const engine = `${host}/engine`;


export async function getCars(page = 1, limit = 7): Promise<CarResponse> {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    page: page,
    count: response.headers.get('X-Total-Count'),
    cars: await response.json()
  };
}