import Scroller from './lib/Scroller/Scroller.min.js'
import { WIDTH, HEIGHT, $wrapper } from './config.js';

let direction = {
        x: 0,
        y: 0,
        z: 0
    },
    lastPosition = {
        x: 0,
        y: 0,
        z: 0
    },
    scroller = new Scroller(render, {
        zooming: !1,
        animating: !0,
        bouncing: !1,
        animationDuration: 1e3
    });

scroller.setDimensions($wrapper.width(), $wrapper.height(), WIDTH, HEIGHT);

function render(left, top, zoom) {
    if (lastPosition.y !== top) direction.y = lastPosition.y < top;
    if (lastPosition.x !== left) direction.x = lastPosition.x < left;
    if (lastPosition.z !== left) direction.z = lastPosition.z < zoom;

    lastPosition.y = top;
    lastPosition.x = left;
    lastPosition.z = zoom;
    scroller.render && scroller.render.apply(scroller, [left, top, zoom, direction]);
}
export default scroller;