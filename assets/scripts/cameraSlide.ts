import { _decorator, BoxCollider2D, Camera, CCFloat, Component, math, native, Node, sys, SystemEvent, systemEvent, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cameraSlide')
export class cameraSlide extends Component {

    @property(CCFloat)
    private smoothTime: number = .1;

    @property(BoxCollider2D)
    public bound: BoxCollider2D;


    private isPointerDown: boolean = false;
    private isPointerDrag: boolean = false;

    private vecTarget: Vec3 = Vec3.ZERO;
    private startDrag: Vec3 = Vec3.ZERO;
    private cam: Camera;
    private child: Node;

    protected onLoad(): void {
        this.child = this.node.children[0];
        if (sys.os == sys.OS.WINDOWS) {
            this.child.on(Node.EventType.MOUSE_DOWN, (e) => { this.onTouchDown(e.getUILocation()) }, this);
            this.child.on(Node.EventType.MOUSE_MOVE, (e) => {
                this.onTouchMove(e.getUILocation())
            }, this);
            this.child.on(Node.EventType.MOUSE_UP, (e) => { this.onTouchUp(e.getUILocation()) }, this);
        } else {
            this.child.on(Node.EventType.TOUCH_START, (e) => { this.onTouchDown(e.getUILocation()) }, this);
            this.child.on(Node.EventType.TOUCH_MOVE, (e) => {
                this.onTouchMove(e.getUILocation())
            }, this);
            this.child.on(Node.EventType.TOUCH_END, (e) => { this.onTouchUp(e.getUILocation()) }, this);
        }

    }
    start() {
        this.cam = this.getComponent(Camera);
    }

    update(deltaTime: number) {
        if (this.isPointerDown && this.isPointerDrag) {
            let distance = new Vec2(this.vecTarget.x - this.startDrag.x, this.vecTarget.y - this.startDrag.y);

            let current = this.node.position;
            current = current.lerp(new Vec3(current.x - distance.x, current.y), this.smoothTime);

            let boundMin = this.bound.offset.x - this.bound.size.x / 2;
            let boundMax = this.bound.offset.x + this.bound.size.x / 2;

            let minX = boundMin + this.cam.camera.orthoHeight * this.cam.camera.aspect;
            let maxX = boundMax - this.cam.camera.orthoHeight * this.cam.camera.aspect;

            current = new Vec3(math.clamp(current.x, minX, maxX), current.y);

            this.node.setPosition(current);
        }
    }

    onTouchDown(pos: Vec2) {
        this.isPointerDown = true;
        this.startDrag = new Vec3(pos.x, 0);

    }

    onTouchMove(pos: Vec2) {
        this.isPointerDrag = true;
        this.vecTarget = new Vec3(pos.x, 0);
    }

    onTouchUp(pos: Vec2) {
        this.isPointerDrag = false;
        this.isPointerDown = false;
    }
}


