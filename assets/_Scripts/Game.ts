import { _decorator, Component, Node } from 'cc';
import { Logger } from './Logger';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    
     public Initialize()
     {
        Logger.Log("Do nothing!");
     }
  
}


