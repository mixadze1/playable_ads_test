import { _decorator, Component, Node, Vec3, v3 } from 'cc';
import { GameConfig } from '../Configs/GameConfig';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
   
    private target: Node = null;
    private desiredPos = new Vec3();
    private smoothedPos = new Vec3();
    private gameConfig: GameConfig;

    public initialize(gameConfig: GameConfig)
    {
        this.gameConfig = gameConfig;
    }

    public setupTarget(target: Node)
    {
        this.target = target;
    }

    update(deltaTime: number) {
        if (!this.target) return;

        Vec3.add(this.desiredPos, this.target.worldPosition, this.gameConfig.OffsetCamera);

        Vec3.lerp(this.smoothedPos, this.node.worldPosition, this.desiredPos, this.gameConfig.Ratio);
        this.node.setWorldPosition(this.smoothedPos);

        const pos = this.target.worldPosition;
        const offsetPos = new Vec3(pos.x, pos.y + this.gameConfig.CameraOffsetTarget, pos.z);
        this.node.lookAt(offsetPos);
    }
}
