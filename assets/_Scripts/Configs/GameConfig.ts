import { _decorator, Component, CCFloat, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameConfig')
export class GameConfig extends Component {

    @property({ type: CCFloat, tooltip: "Player movement speed", displayName: "Speed", group: "Player" })
    Speed: number = 5;

    @property({ type: Vec3, tooltip: "Camera offset", displayName: "Camera offset", group: "Camera" })
    OffsetCamera: Vec3 = new Vec3(0, 10, -10); 

    @property({ type: CCFloat, tooltip: "Camera ratio", displayName: "Ratio", group: "Camera" })
    Ratio: number = 0.05;
}
