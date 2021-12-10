const PORT = 5000;
    cors = require('cors');
    express = require('express');
    app = express();
    morgan = require('morgan');
    logger = require('./logger');

require('dotenv').config();
require('./utils.js')();
require('./validators.js')();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.status(200).send('<div>Islands Bitmap API</div> \
        <div>POST: /randomize - returns a randomize 2d array</div> \
        <div>POST: /solve - returns a colored by islands 2d array</div>');
})

app.post('/randomize', (req, res) => {
    try {
        const { error } = validateRandomize(req.body);
        if (error) {
            logger.error(error);
            res.status(400).send({ status: 400, error });
            return;
        }
        const {n, m} = req.body;
        const mat = make2Darray(n, m);
        logger.info(`Randomized a ${ n }x${ m } matrix!`)
        res.status(200).json({ mat, n, m });
    } catch (e) {
        logger.error(error);
        res.status(400).send(e);
    }
})

app.post('/solve', (req, res) => {
    try {
        const { error } = validateSolve(req.body);
        if (error) {
            logger.error(error);
            res.status(400).send({ status: 400, error });
            return;
        }

        const { mat, n, m } = req.body;

        if (mat.length !== n || mat[0].length !== m) {
            logger.error(`Matrix does not match ${ n } x ${ m } values!`);
            res.status(400).send({ status: 400, error: `Matrix does not match ${ n } x ${ m } values!`});
            return;
        }

        const { islands, numOfIslands } = countIslands(mat, n, m);
        logger.info(`Solved a ${ n }x${ m } matrix with ${ numOfIslands } islands`)
        res.status(200).json({ mat: islands , numOfIslands });
    } catch (e) {
        logger.error(error);
        res.status(400).send(e);
    }
})

const server = app.listen(process.env.BASE_PORT || PORT, () => {
    console.log(`Server is listening on port ${ server.address().port }...`);
});