import { _decorator, Component, Game, Node } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { StorageService } from './Services/StorageService';
import { PlayerController } from './PlayerLogic/PlayerController';
import { GameConfig } from './Configs/GameConfig';
import { GameModel, IPlayerInfo } from './Models/GameModel';
import { PlayerMovementController } from './PlayerLogic/PlayerMovementController';
import { PlayerAnimationHandler } from './PlayerLogic/PlayerAnimationHandler';
import { CameraFollow } from './PlayerLogic/CameraFollow';
import { EntityPoolBehaviour } from './Services/EntityPoolBehaviour';
import { EntitiesConfigs } from './EntitiesLogic/EntitiesConfigs';
import { FillCollectionHandler } from './EntitiesLogic/FillCollectionHandler';
import { PoolContainer } from './Services/PoolContainer';
const { ccclass, property } = _decorator;

@ccclass('AppInstaller')
export class AppInstaller  extends Component 
{
    @property(GameConfig)
    gameConfig : GameConfig;
 
    @property(PlayerController)
    playerController: PlayerController

    @property(PlayerMovementController)
    playerMovement: PlayerMovementController

    @property(PlayerAnimationHandler)
    playerAnimations: PlayerAnimationHandler

    @property(CameraFollow)
    cameraFollow: CameraFollow;

    @property(PoolContainer)
    poolContainer: PoolContainer;

    @property(EntitiesConfigs)
    entitiesConfigs: EntitiesConfigs;

    @property(FillCollectionHandler)
    fillCollectionHandler: FillCollectionHandler;

    public installBinds() 
    {
        this.bindGameConfig();
        this.bindGameModel();
        this.bindStorageService();
        this.bindPlayerController();
        this.bindCameraFollow();
        this.bindPools();
        this.bindEntitiesConfigs();
    }
    bindEntitiesConfigs() {
        ServiceLocator.bind<EntitiesConfigs>("EntitiesConfigs", this.entitiesConfigs);
    }
    
    bindPools() {
        ServiceLocator.bind<PoolContainer>("PoolContainer", this.poolContainer);
    }

    bindCameraFollow() {
        ServiceLocator.bind<CameraFollow>("CameraFollow", this.cameraFollow);
    }
    
    bindGameModel() {
        const gameModel = new GameModel();
        ServiceLocator.bind<GameModel>("GameModel", gameModel);
    }

    bindPlayerController() {
        ServiceLocator.bind<PlayerController>("PlayerController", this.playerController);
        ServiceLocator.bind<PlayerMovementController>("PlayerMovementController", this.playerMovement);
        ServiceLocator.bind<PlayerAnimationHandler>("PlayerAnimationHandler", this.playerAnimations);
        ServiceLocator.bind<FillCollectionHandler>("FillCollectionHandler", this.fillCollectionHandler);
    }

    private bindGameConfig() {
        ServiceLocator.bind<GameConfig>("GameConfig", this.gameConfig);
    }

    private bindStorageService() {
        ServiceLocator.bind<StorageService>("StorageService", new StorageService());
    }
}



