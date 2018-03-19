import * as most from "most"

const height = 400;
const width = 600;
const animation = most.periodic(1000 / 60);

const Ball = (ball, platform, x, y = 400) => {
    console.log(x, y);
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    let vy = 3;
    let vx = 3;

    const Xcoordinate = animation
        .scan((nextX) => {
                vx = (nextX >= width || nextX < 0) ? -vx : vx;
                return nextX + vx;
            },
            x)
        .observe((a) => {
            x = a;
            ball.setAttribute("cx", a);

        });
    const Ycoordinate = animation
        .scan((nextY) => {
                if(nextY >= height && (platform.x.animVal.value > ball.cx.animVal.value + 16 || ball.cx.animVal.value -16 > platform.x.animVal.value + platform.width.animVal.value)){
                    vx=0; vy =0;
                    return nextY +vy;
                }
                vy = (nextY >= height || nextY < 0) ? -vy : vy;
                return nextY + vy;
            },
            y).observe((a) => {
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

const creatingBlocks = (rows, columns)=>{
    console.log("creating svg");
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let svgNS = svg.namespaceURI;
    svg.setAttribute('class', 'Game__blocks');
    let colors = ["#fad390", "#f6b93b", "#fa983a", "#e55039","#e17055",  "#e66767", "#b71540", "#c44569"];
    for(let c =0; c < columns; c++) {
        for (let i = 0; i < rows; i++) {
            console.log("here");
            let rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', (5 + 40 * i));   //rows
            rect.setAttribute('y', 5 + 20*c);       //columns
            rect.setAttribute('width', 30);
            rect.setAttribute('height', 10);
            rect.setAttribute('fill', colors[c]);
            svg.appendChild(rect);
            document.querySelector(".Game").appendChild(svg);
        }
    }
}

class Game {
    constructor() {
        console.log("game constructor");
        let platform = Platform(document.querySelector('.Game__platform'), 200);
        //Ball(document.querySelector('.Game__ball'), platform, 200, 400);
        creatingBlocks(15, 8);
    }
}

export default Game;