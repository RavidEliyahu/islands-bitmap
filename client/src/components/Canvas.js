import React, { useEffect, useRef } from 'react'

export default function Map({ mat, size, state }) {
    const DRAW_SIZE = 10
    const { n, m } = size
    const canvasRef = useRef(null)

    let currX = 0,
        currY = 0

    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let colors = {}

        if (state === "draw")
            canvas.addEventListener('mousedown', (e) => paint('down', e, context, canvas))

        function paint(event, e, ctx, canvas) {
            if (event === "down") {
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                mat[Math.floor(currX/DRAW_SIZE)][Math.floor(currY/DRAW_SIZE)] = 0
                ctx.fillRect(Math.floor(currX/DRAW_SIZE) * DRAW_SIZE, Math.floor(currY/DRAW_SIZE) * DRAW_SIZE, DRAW_SIZE, DRAW_SIZE)
            }
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {

                // colorize
                if (mat[i][j] !== 255 && state === "solve") {
                    if (!(mat[i][j] in colors))
                        colors[mat[i][j]] = randomColor();
                }

                // draw
                if (mat[i][j] === 0) {
                    context.fillStyle = "black"
                    context.fillRect(i * DRAW_SIZE, j * DRAW_SIZE, DRAW_SIZE, DRAW_SIZE)
                } else if (mat[i][j] !== 255) {
                    context.fillStyle = colors[mat[i][j]]
                    context.fillRect(i * DRAW_SIZE, j * DRAW_SIZE, DRAW_SIZE, DRAW_SIZE)
                } else {
                    context.strokeRect(i * DRAW_SIZE, j * DRAW_SIZE, DRAW_SIZE, DRAW_SIZE)
                }
            }
        }
    }, [mat, n, m, state])

    return (
        <div>
            <canvas ref={canvasRef} width={n * DRAW_SIZE} height={m * DRAW_SIZE}/>
        </div>
    )
}