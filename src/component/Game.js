import * as most from "most"

const height = 400;
const width = 600;
const animation = most.periodic(1000 / 60);

const Ball = (ball, platform, x, y = 5) => {
    console.log(platform, ball);
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    let vy = 3;
    let vx = 3;

    const Xcoordinate = animation
        .scan((nextX) => {
                vx = (nextX >= width || nextX < 0) ? -vx : vx;
                return nextX + vx;
            },
            0)
        .observe((a) => {
            x = a;
            ball.setAttribute("cx", a);

        });
    const Ycoordinate = animation
        .scan((nextY) => {
                if(nextY >= height && (platform.x.animVal.value > ball.cx.animVal.value || ball.cx.animVal.value > platform.x.animVal.value + platform.width.animVal.value)){
                    vx=0; vy =0;
                    return nextY +vy;
                }
                vy = (nextY >= height || nextY < 0) ? -vy : vy;
                return nextY + vy;
            },
            0).observe((a) => {
            ball.setAttribute("cy", a);
        });
};

const Platform = (platform, x = 0) => {
    platform.setAttribute("x", x);
    most.fromEvent('keydown', document)
        .observe(k => {
            if (k.key == "ArrowRight") {
                x = x + 10 + platform.width.animVal.value >= width ? width - platform.width.animVal.value : x + 10;
            }
            if (k.key == "ArrowLeft") {
                x = x - 10 < 0 ? 0 : x - 10;
            }
            platform.setAttribute("x", x)
        })
    return platform;
}

class Game {
    constructor() {
        console.log("here");
        let platform = Platform(document.querySelector('.Game__platform'), 5);
        Ball(document.querySelector('.Game__ball'), platform, 0);

    }
}

export default Game;