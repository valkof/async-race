import { WinnerResponse } from "../Interfaces/Types";

const host = 'http://127.0.0.1:3000';

const winners = `${host}/winners`;

export async function getWinners(page = 1, sort = 'time', order = 'ASC', limit = 10): Promise<WinnerResponse> {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  return {
    page: page,
    count: response.headers.get('X-Total-Count'),
    cars: await response.json()
  };
}