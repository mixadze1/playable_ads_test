import { _decorator, Component, Enum, Node, Prefab } from 'cc';
import { EntityType } from './EntitiesCollectionHandler';
import { EntityView } from './EntityView';
const { ccclass, property } = _decorator;

@ccclass('EntityConfig')
export class EntityConfig {
    @property({ type: Enum(EntityType) })
    EntityType: EntityType;

    @property
    Scale: number = 1;

    @property
    GridSize: number = 2;

    @property(Prefab)
    prefab: Prefab;
}

@ccclass('EntitiesConfigs')
export class EntitiesConfigs extends Component {
    @property({ type: [EntityConfig] })
    entitiesConfigs: EntityConfig[] = [];
}
