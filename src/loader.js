let {
    loaders: {
        Loader
    }
} = PIXI;
let loader = new Loader();

loader.add([
    'img/bg.png',
    'img/2/9.png',
    'img/2/9-1.png',
    'img/2/9-2.png',
    'img/2/9-3.png',
    'img/2/9-4.png',
    'img/2/9-5.png',
    'img/2/9-6.png',
    'img/2/9-7.png',
    'img/2/9-8.png',
    'img/2/9-9.png',
    // 'img/5/0.png',
    'img/5/1.png',
    'img/5/2.png',
    'img/5/3.png',
]);
loader.on('progress', (e) => {
    console.log(e.progress)
})

export default loader;