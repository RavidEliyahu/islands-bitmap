Joi = require('joi');

module.exports = function() {

    /**
     * This function validate /randomize request body.
     * @param {Object} body - request body to validate
     * @returns {Object} - Joi object with details of the validation.
     */
    this.validateRandomize = (body) => {
        const randomizeSchema = Joi.object({
            n: Joi.number().min(1).max(1500).integer().required(),
            m: Joi.number().min(1).max(1500).integer().required()
        });
        return Joi.validate(body, randomizeSchema);
    }

    /** This function validate /solve request body.
     * @param {Object} body - request body to validate
     * @returns {Object} - Joi object with details of the validation.
     */
    this.validateSolve = (body) => {
        const solveSchema = Joi.object({
            n: Joi.number().min(1).max(1500).integer().required(),
            m: Joi.number().min(1).max(1500).integer().required(),
            mat: Joi
            .array()
            .items(
                Joi.array().items(Joi.number())
            ).required()
        });
        return Joi.validate(body, solveSchema);
    }
}