import { _decorator, Component, Game, Node } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { StorageService } from './Services/StorageService';
import { IInputService, InputService } from './Services/InputService';
import { PlayerController } from './PlayerLogic/PlayerController';
import { GameConfig } from './Configs/GameConfig';
import { GameModel } from './Models/GameModel';
const { ccclass, property } = _decorator;

@ccclass('AppInstaller')
export class AppInstaller  extends Component 
{
    @property(GameConfig)
    gameConfig : GameConfig;

    @property(InputService)
    inputService: InputService

    @property(PlayerController)
    playerController: PlayerController

    public installBinds() 
    {
        this.bindGameConfig();
        this.bindGameModel();
        this.bindStorageService();
        this.bindInputService();
        this.bindPlayerController();
    }
    bindGameModel() {
        ServiceLocator.bind<GameModel>("GameModel", new GameModel());
    }

    bindPlayerController() {
        ServiceLocator.bind<PlayerController>("PlayerController", this.playerController);
    }

    bindInputService() {
        ServiceLocator.bind<IInputService>("InputService", this.inputService);
    }

    private bindGameConfig() {
        ServiceLocator.bind<GameConfig>("GameConfig", this.gameConfig);
    }

    private bindStorageService() {
        ServiceLocator.bind<StorageService>("StorageService", new StorageService());
    }
}



