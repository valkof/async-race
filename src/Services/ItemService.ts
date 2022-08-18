import { ObserverItem } from "../Abstract/ObserverItem";

export class ItemService extends ObserverItem {
  private stageGame = 'stop';

  setStageGame(stage: string): void {
    let status = stage;
    if (status === 'stop' && this.stageGame === 'drive') status = 'stopDrive';
    if (status === 'finish' && this.stageGame === 'stopDrive') status = 'stop';
    this.stageGame = status;
    this.dispath('stageGame', status);
  }

  getStageGame(): string {
    return this.stageGame;
  }
}