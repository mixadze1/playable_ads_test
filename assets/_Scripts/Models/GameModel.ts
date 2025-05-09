import { _decorator } from 'cc';
import { StorageService } from '../Services/StorageService';
const { ccclass } = _decorator;

@ccclass('GameModel')
export class GameModel {
    private readonly SaveKey: string = 'Game_model_save_key';
    private storageService!: StorageService;

    public State: number = 0;

    public initialize(storageService: StorageService) {
        this.storageService = storageService;
    }

    public load(): void {
        const data = this.storageService.load<GameModel>(this.SaveKey);
        if (data) {
            this.State = data.State;
        }
    }

    public save(): void {
        this.storageService.save(this.SaveKey, GameModel);
    }
}
