import Scroller from './lib/Scroller/Scroller.min.js'
import * as config from './config.js';


let $wrapper = $('#wrapper');
var scroller = new Scroller(render, {
    zooming: !1,
    animating: !0,
    bouncing: !1,
    animationDuration: 1e3
});
scroller.setDimensions($wrapper.width(), $wrapper.height(), config.WIDTH, config.HEIGHT);

function render() {

}

export {
    scroller
};
export {
    render
};