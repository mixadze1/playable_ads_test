import { _decorator, Component, Node, Prefab, instantiate, Enum } from 'cc';
import { EntityType } from '../EntitiesLogic/EntitiesCollectionHandler';
const { ccclass, property } = _decorator;

@ccclass('EntityPoolBehaviour')
export class EntityPoolBehaviour extends Component {

    @property(Prefab)
    prefab: Prefab = null!;

    @property
    initialSize: number = 10;

    @property({ type: Enum(EntityType) })
    entityFrom: EntityType;

    private pool: Node[] = [];

    public initialize() {
        this.initPool();
    }

    private initPool() {
        for (let i = 0; i < this.initialSize; i++) {
            const node = instantiate(this.prefab);
            node.active = false;
            this.pool.push(node);
            this.node.addChild(node); 
        }
    }

    get(): Node {
        if (this.pool.length > 0) {
            const node = this.pool.pop()!;
            node.active = true;
            return node;
        } else {
            const node = instantiate(this.prefab);
            return node;
        }
    }

    release(node: Node) {
        node.active = false;
        this.pool.push(node);
        this.node.addChild(node);
    }

    clear() {
        this.pool.forEach(n => n.destroy());
        this.pool = [];
    }
}
