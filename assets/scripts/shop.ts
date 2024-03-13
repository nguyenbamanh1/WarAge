import { _decorator, Component, Game, Node, resources, Sprite, SpriteFrame } from 'cc';
import { Team } from './Team';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('shop')
export class shop extends Component {

    public static spriteShopGun: SpriteFrame[][] = [];
    public static spriteShopArmy: SpriteFrame[][] = [];


    @property(Node)
    main: Node;

    @property(Node)
    army: Node;

    @property(Node)
    private guns: Node;


    protected onLoad(): void {

    }

    start() {
        for (let i = 0; i < GameManager.Instance.levelMax; i++) {
            var nameGr = `age${i + 1}`;
            if (!shop.spriteShopGun[i + 1]) {
                shop.spriteShopGun[i + 1] = [];
                for (let j = 0; j < 4; j++) {
                    resources.load(`play/shop/` + nameGr + `/gun${j + 1}/spriteFrame`, SpriteFrame, (e, data) => {
                        if (!e)
                            shop.spriteShopGun[i + 1][j + 1] = data;
                    })
                }
            }
            if (!shop.spriteShopArmy[i + 1]) {
                shop.spriteShopArmy[i + 1] = [];
                for (let j = 0; j < 4; j++) {
                    resources.load(`play/shop/` + nameGr + `/${j + 1}/spriteFrame`, SpriteFrame, (e, data) => {
                        if (!e)
                            shop.spriteShopArmy[i + 1][j + 1] = data;
                    })
                }
            }
        }
        setTimeout(this.initShop.bind(this), 2000);
    }

    update(deltaTime: number) {

    }

    openArmy() {
        this.main.active = false;
        this.army.active = true;
    }

    openGun() {
        this.main.active = false;
        this.guns.active = true;
    }

    initShop() {
        this.guns.children.forEach(e => {
            if (e == this.guns.children[this.guns.children.length - 1])
                return;

            let id = e.name;
            if (shop.spriteShopGun[Team.PlayerTeam.level][id]) {
                e.getComponent(Sprite).spriteFrame = shop.spriteShopGun[Team.PlayerTeam.level][id];
            } else {
                e.active = false;
            }
        });
        this.army.children.forEach(e => {
            if (e === this.army.children[this.army.children.length - 1])
                return;
            let id = e.name;
            if (shop.spriteShopArmy[Team.PlayerTeam.level][id]) {
                e.getComponent(Sprite).spriteFrame = shop.spriteShopArmy[Team.PlayerTeam.level][id];
            } else {
                e.active = false;
            }
        });
        
    }

    sellGun() {
        if (Team.PlayerTeam.gun) {

        }
    }

    towerUp() {
        Team.PlayerTeam.levelUp();
        this.initShop();
    }


    back() {
        this.main.active = true;
        this.army.active = false;
        this.guns.active = false;
    }
}


