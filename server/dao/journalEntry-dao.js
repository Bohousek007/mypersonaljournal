const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

// Schéma pro vstupy deníku
const journalEntrySchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  diaryId: { type: String, required: true }
});

// Model pro vstupy deníku
const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// Method to create journal entry
function create(entry) {
  entry.id = uuidv4()
  return JournalEntry.create(entry);
}

// Method to list all journal entries
function list() {
  return JournalEntry.find();
}

// Method to delete a journal entry by its ID
function deleteEntry(entryId) {
  return JournalEntry.deleteOne({ id: entryId });
}

// Method to delete all journal entries that belong to a diary
function deleteAllEntries(diaryId) {
  return JournalEntry.deleteMany({ diaryId: diaryId });
}

// Method to get all journal entries that belong to a diary
async function getAllEntries(diaryId) {
  const ppp = JournalEntry.find({ diaryId: diaryId });
  
  const entries = await JournalEntry.find({ diaryId: diaryId }).exec();
  return entries
}

// Method to update journal entry (change title)
function updateEntry(entry) {
  const { id, newName, diaryId } = entry;
  return JournalEntry.findOneAndUpdate(
    { id: id,
     title: newName,
     diaryId: diaryId }
  );
}

module.exports = {
  create,
  list,
  deleteEntry,
  updateEntry,
  deleteAllEntries,
  getAllEntries
};
