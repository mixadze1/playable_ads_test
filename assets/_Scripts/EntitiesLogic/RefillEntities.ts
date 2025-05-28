import { _decorator, Component, Node, Tween, tween, Vec3 } from 'cc';
import { EntityView } from './EntityView';
import { Logger } from '../Logger';
const { ccclass, property } = _decorator;

@ccclass('RefillEntities')
export class RefillEntities extends Component {

    @property
    private delay: number = 5;

    @property
    private delayStep: number = 0.03;

    @property([EntityView])
    private entities: EntityView[] = [];
    private originalPositions: Vec3[] = [];
    private elapsedTime: number = 0;
    private refillTween: Tween<Node>;

    public onLoad() {
        Logger.Log("Start refill");
        this.entities = this.getComponentsInChildren(EntityView);
        this.originalPositions = this.entities.map(entity => entity.node.getPosition().clone());
    }

    update(dt: number) {
        this.elapsedTime += dt;
        if (this.elapsedTime >= this.delay) {
            this.elapsedTime = 0;
            this.refillEntities();
        }
    }

    private refillEntities()
    {
        if (this.refillTween) {
            Logger.Log("Refill already in progress.");
            return;
        }

        let activeCount = this.entities.filter(e => !e.node.active).length;

        if (activeCount == 0)
            return;

        let t = tween(this.node); 

        t = this.StartTweensEnableEntitiesView(t);

        this.refillTween = t
        .call(() => {
            Logger.Log("Refill complete.");
            this.refillTween = null;
        })
        .start();
    }

    private StartTweensEnableEntitiesView(t: Tween<Node>) : Tween<Node> {
        let index = 0;
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            if (!entity.node.active) {
                const position = this.originalPositions[i];
                const node = entity.node;
                t = t.delay(this.delayStep).call(() => {
                    node.active = true;
                    node.setPosition(position);
                    entity.EnableView();
                });
                index++;
            }
        }
        return t;
    }
}
