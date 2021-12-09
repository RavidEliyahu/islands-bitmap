const PORT = 5000;
    express = require('express');
    cors = require('cors');
    app = express();

require('dotenv').config();
require('./utils.js')();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/randomize', (req, res) => {
    try {
        const {n, m} = req.body;
        const mat = make2Darray(n, m);
        console.log({message: 'randomize done' });
        res.json({ mat, n, m });
    } catch (e) {
        console.log(e);
        res.status(403).send(e);
    }
})

app.post('/solve', (req, res) => {
    try {
        const { mat, n, m } = req.body;
        const { islands, numOfIslands } = countIslands(mat, n, m);
        console.log({ message: 'solve done' });
        res.json({ mat: islands , numOfIslands });
    } catch (e) {
        res.status(403).send(e);
    }
})

const server = app.listen(process.env.BASE_PORT || PORT, () => {
    console.log(`Server is listening on port ${ server.address().port }...`);
});