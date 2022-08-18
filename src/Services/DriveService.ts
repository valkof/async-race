import { Animation, AnimationCars, DriveMode, Engine } from "../Interfaces/Types";

const host = 'http://127.0.0.1:3000';

const engine = `${host}/engine`;

export async function carStartStopEngine(idCar: number, status: 'started' | 'stopped'): Promise<Engine> {
  const response = await fetch(`${engine}?id=${idCar}&status=${status}`, {
    method: 'PATCH'
  });
  return await response.json() as Engine;
}

export async function carEngineDriveMode(idCar: number, status = 'drive'): Promise<DriveMode> {
  const response = await fetch(`${engine}?id=${idCar}&status=${status}`, {
    method: 'PATCH'
  });
  if (response.status === 500) {
    return Promise.resolve({
      success: false
    });
  }
  return await response.json() as DriveMode;
}

export function animation(image: HTMLElement, idCar: number, engineCar: Engine): AnimationCars {
  let startTime = 0;
  const animationCar = {} as Animation;

  function step(timestamp: number) {
    if (startTime === 0) startTime = timestamp;
    const rangeTime = timestamp - startTime;
    const left = rangeTime / (+engineCar.distance / +engineCar.velocity) * (window.innerWidth - 70);
    image.style.left = `${left / window.innerWidth * 100}vw`;
    if (left < (window.innerWidth - 70)) {
      animationCar.idFrame = window.requestAnimationFrame(step);
    }
    animationCar.time = Math.floor(rangeTime / 10) / 100;
  }
  animationCar.idFrame = window.requestAnimationFrame(step);

  return { [idCar]: animationCar };
}
  