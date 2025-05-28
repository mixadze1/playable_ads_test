import { _decorator, Collider, Component, Enum, Node, RigidBody, tween, Vec3 } from 'cc';
import { EntityType } from './EntitiesCollectionHandler';
import { Logger } from '../Logger';
const { ccclass, property } = _decorator;

@ccclass('EntityView')
export class EntityView extends Component {
   
    @property
    delayEnable: number = 0.3;
    @property
    delayDisable: number = 0.1;

    @property({ type: Enum(EntityType) })
    entityFrom: EntityType = EntityType.Default;

    @property(RigidBody)
    rigidbody: RigidBody;
    @property(Collider)
    collider: Collider;

    public disableView() {
        this.node.setScale(Vec3.ONE);
        tween(this.node)
            .to(this.delayDisable, { scale: Vec3.ZERO }, { easing: 'backOut' })
            .call(() => {
                this.node.active = false;
            })
            .start();
    }

     disablePhysic() {
        if(this.rigidbody == null)
        {
            Logger.Log("Entity view not find RigidBody to disable physics!");
            return;
        }
        this.collider.enabled = false;
        this.rigidbody.useGravity = false;
        this.rigidbody.enabled = false;
    }
        

   public EnableView(duration: number = -1, scale: number = 1) {
      this.node.active = true;
        this.node.setScale(Vec3.ZERO);
        tween(this.node)
            .to(duration == -1 ? this.delayEnable : duration, { scale: new Vec3(scale,scale,scale) }, { easing: 'backOut' })
            .start();
    }
    
}


