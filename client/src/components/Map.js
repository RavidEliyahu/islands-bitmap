import React from 'react'
import Sketch from 'react-p5'

export default function Map({ mat, size, state }) {
    const DRAW_SIZE = 8
    const { n, m } = size;
    let setup = (p5, canvasParentRef) => {
        p5.createCanvas(n * DRAW_SIZE, m * DRAW_SIZE).parent(canvasParentRef)
    }

    let randomColor = (p5) => {
        return p5.color(p5.random(255), p5.random(255), p5.random(255));
    }

    let draw = (p5) => {
        p5.clear()
        p5.background(51);
        let colors = {}
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                var x =  i * DRAW_SIZE;
                var y =  j * DRAW_SIZE;
                if (mat[i][j] !== 255 && state === "solve") {
                    if (!(mat[i][j] in colors))
                        colors[mat[i][j]] = randomColor(p5);
                    p5.fill(colors[mat[i][j]]);
                } else
                    p5.fill(mat[i][j]);
                p5.stroke(0);
                p5.rect(x, y, DRAW_SIZE, DRAW_SIZE);
            }
        }
        p5.noLoop()
    }

    let mouseReleased = (p5) => {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < m; j++) {
                    let x1 =  i * DRAW_SIZE, x2 = x1 + DRAW_SIZE;
                    var y1 =  j * DRAW_SIZE, y2 = y1 + DRAW_SIZE;
                    if (p5.mouseX > x1 && p5.mouseX < x2 && p5.mouseY > y1 && p5.mouseY < y2) {
                        mat[i][j] = 0;
                        p5.draw();
                        p5.noLoop();
                    }
                }
            }
        }
    return (
        <div>
            <Sketch setup={setup} draw={draw} mouseReleased={state === "draw" ? mouseReleased : null}></Sketch>
        </div>
    )
}
