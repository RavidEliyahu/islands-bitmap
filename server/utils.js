function makeVisited(cols, rows) {
    let visited = new Array(cols);
    for (let i = 0; i < cols; i++) {
        visited[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            visited[i][j] = false;
        }
    }
    return visited;
}

function copyMat(M, cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            arr[i][j] = M[i][j];
        }
    }
    return arr;
}

function isSafe(M, col, boundCol, row, boundRow, visited) {
    return (row >= 0) && (row < boundRow) && (col >= 0) && (col < boundCol) && (M[col][row] == 0 && !visited[col][row]);
}

function BFS(M, copy, col, boundCol, row, boundRow, visited, color) {
    // neighboars possibilities
    let colN = [-1, -1, -1, 0, 0, 1, 1, 1];
    let rowN = [-1, 0, 1, -1, 1, -1, 0, 1];
    let q = [];
    q.push([col, row]);
    copy[col][row] = color;
    visited[col][row] = true;

    while(q.length != 0) {
        let i = q[0][0];
        let j = q[0][1];
        q.shift();

        for (let k = 0; k < 8; k++) {
            if (isSafe(M, i + colN[k], boundCol, j + rowN[k], boundRow, visited)) {
                copy[i + colN[k]][j + rowN[k]] = color;
                visited[i + colN[k]][j + rowN[k]] = true;
                q.push([i + colN[k], j + rowN[k]]);
            }
        }
    }
}

module.exports = function() {
    this.countIslands = function(M, cols, rows) {
        let visited = makeVisited(cols, rows);
        let copyM = copyMat(M, cols, rows);

        let count = 0;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (M[i][j] == 0 && !visited[i][j]) {
                    let color = Math.floor(Math.random() * 5000);
                    copyM[i][j] = color;
                    BFS(M, copyM, i, cols, j, rows, visited, color);
                    count++;
                }
            }
        }
        console.log(`there are ${ count } islands`);
        return { islands: copyM, numOfIslands: count };
    };
    this.make2Darray = function(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < cols; i++) {
            arr[i] = new Array(rows);
            for (let j = 0; j < rows; j++) {
                arr[i][j] = Math.random() < 0.5 ? 0 : 255;
            }
        }
        return arr;
    };
}