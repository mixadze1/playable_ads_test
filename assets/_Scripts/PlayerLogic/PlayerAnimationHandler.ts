import { _decorator, Component, Node, Animation, SkeletalAnimationState, SkeletalAnimation } from 'cc';
import { GameConfig } from '../Configs/GameConfig';
import { GameModel, IPlayerInfo } from '../Models/GameModel';
import { Logger } from '../Logger';
const { ccclass, property } = _decorator;

@ccclass('PlayerAnimationHandler')
export class PlayerAnimationHandler extends Component {

    private gameConfig: GameConfig;
    private gameModel: GameModel;
    playerInfo: IPlayerInfo;
    
    @property(Animation)
    private animation: SkeletalAnimation;

    static readonly ANIMATION_IDLE = 'Armature|Armature|idle';
    static readonly ANIMATION_MOVE = 'Armature|Armature|run';
    static readonly ANIMATION_COLLECT = 'Armature|Armature|run_carry';
    static readonly ANIMATION_IDLE_COLLECT = 'Armature|Armature|idle_carry';

    public initialize(gameConfig: GameConfig, gameModel: GameModel) {
        this.gameConfig = gameConfig;
        this.gameModel = gameModel;

        this.gameModel.Event.addEventListener(this.gameModel.MoveStartKey, 
            () => this.onMove());

        this.gameModel.Event.addEventListener(this.gameModel.MoveEndKey,
             () => this.onStopMove());

        Logger.Log("Initialize animation Handler!");
    }

    private onStopMove() {
     
        if(!this.gameModel.isEmptyEntity())
        {
            this.animation.play(PlayerAnimationHandler.ANIMATION_IDLE_COLLECT);
            return;
        }

        this.animation.play(PlayerAnimationHandler.ANIMATION_IDLE);
    }

    private onMove() {
        if (!this.gameModel.isEmptyEntity()) {

            if (this.animation.getState(PlayerAnimationHandler.ANIMATION_COLLECT) 
                && this.animation.getState(PlayerAnimationHandler.ANIMATION_COLLECT).isPlaying) {
                return;
            }

            this.animation.play(PlayerAnimationHandler.ANIMATION_COLLECT);
            return;
        }

        if (this.animation.getState(PlayerAnimationHandler.ANIMATION_MOVE)
             && this.animation.getState(PlayerAnimationHandler.ANIMATION_MOVE).isPlaying) {
            return;
        }

        this.animation.play(PlayerAnimationHandler.ANIMATION_MOVE);
    }

    public onDestroy() {
        this.gameModel.Event.removeEventListener(this.gameModel.MoveStartKey, this.onMove);
        this.gameModel.Event.removeEventListener(this.gameModel.MoveEndKey, this.onStopMove);
    }
}

