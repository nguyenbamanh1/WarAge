import { _decorator, BoxCollider2D, CCBoolean, CCInteger, Component, instantiate, math, Node, PhysicsGroup, Prefab, RigidBody2D, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property, type } = _decorator;

@ccclass('Team')
export class Team extends Component {
    public static PlayerTeam: Team;

    @property(CCBoolean)
    private isPlayerTeam: boolean = false;

    @property(CCInteger)
    public level: number = 1;

    @type(PhysicsGroup)
    private teamGroup: PhysicsGroup = PhysicsGroup.DEFAULT;

    @type(PhysicsGroup)
    private enemyGroup: PhysicsGroup = PhysicsGroup.DEFAULT;

    @property(Node)
    private nodeSpawn: Node;

    public gun : Node;


    private armies: Prefab[] = [];

    protected onLoad(): void {
        if (this.isPlayerTeam)
            Team.PlayerTeam = this;
    }


    start() {
        this.armies = GameManager.getArmy(this.level);
    }

    update(deltaTime: number) {

    }

    private spawn(p: Prefab): void {
        var g = instantiate(p);
        g.setWorldPosition(this.nodeSpawn.getWorldPosition());
        g.getComponent(RigidBody2D).group = this.teamGroup;
        g.getComponent(BoxCollider2D).group = this.teamGroup;
        if (!this.isPlayerTeam) {
            var scale = g.getScale().multiply3f(-1, 1, 1);
            g.setScale(scale);
        }
    }

    public levelUp(): void {
        let lastLevel = this.level;

        this.level++;

        this.level = math.clamp(this.level, 1, GameManager.Instance.levelMax);

        if (this.level != lastLevel) {
            this.armies = GameManager.getArmy(this.level);
        }

    }

}


