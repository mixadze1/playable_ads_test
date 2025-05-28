import { _decorator, Component, Enum, Node } from 'cc';
import { EntityType } from '../EntitiesLogic/EntitiesCollectionHandler';
const { ccclass, property } = _decorator;

@ccclass('FillTriggerView')
export class FillTriggerView extends Component {
    
     @property({ type: Enum(EntityType) })
      EntityType: EntityType;
}


