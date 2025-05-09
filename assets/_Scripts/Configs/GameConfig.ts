import { _decorator, Component, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameConfig')
export class GameConfig extends Component {

    @property({ type: CCFloat, tooltip: "Player movement speed", displayName: "Speed", group: "Player" })
    speed: number = 5;

    @property({ type: CCFloat, tooltip: "Player rotation speed", displayName: "Rotation Speed", group: "Player" })
    rotationSpeed: number = 180;
}
