import * as PIXI from "pixi.js"

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}


let chip11, chip12, check;


class chipPattern {
    constructor(sprite, value, positionx, positiony, id) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
        this.value = value;
        this.sprite.x = positionx;
        this.sprite.y = positiony;
        this.sprite.interactive = true;
        this.id = id;
    }

    changeSprite(newSprite) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[newSprite].texture);
    }

    vanish() {
        this.sprite.scale.x = 0;
        this.sprite.scale.y = 0;
    }

}


PIXI.loader.add("chip.png").add("glow.png").load(setup);

function setup() {
    let chips = [];

    let myApp = new PIXI.Application({
        width: 1000,
        height: 1000,
        antialias: true,
        transparet: false,
        resolution: 1
    });

    document.body.appendChild(myApp.view);


    for (let i = 1; i < 17; i++) {
        chips[i] = new chipPattern("chip.png", Math.floor(Math.random() * (10 - 1 + 1)) + 1,
            ((Math.floor((i - 1) / 4)) * 200) + 20, ((i % 4 ) * 200) + 20, i);

        console.log(chips[i].id, " ||||| ", chips[i].value);
        myApp.stage.addChild(chips[i].sprite);
        //console.log('done');
        chips[i].sprite.on('click', function () {
            clickOnChip(chips[i]);
        });

    }

}

function clickOnChip(chip) {
    console.log(chip.id);

}


console.log("7777777777777777777777777777777777777777777777777777777777");


