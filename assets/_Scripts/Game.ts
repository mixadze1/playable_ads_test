import { _decorator, Component, Node } from 'cc';
import { Logger } from './Logger';
import { ServiceLocator } from './ServiceLocator';
import { PlayerController } from './PlayerLogic/PlayerController';
import { IInputService } from './Services/InputService';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    
     public initialize()
     {
        const instancePlayer =  ServiceLocator.get<PlayerController>("PlayerController");
        const inputService = ServiceLocator.get<IInputService>("InputService");
        instancePlayer.initialize(inputService);
     }
     
  
}


