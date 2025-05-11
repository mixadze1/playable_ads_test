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
import { IInputService } from '../Services/InputService';
import { Logger } from '../Logger';
import { instance as joystickEvents, JoystickDataType, SpeedType } from '../../Joystick/scripts/Joystick';
import { GameConfig } from '../Configs/GameConfig';
import { GameModel } from '../Models/GameModel';
import { PlayerMovement } from './PlayerMovement';

const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

 

    private gameConfig: GameConfig;
    private moveDirection: Vec3 = v3();
    private isMoving = false;

    public initialize(gameConfig: GameConfig, gameModel: GameModel) {
        this.gameConfig = gameConfig;

        joystickEvents.on(Input.EventType.TOUCH_MOVE, this.onJoystickMove, this);
        joystickEvents.on(Input.EventType.TOUCH_END, this.onJoystickEnd, this);
    }

    onJoystickMove(event: EventTouch, data: JoystickDataType) {
        this.moveDirection.set(data.moveVec.x, 0, -data.moveVec.y);
        Logger.Log("Pos: " + data.moveVec);
        this.isMoving = true;
    }

    onJoystickEnd() {
        this.moveDirection.set(0, 0, 0);
        this.isMoving = false;

        if (this.rigidbody) {
            this.rigidbody.setLinearVelocity(v3());
        }
    }

    update(deltaTime: number) {
        if (!this.rigidbody || !this.isMoving) return;

        const velocity = this.moveDirection.clone().normalize().multiplyScalar(this.gameConfig.speed);
        this.rigidbody.setLinearVelocity(velocity);

        if (!this.moveDirection.equals(Vec3.ZERO)) {
            const currentRotation = this.node.rotation;
            const targetForward = this.moveDirection.clone().normalize();
            const up = Vec3.UP;

            const targetRotation = new Quat();
            Quat.fromViewUp(targetRotation, targetForward, up);

       
            this.node.setRotation(targetRotation);
        }
    }

    onDestroy() {
        joystickEvents.off(Input.EventType.TOUCH_MOVE, this.onJoystickMove, this);
        joystickEvents.off(Input.EventType.TOUCH_END, this.onJoystickEnd, this);
    }
}
