import { _decorator, Color, Component, Enum, Node, Vec3 } from 'cc';
import { GameModel } from '../Models/GameModel';
import { GameConfig } from '../Configs/GameConfig';
import { PoolContainer } from '../Services/PoolContainer';
import { EntityType } from '../EntitiesLogic/EntitiesCollectionHandler';
import { EntityView } from '../EntitiesLogic/EntityView';
import { Logger } from '../Logger';
const { ccclass, property } = _decorator;

@ccclass('PlayerEntityViewConfig')
    export class PlayerEntityViewConfig
    {
        @property({ type: Enum(EntityType) })
        entityType: EntityType = EntityType.Default;

        @property([Node])
        spawnPoints: Node[] = [];

        @property
        offsetY: number = 1;

        @property
        scale: number = 0.75;

        @property
        durationEnable: number = 0.3;
    }

@ccclass('PlayerView')
export class PlayerView extends Component {
    
    @property([PlayerEntityViewConfig])
    spawnPoints: PlayerEntityViewConfig[] = [];

    @property([EntityView])
    entitiesCollectView: EntityView[] = [];

    gameModel: GameModel;
    gameConfig: GameConfig;
    poolContainer: PoolContainer;

    public initialize(gameModel: GameModel, gameConfig: GameConfig, poolContainer: PoolContainer)
    {
        this.poolContainer = poolContainer;
        this.gameConfig = gameConfig;
        this.gameModel = gameModel;
    
        Logger.Log(`[PlayerView] is initialized`);
        gameModel.Event.addEventListener(gameModel.OnCollectEntityKey, () => this.OnCollectEntity());
        gameModel.Event.addEventListener(gameModel.OnRemoveEntityKey, () => this.OnRemoveEntity());
    }

    OnRemoveEntity() {
        const currentEntityType = this.gameModel.getEntityType()
        const currentPool = this.poolContainer.getCurrentPool(currentEntityType);
        currentPool.release(this.entitiesCollectView.pop().node);
    }

OnCollectEntity() {
        Logger.Log(`[PlayerView] On start collectEntity`, Color.GREEN);

    const currentEntityType = this.gameModel.getEntityType();
    const currentPool = this.poolContainer.getCurrentPool(currentEntityType);
    const configSpawn = this.spawnPoints.find(x => x.entityType === currentEntityType);

    if (!configSpawn) {
        console.error(`[PlayerView] No spawn config found for entity type: ${currentEntityType}`);
        return;
    }

    const instanceEntity = currentPool.get().getComponent(EntityView);
    if (instanceEntity == null) {
        console.error(`[PlayerView] Not find instance Entity with pool: ${currentPool.entityFrom}. Check Pool!`);
        return;
    }

    instanceEntity.disablePhysic();
    instanceEntity.EnableView(configSpawn.durationEnable, configSpawn.scale);
    instanceEntity.node.scale = Vec3.ONE;
    this.entitiesCollectView.push(instanceEntity);

    const totalSpawned = this.entitiesCollectView.length - 1;
    const points = configSpawn.spawnPoints;
    const offsetY = configSpawn.offsetY;

    const pointIndex = totalSpawned % points.length;
    const offsetIndex = Math.floor(totalSpawned / points.length);

    const basePoint = points[pointIndex];
    const spawnPosition = basePoint.position.clone();
    spawnPosition.y += offsetY * offsetIndex;

    instanceEntity.node.setPosition(spawnPosition);
    instanceEntity.node.setParent(this.node); 

    Logger.Log(`[PlayerView] Spawned entity ${currentEntityType} at index ${totalSpawned}, using spawn point ${pointIndex}, Y offset step ${offsetIndex}`, Color.GREEN);
}

}




