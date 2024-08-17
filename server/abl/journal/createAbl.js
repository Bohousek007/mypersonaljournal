const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const journalDao = require("../../dao/journal-dao.js");
const { validateJournal } = require("../../validators/journal-validator.js");

async function CreateAbl(req, res) {
  try {
    const eventData = req.body;

    // Validace vstupních dat
    const isValid = validateJournal(eventData);
    if (!isValid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: validateJournal.errors,
      });
    }

    // Vytvoření deníku pomocí DAO
    const createdJournal = await journalDao.create(eventData);

    res.json(createdJournal);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
