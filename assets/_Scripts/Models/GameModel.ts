import { _decorator } from 'cc';
import { StorageService } from '../Services/StorageService';
const { ccclass } = _decorator;

@ccclass('GameModel')
export class GameModel implements IPlayerInfo {

    

    public IsMove: boolean = false;
    public IsCollectedEntities: boolean = false;

    public Event = new EventTarget();

    public readonly MoveStartKey = 'start-move';
    public readonly MoveEndKey = 'end-move';

    public readonly OnCollectEntityKey = 'collect-entity';
    public readonly OnEmptyEntityKey = 'empty-entity';

    public initialize() {
        
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
        this.IsCollectedEntities = false;
               this.Event.dispatchEvent(new CustomEvent(this.OnEmptyEntityKey));

    }

    public onNotEmptyEntities()
    {
        this.IsCollectedEntities = false;
        this.Event.dispatchEvent(new CustomEvent(this.OnCollectEntityKey));
    }
}

export interface IPlayerInfo {
    isMove(): boolean;
}