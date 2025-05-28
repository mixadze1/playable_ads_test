import { _decorator, Component, Collider, ITriggerEvent, ICollisionEvent, Node, instantiate, Vec3, game, Color } from 'cc';
import { EntityType } from './EntitiesCollectionHandler';
import { EntitiesConfigs } from './EntitiesConfigs';
import { Logger } from '../Logger';
import { FillTriggerView } from '../Triggers/FillTriggerView';
import { EntityView } from './EntityView';
import { GameModel } from '../Models/GameModel';
import { CastFactoryEntitesTrigger } from '../Triggers/CastFactoryEntitesTrigger';

const { ccclass, property } = _decorator;

@ccclass('FillCollectionHandler')
export class FillCollectionHandler extends Component {
   
    private hasTriggered = false;
    private gameModel: GameModel;

    @property(Node)
    entityParent: Node = null;

    currentEntityType: EntityType = EntityType.Default;

    deltaTime: number = 0;
    
    @property
    durationPick: number = 1;


    private readonly OnCollectEntity = 'onCollect';

    public initialize(gameModel: GameModel) {
        this.gameModel = gameModel;
    }

    onEnable() {
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerStay', this.onTriggerStay, this);
            collider.on('onTriggerExit', this.onTriggerExit, this);
            collider.on('onCollisionEnter', this.onCollisionEnter, this);
        }
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        if (collider) {
            collider.off('onTriggerStay', this.onTriggerStay, this);
            collider.off('onTriggerExit', this.onTriggerExit, this);
            collider.off('onCollisionEnter', this.onCollisionEnter, this);
        }
    }

    private onTriggerStay(event: ITriggerEvent) {
        const otherNode = event.otherCollider.node;
        const isTouchEntity = this.CheckTouchEntitiesTrigger(otherNode);
        const isTouchFactory = this.checkTouchFactoryEntity(otherNode);
    }

    private onTriggerExit(event: ITriggerEvent)
    {
         const otherNode = event.otherCollider.node;
        this.checkOutEntitiesFactory(otherNode);
    }

    checkOutEntitiesFactory(otherNode: Node) {
        const factory = otherNode.getComponent(CastFactoryEntitesTrigger);

        if(factory == null)
            return false;

        factory.onUnTouch();
        return true;
    }

    checkTouchFactoryEntity(otherNode: Node) {
        const factory = otherNode.getComponent(CastFactoryEntitesTrigger);
        if(factory == null)
            return;

        factory.onTouch();
    }

    private onCollisionEnter(event: ICollisionEvent) {
        const otherNode = event.otherCollider.node;
        this.checkTouchEggs(otherNode);
    }

    checkTouchEggs(otherNode: Node): boolean {
        const entityView = otherNode.getComponent(EntityView);

        if(this.gameModel.isMaxEntities())
            return;

        if (entityView) {
            entityView.disableView();
            Logger.Log("Touch Eggs via Collision!");
            return true;
        }
        return false;
    }

    private CheckTouchEntitiesTrigger(otherNode: Node): boolean {
        const fillTriggerComponent = otherNode.getComponent(FillTriggerView);
        if (fillTriggerComponent) {
            this.deltaTime += game.deltaTime;
            if (this.deltaTime >= this.durationPick) {
                this.deltaTime = 0;
                Logger.Log("[Fill trigger] Pick entity!", Color.GREEN);
            this.gameModel.onCollectEntities(fillTriggerComponent.EntityType);
            }
            return true;
        }
        return false;
    }
}
