import Scroller from './lib/Scroller/Scroller.min.js'
import * as config from './config.js';

let $wrapper = $('#wrapper');
let WIDTH = 750;
let HEIGHT = 29360;
let scroller = new Scroller(render, {
    zooming: !1,
    animating: !0,
    bouncing: !1,
    animationDuration: 1e3
});

scroller.setDimensions($wrapper.width(), $wrapper.height(), config.WIDTH, config.HEIGHT);

function render() {
    scroller.render && scroller.render.apply(scroller, arguments);
}

export default scroller;