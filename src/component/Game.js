import * as most from "most"

const height = 600;
const width = 800;
const animation = most.periodic(1000 / 60);


const Ball = (ball, x, y = 5) => {
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    let vy = 3;
    let vx = 3;
    const Xcoordinate = animation
        .scan((nextX) => {
                if (nextX >= width || nextX < 0) {
                    vx = -vx;
                }
                return nextX + vx;
            },
            0)
        .observe((a) => {
            x = a;
            ball.setAttribute("cx", a);

        })
    const Ycoordinate = animation
        .scan((nextY) => {
                if (nextY >= height|| nextY < 0) {
                        vy = -vy;

                }
                return nextY + vy;
            },
            0).observe((a) => {
            ball.setAttribute("cy", a);

        });
};


class Game {
    constructor() {
        Ball(document.querySelector('.Game__ball'), 2 * width / 3 - 100);
    }
}

export default Game;