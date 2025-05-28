declare const mraid: {
    open: (url: string) => void;
};

import { _decorator, Button, Component, Node } from 'cc';
import { Logger } from '../Logger';
const { ccclass, property } = _decorator;

@ccclass('ButtonToStore')
export class ButtonToStore extends Component {

    @property(Button)
    click: Button;

    onLoad() {
        this.click.node.on(Button.EventType.CLICK, this.onCTAClick, this);
    }

    onCTAClick() {
        Logger.Log("[ButtonToStore] OnClick button Store!");
        let clickURL = 'https://play.google.com/store/apps/details?id=com.vizorapps.klondike';

        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            clickURL = 'https://apps.apple.com/us/app/klondike-adventures-farm-game/id1127240206';
        }

        if (typeof mraid !== 'undefined') {
            mraid.open(clickURL);
        } else {
            window.open(clickURL, '_blank');
        }
    }
}
