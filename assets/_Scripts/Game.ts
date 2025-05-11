import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from './ServiceLocator';
import { PlayerController } from './PlayerLogic/PlayerController';
import { GameConfig } from './Configs/GameConfig';
import { GameModel, IPlayerInfo } from './Models/GameModel';
import { PlayerMovementController } from './PlayerLogic/PlayerMovementController';
import { PlayerAnimationHandler } from './PlayerLogic/PlayerAnimationHandler';
import { CameraFollow } from './PlayerLogic/CameraFollow';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    
     public initialize()
     {
         const instancePlayer =  ServiceLocator.get<PlayerController>("PlayerController");
         const gameConfig = ServiceLocator.get<GameConfig>("GameConfig");
         const gameModel = ServiceLocator.get<GameModel>("GameModel");
         const playerInfo = gameModel as IPlayerInfo;  
         const playerMovement = ServiceLocator.get<PlayerMovementController>
         ("PlayerMovementController");

         const cameraFollow = ServiceLocator.get<CameraFollow>("CameraFollow");

         const playerAnimationHandler = ServiceLocator.get<PlayerAnimationHandler>
         ("PlayerAnimationHandler");

         instancePlayer.initialize();
         playerMovement.initilaize(gameConfig, gameModel);
         playerAnimationHandler.initialize(gameConfig, gameModel);
         
         cameraFollow.initialize(gameConfig);
         cameraFollow.setupTarget(instancePlayer.node);
      }
     
  
}


