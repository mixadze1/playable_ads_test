import { _decorator, Component,  Node } from 'cc';
import { AppInstaller } from './AppInstaller';
import { Game } from './Game';
const { ccclass, property } = _decorator;

@ccclass('AppStartup')
export class AppStartup extends Component {

    @property(AppInstaller)
    private appInstaller: AppInstaller = null; 

    @property(Game)
    private game: Game = null;
    
    public start() 
    {
        this.appInstaller.installBinds();
        this.game.initialize()
    }
    
}


