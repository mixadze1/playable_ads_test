import { _decorator, BoxCollider, Color, color, Component, Enum, Node, Sprite } from 'cc';
import { EntityType } from '../EntitiesLogic/EntitiesCollectionHandler';
const { ccclass, property } = _decorator;

@ccclass('CastFactoryEntitesTrigger')
export class CastFactoryEntitesTrigger extends Component {
      
    @property({ type: Enum(EntityType) })
    entityFrom: EntityType;

    @property({ type: Enum(EntityType) })
    entityTo: EntityType;

    @property
    maxEntities: number = 32;

    @property(Sprite)
    sprite: Sprite;

    @property(Node)
    moveTo: Node;

    public onTouch()
    {
        this.sprite.color = Color.BLUE;
    }

    public onUnTouch()
    {
        this.sprite.color = Color.WHITE;
    }
}


