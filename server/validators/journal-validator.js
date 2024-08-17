const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const journalSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    // Další validace podle potřeby
  },
  required: ["name"],
  additionalProperties: true
};

function validateJournal(data) {
  const valid = ajv.validate(journalSchema, data);
  if (!valid) {
    validateJournal.errors = ajv.errors;
    return false;
  }
  return true;
}

module.exports = {
  validateJournal,
};
