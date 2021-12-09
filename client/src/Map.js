import React from 'react'
import Sketch from 'react-p5'

export default function Map({ mat, size, state }) {
    const LEN = 3
    const {n, m} = size;
    let setup = (p5, canvasParentRef) => {
        p5.createCanvas(n * LEN, m * LEN).parent(canvasParentRef)
    }

    let draw = (p5) => {
        p5.clear()
        p5.background(51);
        let colors = {}
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                for (let j = 0; j < m; j++) {
                    var x =  i * LEN;
                    var y =  j * LEN;
                    if (mat[i][j] !== 255 && state === "solve") {
                        if (!(mat[i][j] in colors))
                            colors[mat[i][j]] = p5.color(p5.random(255), p5.random(255), p5.random(255));
                        p5.fill(colors[mat[i][j]]);
                    } else
                        p5.fill(mat[i][j]);
                    p5.stroke(0);
                    p5.rect(x, y, LEN, LEN);
                }
            })
        }
        p5.noLoop()
    }
    return (
        <div>
            <Sketch setup={setup} draw={draw}></Sketch>
        </div>
    )
}
