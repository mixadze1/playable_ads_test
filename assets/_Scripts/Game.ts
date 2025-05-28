import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { PlayerController } from './PlayerLogic/PlayerController';
import { GameConfig } from './Configs/GameConfig';
import { GameModel, IPlayerInfo } from './Models/GameModel';
import { PlayerMovementController } from './PlayerLogic/PlayerMovementController';
import { PlayerAnimationHandler } from './PlayerLogic/PlayerAnimationHandler';
import { CameraFollow } from './PlayerLogic/CameraFollow';
import { EntityPoolBehaviour } from './Services/EntityPoolBehaviour';
import { FillCollectionHandler } from './EntitiesLogic/FillCollectionHandler';
import { EntitiesConfigs } from './EntitiesLogic/EntitiesConfigs';
import { PoolContainer } from './Services/PoolContainer';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    
     public initialize()
     {
         const instancePlayer =  ServiceLocator.get<PlayerController>("PlayerController");
         const gameConfig = ServiceLocator.get<GameConfig>("GameConfig");
         const gameModel = ServiceLocator.get<GameModel>("GameModel");
         const fillCollectionHandler = ServiceLocator.get<FillCollectionHandler>("FillCollectionHandler");
         const playerInfo = gameModel as IPlayerInfo;  
         const playerMovement = ServiceLocator.get<PlayerMovementController>
         ("PlayerMovementController");
         const cameraFollow = ServiceLocator.get<CameraFollow>("CameraFollow");
         const poolContainer = ServiceLocator.get<PoolContainer>("PoolContainer");
         const playerAnimationHandler = ServiceLocator.get<PlayerAnimationHandler>
         ("PlayerAnimationHandler");

         instancePlayer.initialize(gameModel, gameConfig, poolContainer);
         playerMovement.initilaize(gameConfig, gameModel);
         playerAnimationHandler.initialize(gameConfig, gameModel);
         
         cameraFollow.initialize(gameConfig);
         cameraFollow.setupTarget(instancePlayer.node);
         gameModel.initialize(gameConfig);

         fillCollectionHandler.initialize(gameModel);
      }
     
  
}


