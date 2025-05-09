import { _decorator, Color, Component, Game, Node } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { GameConfig } from './GameConfig';
import { Logger} from './Logger';
import { StorageService } from './Services/StorageService';
const { ccclass, property } = _decorator;

@ccclass('AppInstaller')
export class AppInstaller  extends Component 
{
    @property(GameConfig)
    gameConfig : GameConfig;

    public installBinds() 
    {
        this.BindGameConfig();
        this.BindStorageService();
    }

    private BindGameConfig() {
        ServiceLocator.bind<GameConfig>("GameConfig", this.gameConfig);
    }

    private BindStorageService() {
        ServiceLocator.bind<StorageService>("StorageService", new StorageService());
    }
}



