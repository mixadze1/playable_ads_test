import {
  _decorator,
  EventTarget,
  Component,
  Node,
  Enum,
  UIOpacity,
  UITransform,
  EventTouch,
  SystemEventType,
  Vec3,
  Vec2,
  Size,
  CCInteger,
} from "cc";
import { IInputService } from "../../_Scripts/Services/InputService";
const { ccclass, property } = _decorator;

export const instance = new EventTarget();

export const SET_JOYSTICK_TYPE = "SET_JOYSTICK_TYPE";

export enum DirectionType {
  FOUR,
  EIGHT,
  ALL,
}

export enum SpeedType {
  STOP,
  NORMAL,
  FAST,
}

export enum JoystickType {
  FIXED,
  FOLLOW,
}

export interface JoystickDataType {
  speedType: SpeedType;
  moveVec: Vec3;
}

@ccclass("Joystick")
export class Joystick extends Component {

  @property({
    type: Node,
    displayName: "Dot",
  })
  dot: Node | null = null;

  @property({
    type: Node,
    displayName: "Ring",
  })
  ring: Node | null = null;

  @property({
    type: Enum(JoystickType),
    displayName: "Touch Type",
  })
  joystickType = JoystickType.FIXED;

  @property({
    type: Enum(DirectionType),
    displayName: "Direction Type",
  })
  directionType = DirectionType.ALL;

  @property({
    type: Vec3,
  })
  _stickPos = new Vec3();

  @property({
    type: Vec2,
  })
  _touchLocation = new Vec2();

  @property({
    type: CCInteger,
    displayName: "Ring Radius",
  })
  radius = 50;

  onLoad() {
    if (!this.dot) {
      console.warn("Joystick Dot is null!");
      return;
    }

    if (!this.ring) {
      console.warn("Joystick Ring is null!");
      return;
    }

    const uiTransform = this.ring.getComponent(UITransform);
    const size = this.radius * 2;
    const ringSize = new Size(size, size);
    uiTransform?.setContentSize(ringSize);
    this.ring
      .getChildByName("bg")!
      .getComponent(UITransform)
      ?.setContentSize(ringSize);

    this._initTouchEvent();
    // hide joystick when follow
    const uiOpacity = this.node.getComponent(UIOpacity);
    if (this.joystickType === JoystickType.FOLLOW && uiOpacity) {
      uiOpacity.opacity = 0;
    }
  }


  onEnable() {
    instance.on(SET_JOYSTICK_TYPE, this._onSetJoystickType, this);
  }

  onDisable() {
    instance.off(SET_JOYSTICK_TYPE, this._onSetJoystickType, this);
  }

  _onSetJoystickType(type: JoystickType) {
    this.joystickType = type;
    const uiOpacity = this.node.getComponent(UIOpacity);
    if (uiOpacity) {
      uiOpacity.opacity = type === JoystickType.FIXED ? 255 : 0;
    }
  }

  _initTouchEvent() {
    this.node.on(SystemEventType.TOUCH_START, this._touchStartEvent, this);
    this.node.on(SystemEventType.TOUCH_MOVE, this._touchMoveEvent, this);
    this.node.on(SystemEventType.TOUCH_END, this._touchEndEvent, this);
    this.node.on(SystemEventType.TOUCH_CANCEL, this._touchEndEvent, this);
  }

  _touchStartEvent(event: EventTouch) {
    if (!this.ring || !this.dot) return;

    instance.emit(SystemEventType.TOUCH_START, event);

    const location = event.getUILocation();
    const touchPos = new Vec3(location.x, location.y);

    if (this.joystickType === JoystickType.FIXED) {
      this._stickPos = this.ring.getPosition();

      const moveVec = touchPos.subtract(this.ring.getPosition());
      const distance = moveVec.length();

      if (this.radius > distance) {
        this.dot.setPosition(moveVec);
      }
    } else if (this.joystickType === JoystickType.FOLLOW) {
      this._stickPos = touchPos;
      this.node.getComponent(UIOpacity)!.opacity = 255;
      this._touchLocation = event.getUILocation();
      this.ring.setPosition(touchPos);
      this.dot.setPosition(new Vec3());
    }
  }

  _touchMoveEvent(event: EventTouch) {
    if (!this.dot || !this.ring) return;

    if (
      this.joystickType === JoystickType.FOLLOW &&
      this._touchLocation === event.getUILocation()
    ) {
      return false;
    }

    const location = event.getUILocation();
    const touchPos = new Vec3(location.x, location.y);
    const moveVec = touchPos.subtract(this.ring.getPosition());
    const distance = moveVec.length();

    let speedType = SpeedType.NORMAL;
    if (this.radius > distance) {
      this.dot.setPosition(moveVec);
      speedType = SpeedType.NORMAL;
    } else {
      this.dot.setPosition(moveVec.normalize().multiplyScalar(this.radius));
      speedType = SpeedType.FAST;
    }

    instance.emit(SystemEventType.TOUCH_MOVE, event, {
      speedType,
      moveVec: moveVec.normalize(),
    });
  }

  _touchEndEvent(event: EventTouch) {
    if (!this.dot || !this.ring) return;

    this.dot.setPosition(new Vec3());
    if (this.joystickType === JoystickType.FOLLOW) {
      this.node.getComponent(UIOpacity)!.opacity = 0;
    }

    instance.emit(SystemEventType.TOUCH_END, event, {
      speedType: SpeedType.STOP,
    });
  }
}
