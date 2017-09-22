import Scroller from './lib/Scroller/Scroller.min.js'
import Tween from './lib/Tween/Tween.min.js'


const WIDTH = 750;
const HEIGHT = 29360;
const { autoDetectRenderer, CanvasRenderer, Container, Sprite, loaders, ticker } = PIXI;
var isDown = true;

let $wrapper = $('#wrapper');
var scroller = new Scroller(render, {
    zooming: !1,
    animating: !0,
    bouncing: !1,
    animationDuration: 1e3
});
scroller.setDimensions($wrapper.width(), $wrapper.height(), WIDTH, HEIGHT);


var renderer = new CanvasRenderer(WIDTH, $wrapper.height());
$wrapper.get(0).appendChild(renderer.view);

var stage = new Container();
stage.width = WIDTH;
stage.height = $wrapper.height();
stage.interactive = true;
stage.on("touchstart", touchstart).on("touchmove", touchmove).on("touchend", touchend);

function touchstart(e) {
    var a = e.data.originalEvent;
    isDown = true;
    scroller.doTouchStart(a.touches, a.timeStamp);
}

function touchmove(e) {
    if (isDown) {
        var a = e.data.originalEvent;
        scroller.doTouchMove(a.touches, a.timeStamp, a.scale)
    }
}

function touchend(e) {
    var a = e.data.originalEvent;
    scroller.doTouchEnd(a.timeStamp);
    isDown = false;
}

function render(left, top, zoom) {
    stage && stage.position.set(-left, -top);
}

const loader = new loaders.Loader();
loader.add(['bg.png']);
loader.load((loader, resource) => {
    var sprite = new Sprite(resource['bg.png'].texture);
    stage.addChild(sprite);
});

var tick = new ticker.Ticker();
tick.stop();
tick.add(() => {
    renderer.render(stage);
})
tick.start();

renderer.render(stage);