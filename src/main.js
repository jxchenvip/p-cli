import loader from './loader.js';
import scroller from './scroll.js';
import TWEEN from './lib/Tween/Tween.min.js'
import { WIDTH, HEIGHT, $wrapper } from './config.js';
import { sprites, cats } from './sprites.config.js';

let {
    Texture,
    autoDetectRenderer,
    CanvasRenderer,
    Container,
    Graphics,
    Sprite,
    ticker,
    extras: {
        AnimatedSprite
    },
    utils: {
        TextureCache
    },
    ticker: {
        Ticker
    }
} = PIXI,

tick = new Ticker(),
    //Create a container object called the `stage`;
    stage = new Container(),
    catStage = new Container(),
    // Create the renderer
    renderer = new CanvasRenderer(WIDTH, $wrapper.height());

loader.load((loader, resource) => {
    $wrapper.get(0).appendChild(renderer.view);
    /*=================ticker========================*/
    tick.stop();
    tick.add(() => {
        renderer.render(stage);
        TWEEN.update();
    })
    tick.start();

    /*=================scroller========================*/
    var isDown = true,
        touchstart = function(e) {
            var a = e.data.originalEvent;
            isDown = true;
            if (!!a.touches) {
                scroller.doTouchStart(a.touches, a.timeStamp);
                return false;
            }
            scroller.doTouchStart([{
                pageX: a.pageX,
                pageY: a.pageY
            }], a.timeStamp);
        },
        touchmove = function(e) {
            if (isDown) {
                var a = e.data.originalEvent;
                if (!!a.touches) {
                    scroller.doTouchMove(a.touches, a.timeStamp, a.scale)
                    return false;
                }
                scroller.doTouchMove([{
                    pageX: a.pageX,
                    pageY: a.pageY
                }], a.timeStamp, a.scale);
            }
        },
        touchend = function(e) {
            var a = e.data.originalEvent;
            scroller.doTouchEnd(a.timeStamp);
            isDown = false;
        };
    stage.interactive = true;
    stage.on("pointerdown", touchstart);
    stage.on("pointermove", touchmove);
    stage.on("pointerup", touchend);

    /*=================background========================*/
    var sprite = new Sprite(TextureCache["img/bg.png"]);
    stage.addChild(sprite);

    /*=================方块========================*/
    var rectangle = new Graphics();
    rectangle.beginFill();
    rectangle.animate = true;
    rectangle.lineStyle(4, 0xff0000, 1);
    rectangle.drawRect(0, 100, 100, 100);
    rectangle.position.set(650, 0);
    rectangle.endFill();
    stage.addChild(rectangle);

    var rect = new Graphics();
    rect.beginFill();
    rect.lineStyle(4, 16724736, 1);
    rect.data = {
        speed: {
            x: -.133,
            y: .1
        },
        position: {
            x: 490,
            y: -100
        }
    };
    rect.drawRect(0, 0, 500, 500);
    rect.position.set(0, 0);
    rect.endFill();

    var rect1 = new Graphics();
    rect1.beginFill();
    rect1.data = {
        speed: {
            x: -.133,
            y: .1
        },
        position: {
            x: 490,
            y: -100
        }
    };
    rect1.lineStyle(4, 16724736, 1);
    rect1.alpha = 0.1;
    rect1.drawRect(0, 0, 500, 500);
    rect1.position.set(0, 0);
    rect1.endFill();

    sprites.forEach((item) => {
        if (item.animate) {
            var textures = item.animateData.map((item) => {
                return new Texture.fromImage(item);
            });
            var a = new AnimatedSprite(textures);
            a.data = item;
            a.animationSpeed = item.animationSpeed || 0.05;
            stage.addChild(a);
        }
    });
    // catStage.addChild(rect1);
    catStage.addChild(rect);
    catStage.position.set(0, 1300);
    cats.forEach((item, index) => {
        var sprite = new Sprite(TextureCache[item.url]);
        if (index == 1) {
            sprite.mask = rect;
        }
        sprite.position.set(item.position.x, item.position.y);
        sprite.data = item;
        catStage.addChild(sprite);
    })
    stage.addChild(catStage);
});

scroller.render = function(left, top, zoom, direction) {
    renderer.view.setAttribute('y', top);
    stage.x = -left;
    stage.y = -top;
    stage.children.forEach(function(item) {
        if (item.animate) {
            var o = Math.sqrt(256e4 - top * top) / 2,
                l = Math.asin(top / 1600);
            item.position.set(WIDTH / 2 + 200 * Math.cos(top * Math.PI / 180 / 10), top * 1.2);
        }
    })

    catStage.children.forEach((item) => {
        var p = top - catStage.position.y - item.data.position.y;
        if (item.data && item.data.speed.y) {
            item.position.y = item.data.position.y + item.data.speed.y * p;
        }

        if (item.data && item.data.speed.x) {
            item.position.x = item.data.position.x + item.data.speed.x * p;
        }
    })

    if (top >= 3900 && top < 9e3)
        stage.children.forEach(function(item) {
            if (item.data && item.data.speed) {
                var p = top - item.data.position.y;
                if (item.data.speed.x) {
                    var y = 0;
                    if (item.data.translate) {
                        y = item.data.translate.x;
                    }
                    item.position.x = item.data.position.x + item.data.speed.x * p + y
                }

                if (item.data.speed.y) {
                    var u = 0;
                    if (item.data.translate) {
                        u = item.data.translate.y;
                    }
                    item.position.y = item.data.position.y + item.data.speed.y * p + u;
                }
            }

            if (item.data && item.data.animate) {
                if (top > 6650 && top <= 6750) {
                    item.gotoAndStop(1);
                } else if (top > 6750 && top < 7200) {
                    item.gotoAndStop(0);
                } else if (top <= 6650) {
                    item.gotoAndStop(0);
                } else {
                    var p = top - item.data.position.y;
                    item.gotoAndStop(parseInt(p / 15))
                }
            }
        })
}