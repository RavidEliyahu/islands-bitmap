import React from 'react'
import Sketch from 'react-p5'

export default function Map({ mat, size }) {
    const LEN = 10
    const {n, m} = size;
    let setup = (p5, canvasParentRef) => {
        p5.createCanvas(n * LEN, m * LEN).parent(canvasParentRef)
    }

    let draw = (p5) => {
        p5.background(51);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                var x =  i * LEN;
                var y =  j * LEN;
                p5.fill(mat[i][j]);
                p5.stroke(0);
                p5.rect(x, y, LEN, LEN);
            }
        }
        p5.noLoop()
    }
    return (
        <div>
            <Sketch setup={setup} draw={draw}></Sketch>
        </div>
    )
}
