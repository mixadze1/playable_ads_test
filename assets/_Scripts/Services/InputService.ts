import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('InputService')
export class InputService extends Component implements IInputService {
    
    GetDirection(): Vec3 {
        return new Vec3(0, 0, 0);
    }
}

export interface IInputService {
    GetDirection(): Vec3;
}


