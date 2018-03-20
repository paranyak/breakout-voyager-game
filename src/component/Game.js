import * as most from "most"

const height = 400;
const width = 600;
const animation = most.periodic(1000 / 30);

const removeBlock = (id) =>{
    let elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
};

const Ball = (ball, platform,block, x, y = 400) => {
    console.log(block);
    ball.setAttribute("cx", x);
    ball.setAttribute("cy", y);
    let vy = 3;
    let vx = 3;

    const Xcoordinate = animation
        .scan((nextX) => {
                vx = (nextX >= width-4 || nextX < 0) ? -vx : vx;
                block.map((coordinates, ind) => {
                    if((coordinates[0]-2 <nextX && nextX <coordinates[0]+2 )&& (coordinates[1] < ball.cy.animVal.value && ball.cy.animVal.value < coordinates[1] +10)){
                        console.log("left");
                        block[ind] = [-10, -10];
                        removeBlock(ind);
                        vx=-vx;
                    }
                    if((coordinates[0]+27 <nextX && nextX <coordinates[0]+33 )&& (coordinates[1] < ball.cy.animVal.value && ball.cy.animVal.value < coordinates[1] +10)){
                        console.log("right");
                        block[ind] = [-10, -10];
                        removeBlock(ind);
                        vx=-vx;
                    }
                })
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
                block.map((coordinates, ind) => {
                    if((coordinates[1]+7 <nextY && nextY <coordinates[1]+13 )&& (coordinates[0] < ball.cx.animVal.value && ball.cx.animVal.value < coordinates[0] +30)){
                        console.log("down");
                        block[ind] = [-10, -10];
                        removeBlock(ind);
                        vy=-vy;
                    }
                    if((coordinates[1]-3 <nextY && nextY <coordinates[1]+3 )&& (coordinates[0] < ball.cx.animVal.value && ball.cx.animVal.value < coordinates[0] +30)){
                        console.log("up");
                        block[ind] = [-10, -10];
                        removeBlock(ind);
                        vy=-vy;
                    }
                })
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
                x = x + 10 + platform.width.animVal.value >= width ? width - platform.width.animVal.value : x + 15;
            }
            if (k.key == "ArrowLeft") {
                x = x - 10 < 0 ? 0 : x - 15;
            }
            platform.setAttribute("x", x)
        })
    return platform;
}

const Block = (rows, columns) =>{

    console.log("creating svg");
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let svgNS = svg.namespaceURI;
    svg.setAttribute('class', 'Game__blocks');
    let colors = ["#fad390", "#f6b93b", "#fa983a", "#e55039","#e17055",  "#e66767", "#b71540", "#c44569"];
    let coordinates = [];

    for(let c =0; c < columns; c++) {
        for (let i = 0; i < rows; i++) {
            let rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', 5 + 40 * i);   //rows
            rect.setAttribute('y', 5 + 20*c);       //columns
            rect.setAttribute('width', 30);
            rect.setAttribute('height', 10);
            rect.setAttribute('fill', colors[c]);
            rect.setAttribute('id', c*rows+i);
            coordinates.push([5 + 40 * i,5 + 20*c]);    //IMPORTANT
            svg.appendChild(rect);
            document.querySelector(".Game").appendChild(svg);
        }
    }
    return coordinates;

}

class Game {
    constructor() {
        console.log("game!!");
        let platform = Platform(document.querySelector('.Game__platform'), 200);
        let block =Block(15, 8);
        Ball(document.querySelector('.Game__ball'), platform, block,  200, 400);
    }
}

export default Game;