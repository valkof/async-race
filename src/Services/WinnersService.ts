import { FieldSort, OrderSort, Winner, Winners, Wins } from "../Interfaces/Types";

const host = 'http://127.0.0.1:3000';

const winners = `${host}/winners`;

export async function getWinners(
  page = 1,
  sort = 'id' as FieldSort,
  order = 'ASC' as OrderSort,
  limit = 10
): Promise<Winners> {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  return {
    countCarsWinners: response.headers.get('X-Total-Count'),
    carsWinners: await response.json()
  };
}

export async function getWinner(idCar: number): Promise<Winner[]> {
  const response = await fetch(`${winners}?id=${idCar}`);
  return await response.json() as Winner[];
}

export async function createWinner(body: Winner): Promise<Winner> {
  const response = await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  return await response.json() as Winner;
}

export async function deleteWinner(idCar: number): Promise<Winner> {
  const response = await fetch(`${winners}/${idCar}`, {
    method: 'DELETE'
  });
  return response.json();
}

export async function updateWinner(idCar: number, body: Wins): Promise<Winner> {
  const response = await fetch(`${winners}/${idCar}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  return await response.json() as Winner;
}

export async function addWinner(idCar: number, time: number): Promise<void> {
  const winner = await getWinner(idCar);
  if (winner.length > 0) {
    if (time < winner[0].time) await updateWinner(idCar, {
      wins: winner[0].wins + 1,
      time: time
    })
  } else {
    await createWinner({
      id: idCar,
      wins: 1,
      time: time
    })
  }
}