import { _decorator, Component, Node } from 'cc';
import { EntityType } from './EntitiesCollectionHandler';
const { ccclass, property } = _decorator;

@ccclass('GameEntityModel')
export class GameEntityModel  {
    TypeEntity: EntityType;

    constructor(typeEntity: EntityType)
    {
        this.TypeEntity = typeEntity;
    }
}


