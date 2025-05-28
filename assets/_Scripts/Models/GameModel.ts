import { _decorator, Color, Node } from 'cc';
import { StorageService } from '../Services/StorageService';
import { GameConfig } from '../Configs/GameConfig';
import { Logger } from '../Logger';
import { GameEntityModel } from '../EntitiesLogic/GameEntityModel';
import { EntityType } from '../EntitiesLogic/EntitiesCollectionHandler';
const { ccclass } = _decorator;

@ccclass('GameModel')
export class GameModel implements IPlayerInfo {
  
    
    private gameConfig: GameConfig;
    
    public IsMove: boolean = false;

    public Event = new EventTarget();

    private collectEntities: GameEntityModel[] = [];

    public lastEntityType: EntityType = EntityType.Default;

    public readonly MoveStartKey = 'start-move';
    public readonly MoveEndKey = 'end-move';

    public readonly OnCollectEntityKey = 'collect-entity';
    public readonly OnRemoveEntityKey = 'remove-entity';

    public readonly OnEmptyEntityKey = 'empty-entity';

    public readonly OnCollectEntity = 'collect-entity';

    public initialize(gameConfig: GameConfig) {
        this.gameConfig = gameConfig;
    }

    isMaxEntities() {
        if(this.collectEntities.length >= this.gameConfig.MaxEntities)
            return true;
        return false;
    }

    amountEntities() {
        return this.collectEntities.length;
    }

    getEntityType()
    {
        return this.lastEntityType;
    }

    onCollectEntities(entityType: EntityType)
    {
        if(this.isMaxEntities())
        {
            Logger.Log("[gameModel] on try Collect. Max entities!", Color.YELLOW);
            return;
        }

        if(this.collectEntities.length != 0 && this.collectEntities[0].TypeEntity != entityType)
        {           
            Logger.Log("[gameModel] on try Collect. Not same entity!", Color.YELLOW);
            return;
        }

        this.lastEntityType = entityType;
        this.collectEntities.push(new GameEntityModel(entityType));
        this.Event.dispatchEvent(new CustomEvent(this.OnCollectEntityKey));
        Logger.Log(`[gameModel] Add entity: ${this.collectEntities[0].TypeEntity.toString()}, remaining: ${this.collectEntities.length}`, Color.GREEN);
    }

    onRemoveEntity()
    {
        if(this.isEmptyEntity())
        {
            this.onEmptyEntities();
            Logger.Log("[gameModel] on Deselect Zero entities!", Color.YELLOW);
            return;
        }
        Logger.Log(`[gameModel] Removed entity of type  ${this.collectEntities[0].TypeEntity.toString()},  remaining: ${this.collectEntities.length}`, Color.GREEN);
        this.collectEntities.pop();
        this.Event.dispatchEvent(new CustomEvent(this.OnRemoveEntityKey));
    }
    
    isEmptyEntity() {
        return this.collectEntities.length <= 0;
    }

    isMove(): boolean {
        return this.IsMove;
    }

    public onMove()
    {
        this.IsMove = true;
       this.Event.dispatchEvent(new CustomEvent(this.MoveStartKey));
    }

    public onStopMove()
    {
        this.IsMove = false;
        this.Event.dispatchEvent(new CustomEvent(this.MoveEndKey));
    }

    public onEmptyEntities()
    {
        this.Event.dispatchEvent(new CustomEvent(this.OnEmptyEntityKey));
    }
}

export interface IPlayerInfo {
    isMove(): boolean;
}