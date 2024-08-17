const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const journalEntryDao = require("../../dao/journalEntry-dao.js");

const schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },
    diaryId: { type: "string", minLength: 5 }, // Přizpůsobeno délce ID pro MongoDB ObjectId
  },
  required: ["title", "diaryId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let entry = req.body;

    // validate input
    const valid = ajv.validate(schema, entry);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Call create asynchronously
    entry = await journalEntryDao.create(entry);
    res.json(entry);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
