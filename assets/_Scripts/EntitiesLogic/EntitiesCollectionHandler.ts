import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntitiesCollectionHandler')
export class EntitiesCollectionHandler extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
}

export enum EntityType {
    Default,
    Eggs,
    EggsGroup,
}


