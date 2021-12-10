
/**
 * This function creates a boolean 2d array of false values.
 * @param {Number} cols
 * @param {Number} rows
 * @returns {Array} - init array of booleans for BFS visited functionality.
 */
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

/**
 * This function makes a copy of a 2d array.
 * @param {Array} M
 * @param {Number} cols
 * @param {Number} rows
 * @returns {Array} - copied 2d array.
 */
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
/**
 * Safety check for BFS run.
 * @param {Array} M - 2d array of points
 * @param {Number} col - the current col
 * @param {Number} boundCol - the overall col size
 * @param {Number} row - the current row
 * @param {Number} boundRow - the overall row size
 * @param {Array} visited - 2d array of visited points
 * @returns {Boolean} - True or false if the point is in a safe zone
 */
function isSafe(M, col, boundCol, row, boundRow, visited) {
    return (row >= 0) && (row < boundRow) &&
            (col >= 0) && (col < boundCol) &&
            (M[col][row] == 0 && !visited[col][row]);
}

/**
 * This function maps the 2d array with a BFS algorithm
 * and colors the islands as it runs.
 * @param {Array} M - 2d array of points
 * @param {Array} copy - a copy 2d array that contain all the colored islands
 * @param {Number} col - the current col
 * @param {Number} boundCol - the overall col size
 * @param {Number} row - the current row
 * @param {Number} boundRow - the overall row size
 * @param {Array} visited - 2d array of visited points
 * @param {Number} color - symbolize a color key
 */
function BFS(M, copy, col, boundCol, row, boundRow, visited, color) {
    // neighboars possibilities
    let colN = [-1, -1, -1, 0, 0, 1, 1, 1];
    let rowN = [-1, 0, 1, -1, 1, -1, 0, 1];

    // BFS Queue
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
    /**
     * This function counts the number of islands
     * and return a colored 2d array.
     * @param {Array} M
     * @param {Number} cols
     * @param {Number} rows
     * @returns {Object} - The colored array and the number of islands.
     */
    this.countIslands = (M, cols, rows) => {
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
        console.log({ message: `there are ${ count } islands` });
        return { islands: copyM, numOfIslands: count };
    };

    /**
     * This function build 2d array with cols and rows.
     * @param {Number} cols
     * @param {Number} rows
     * @returns {Array} - The built 2d array.
     */
    this.make2Darray = (cols, rows) => {
        let arr = new Array(cols);
        for (let i = 0; i < cols; i++) {
            arr[i] = new Array(rows);
            for (let j = 0; j < rows; j++) {
                arr[i][j] = Math.random() < 0.3 ? 0 : 255;
            }
        }
        return arr;
    };
}