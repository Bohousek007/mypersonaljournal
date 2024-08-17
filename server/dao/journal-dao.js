const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

// Definice schématu pro deníky
const journalSchema = new Schema({
  id: { type: String, required: true }, // Přidání id deníku
  name: { type: String, required: true } // Přidání názvu deníku
});

// Model pro deníky
const Journal = mongoose.model('Journal', journalSchema);

// Method to create journal
function create(event) {
  event.id = uuidv4()
  return Journal.create(event);
}

// Method to list all journals
function list() {
  return Journal.find();
}

// Method to get a diary by its ID
function getDiary(diaryId) {
  return Journal.findOne({ id: diaryId });
}

// Method to delete a diary by its ID
function deleteDiary(diaryId) {
  return Journal.deleteOne({ id: diaryId });
}

// Method to update diary Entry (change name for diary entry)
function updateDiary(diary) {
  const { id, newName } = diary;
  return Journal.findOneAndUpdate(
    { id: id },
    { name: newName },
    { new: true }
  );
}

module.exports = {
  create,
  list,
  getDiary,
  deleteDiary,
  updateDiary
};
