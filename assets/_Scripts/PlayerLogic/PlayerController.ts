import { _decorator, Component, Node, RigidBody, Vec3 } from 'cc';
import { IInputService } from '../Services/InputService';
import { Logger } from '../Logger';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    
    @property
    private rigidbody: RigidBody;
    private inputService: IInputService;

    public initialize(inputService: IInputService) {
        this.inputService = inputService;    
        Logger.Log("Get input Service: " + inputService.GetDirection());
    }

    public update(deltaTime: number)
    {
        if(this.inputService.GetDirection() == new Vec3(0,0,0))
        {

            return;
        }
    }
}



