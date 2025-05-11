import { _decorator, Component, EventTouch, Input, Node, Quat, RigidBody, v3, Vec3 } from 'cc';
import { GameConfig } from '../Configs/GameConfig';
import { GameModel } from '../Models/GameModel';
import { Logger } from '../Logger';
import { instance as joystickEvents, JoystickDataType, SpeedType } from '../../Joystick/scripts/Joystick';

const { ccclass, property } = _decorator;

@ccclass('PlayerMovementController')
export class PlayerMovementController extends Component
{  
    @property(RigidBody)
    private rigidbody: RigidBody = null;
        
    private moveDirection: Vec3 = v3();
    private gameConfig: GameConfig;
    private gameModel: GameModel;

    public initilaize(gameConfig: GameConfig, gameModel: GameModel)
    {
        this.gameConfig = gameConfig;
        this.gameModel = gameModel;

        joystickEvents.on(Input.EventType.TOUCH_MOVE, this.onJoystickMove, this);
        joystickEvents.on(Input.EventType.TOUCH_END, this.onJoystickEnd, this);
    }

    public update(deltaTime: number) {
        if (!this.rigidbody || !this.gameModel.IsMove) 
            return;

        const velocity = this.moveDirection.clone().normalize().multiplyScalar(this.gameConfig.Speed);
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

    private onJoystickEnd() {
        this.moveDirection.set(0, 0, 0);
        this.gameModel.IsMove = false;
        this.gameModel.onStopMove();

        if (this.rigidbody) {
            this.rigidbody.setLinearVelocity(v3());
        }
    }

    private onJoystickMove(event: EventTouch, data: JoystickDataType) {
        this.moveDirection.set(data.moveVec.x, 0, -data.moveVec.y);
        Logger.Log("Pos: " + data.moveVec);
        this.gameModel.IsMove = true;
        this.gameModel.onMove();
    }

    public onDestroy() {
        joystickEvents.off(Input.EventType.TOUCH_MOVE, this.onJoystickMove, this);
        joystickEvents.off(Input.EventType.TOUCH_END, this.onJoystickEnd, this);
    }
}

