import { _decorator, Component, Node } from 'cc';
import { EntityPoolBehaviour } from './EntityPoolBehaviour';
import { EntityType } from '../EntitiesLogic/EntitiesCollectionHandler';
const { ccclass, property } = _decorator;

@ccclass('PoolContainer')
export class PoolContainer extends Component {
    @property(EntityPoolBehaviour)
    poolEggs: EntityPoolBehaviour;

    @property(EntityPoolBehaviour)
    poolGroupEggs: EntityPoolBehaviour;

    onLoad() {
        this.poolEggs.initialize();
        this.poolGroupEggs.initialize();
    }

    getCurrentPool(entityType: EntityType)
    {
        switch(entityType)
        {
            case EntityType.Eggs:
                return this.poolEggs;

            case EntityType.EggsGroup:
                return this.poolGroupEggs;    
        }
    }
}


