const Ajv = require("ajv");
const ajv = new Ajv();

const journalDao = require("../../dao/journal-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 5 }, // Přizpůsobeno délce ID pro MongoDB ObjectId
        newName: { type: "string", minLength: 3 },
    },
    required: ["id", "newName"],
    additionalProperties: false,
};

async function UpdateAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.body;

        // validate input
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // Call updateDiary asynchronously
        const result = await journalDao.updateDiary(reqParams);

        // Handle the case where updateDiary returns null or undefined
        if (!result || result.msg) {
            res.status(404).json({ message: "Diary not found or not updated" });
            return;
        }

        res.json({ "msg": "Diary updated successfully" });

    } catch (e) {
        // Log the error for debugging purposes
        console.error("Error in UpdateAbl:", e);
        res.status(500).json({ message: e.message });
    }
}

module.exports = UpdateAbl;
