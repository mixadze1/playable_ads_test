import {
    _decorator,
    Component,
    EventTouch,
    Input,
    Node,
    RigidBody,
    SystemEventType,
    Vec3,
    v3,
    Quat,
    math
} from 'cc';
import { Logger } from '../Logger';
import { instance as joystickEvents, JoystickDataType, SpeedType } from '../../Joystick/scripts/Joystick';
import { GameConfig } from '../Configs/GameConfig';
import { GameModel } from '../Models/GameModel';
import { PlayerView } from './PlayerView';
import { PoolContainer } from '../Services/PoolContainer';

const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property(PlayerView)
    playerView: PlayerView;

    public initialize(gameModel: GameModel, gameConfig: GameConfig, poolContainer: PoolContainer) {
        this.playerView.initialize(gameModel, gameConfig, poolContainer);
    }
}
