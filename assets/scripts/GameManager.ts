import { _decorator, CCInteger, Component, Game, Node, Prefab, resources, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static Instance : GameManager;
    private static armies: Prefab[] = [];
    public static spriteShopGun : SpriteFrame[] = [];

    @property(CCInteger)
    public levelMax : number = 5;

    protected onLoad(): void {
        GameManager.Instance = this;
        resources.loadDir<Prefab>("prefabs/army", (e, data) => {
            data.forEach(e => {
                if (!GameManager.armies[e.name]) {
                    GameManager.armies[e.name] = e;
                }
            });
        });
    }

    start() {

    }

    update(deltaTime: number) {

    }


    public static getArmy(level: number): Prefab[] {
        var armies: Prefab[] = [];
        var name = `char${level}`;
        GameManager.armies.forEach(e => {
            if (e.name.startsWith(name)) {
                let index = e.name.replace(name + "-", "");
                armies[index] = e;
            }
        });
        return armies;

    }

}


