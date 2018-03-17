import * as PIXI from "pixi.js"
import * as PIXIsound from "pixi-sound"

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}


class chipPattern {
    constructor(commonSprite, glowSprite, value, positionx, positiony, id) {
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[commonSprite].texture);
        this.value = value;
        this.sprite.x = positionx;
        this.sprite.y = positiony;
        this.id = id;
        this.glowImg = glowSprite;
        this.unGlowImg = commonSprite;

        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.glow = false;
    }

    forceGlow() {
        this.sprite.texture = PIXI.loader.resources[this.glowImg].texture;
        console.log(this.glowTexure);
    }

    unGlow() {
        this.sprite.texture = PIXI.loader.resources[this.unGlowImg].texture;
    }

    vanish() {
        this.sprite.scale.x = 0;
        this.sprite.scale.y = 0;
    }

    show() {
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;
    }

}

class numbersPattern {
    constructor(value, id, x, y) {
        this.textSprite = new PIXI.Text(value, {
            fontWeight: 'bold',
            fontSize: 60,
            fontFamily: 'Arial',
            fill: '#cc00ff',
            align: 'center',
            stroke: '#FFFFFF',
            strokeThickness: 6
        });

        this.textSprite.value = value;
        this.textSprite.id = id;
        this.textSprite.x = x;
        this.textSprite.y = y;
        this.textSprite.rotation = 0;

        this.textSprite.anchor.set(0.5);


    }

    reDrowSprite(value) {
        this.textSprite.value = value;
        this.textSprite = new PIXI.Text(value, {
            fontWeight: 'bold',
            fontSize: 60,
            fontFamily: 'Arial',
            fill: '#cc00ff',
            align: 'center',
            stroke: '#FFFFFF',
            strokeThickness: 6
        });

    }

    vanish() {
        this.textSprite.scale.x = 0;
        this.textSprite.scale.y = 0;
    }

    show() {
        this.textSprite.scale.x = 1;
        this.textSprite.scale.y = 1;
    }
}

PIXI.loader.add("chip.png").add("glow.png").add("down.mp3").load(setup);

function setup() {
    let chips = [];
    let numbers = [];
    let check, firstChipId, secondChipId;
    check = 0;

    const soundDown = PIXIsound.Sound.from("down.mp3");

    let myApp = new PIXI.Application({
        width: 1000,
        height: 1000,
        antialias: true,
        transparet: false,
        resolution: 1
    });

    document.body.appendChild(myApp.view);


    for (let i = 1; i < 17; i++) {
        chips[i] = new chipPattern("chip.png", "glow.png", Math.floor(Math.random() * (10 - 1 + 1)) + 1,
            ((Math.floor((i - 1) / 4)) * 200) + 20, ((i % 4 ) * 200) + 20, i);

        numbers[i] = new numbersPattern(chips[i].value, chips[i].id, chips[i].sprite.x + chips[i].sprite.width / 2,
            chips[i].sprite.y + chips[i].sprite.height / 2);

        myApp.stage.addChild(chips[i].sprite, numbers[i].textSprite);


        chips[i].sprite.on('click', function () {
            if (check == 0) {
                clickOnChip(chips[i]);
                check = 1;
                firstChipId = i;
            } else if (check == 1) {
                clickOnChip(chips[i]);
                check = 0;
                secondChipId = i;
                checkChip(chips[firstChipId], chips[secondChipId], numbers[firstChipId], numbers[secondChipId], soundDown);
            }

        });

    }

    myApp.ticker.add(function () {

            let a = Math.floor(Math.random() * (16 - 1 + 1)) + 1;
            let b = Math.floor(Math.random() * (16 - 1 + 1)) + 1;

            if (numbers[a].textSprite.value == numbers[b].textSprite.value &&
                numbers[a].textSprite.id != numbers[b].textSprite.id) {

                //let actionRotate =     new PIXI.action.RotateTo(1,500);
                //let actionRotateBack = new PIXI.action.RotateTo(0,500);

                //PIXI.actionManager.runAction(numbers[a].textSprite,actionRotate);

                numbers[a].textSprite.rotation += 0.05;
                numbers[b].textSprite.rotation += 0.05;
                //console.log( "numbers[b].textSprite.rotate = ",  numbers[b].textSprite.rotate)


                /*if (numbers[a].textSprite.rotate<=6 &&  numbers[a].textSprite.rotate<=6) {
                    while (numbers[a].textSprite.rotate < 6 || numbers[b].textSprite.rotate < 6) {
                        if (numbers[a].textSprite.rotate < 6){ numbers[a].textSprite.rotate += 0.03; }
                        if (numbers[b].textSprite.rotate < 6){ numbers[b].textSprite.rotate += 0.03; }
                        console.log("numbers[a].textSprite.rotation = " , numbers[a].textSprite.rotate)
                }}


                if (numbers[a].textSprite.rotate >= 0 &&  numbers[a].textSprite.rotate >= 0) {
                    while (numbers[a].textSprite.rotate >= 0 || numbers[b].textSprite.rotate >= 0) {
                        if (numbers[a].textSprite.rotate >= 0){ numbers[a].textSprite.rotate -= 0.03; }
                        if (numbers[b].textSprite.rotate >= 0){ numbers[b].textSprite.rotate -= 0.03; }
                        console.log("numbers[a].textSprite.rotation = " , numbers[a].textSprite.rotate)
                    }}*/


            }

        }
    )


}

function clickOnChip(chip) {
    //console.log(chip.id);
    chip.forceGlow();
}

function checkChip(firstChip, secondChip, firstNumber, secondNumber, soundDown, numbers) {
    if (firstChip.value == secondChip.value && firstChip.id != secondChip.id) {
        let chipPromise = new Promise((resolve, reject) => {
            firstChip.vanish();
            secondChip.vanish();

            firstNumber.vanish();
            secondNumber.vanish();
            soundDown.play();
            resolve();
        });
        chipPromise.then( (resolve, reject) => {
                console.log("888888888888888888|", getNewValue());
                firstChip.value = getNewValue();
                firstNumber.reDrowSprite(firstChip.value);

                secondChip.value = getNewValue();
                secondNumber.reDrowSprite(secondChip.value);
                console.log("|||||||",firstNumber.textSprite.value);

                firstChip.unGlow();
                secondChip.unGlow();

                firstChip.show();
                firstNumber.show();
                secondChip.show();
                secondNumber.show();
                resolve();
            });
    } else {
        firstChip.unGlow();
        secondChip.unGlow();
    }
}

function rotateNumber() {

}

function getNewValue() {
    return (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
}


console.log("7777777777777777777777777777777777777777777777777777777777");


