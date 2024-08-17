import { useState } from "react"; // Odstraněny nepoužité importy
import PropTypes from "prop-types"; // Import pro kontrolu typů
import Calls from "../utils/api"; // Utilita pro API volání
import JournalEntryItem from "./JournalEntryItem"; // Komponenta pro jednotlivé záznamy

// Komponenta JournalEntryList zobrazuje seznam záznamů v deníku
const JournalEntryList = ({ journal, journalDetail, journalId }) => {
  // Stav pro chybová hlášení
  const [error, setError] = useState(null); // ⚠️ Ukládá chybová hlášení

  // Funkce pro přidání nového záznamu
  const handleCreateNewEntry = async () => {
    const newEntryContent = prompt("Enter the text for the new diary entry:");
    if (!newEntryContent) return;

    try {
      await Calls.journalEntryCreate({
        diaryId: journalId, // ID deníku, do kterého se přidá nový záznam
        title: newEntryContent, // Obsah nového záznamu
      });
      journalDetail(); // Aktualizuje seznam záznamů po vytvoření
    } catch (error) {
      console.error("Error creating new journal entry:", error);
      setError(error.message); // Uložení chybové zprávy
    }
  };

  // Funkce pro smazání záznamu
  const handleEntryDelete = (id) => async () => {
    if (!window.confirm("Seš si jistý, že chceš tento záznam smazat?")) return;

    try {
      await Calls.journalEntryDelete(id); // API volání pro smazání záznamu
      journalDetail(); // Aktualizuje seznam záznamů po smazání
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      setError(error.message); // Uložení chybové zprávy
    }
  };

  // Funkce pro přejmenování záznamu
  const handleEntryRename = (journalEntry) => async () => {
    const newName = prompt("Napiš nové jméno pro tvou poznámku:");
    if (!newName) return;

    try {
      await Calls.journalEntryUpdate({
        ...journalEntry, // Aktuální data záznamu
        newName, // Nové jméno záznamu
      });
      journalDetail(); // Aktualizuje seznam záznamů po přejmenování
    } catch (error) {
      console.error("Error renaming journal entry:", error);
      setError(error.message); // Uložení chybové zprávy
    }
  };

  return (
    // Kontejner pro zobrazení seznamu záznamů jako mřížky
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {/* Tlačítko pro vytvoření nového záznamu */}
      <div
        onClick={handleCreateNewEntry} // Kliknutí vyvolá vytvoření nového záznamu
        className="tile add-tile-base"
        >
          <div className="mb-3 flex items-center justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <span className="text-3xl">+</span>
            </div>
          </div>
        </div>
      {/* Mapování záznamů na komponenty JournalEntryItem */}
      {Array.isArray(journal?.children) && journal.children.map((journalEntry) => (
        <JournalEntryItem
          key={journalEntry.id} // Unikátní klíč pro každý záznam
          journalEntry={journalEntry} // Předání dat záznamu do komponenty JournalEntryItem
          onDelete={handleEntryDelete(journalEntry.id)} // Funkce pro smazání záznamu
          onRename={handleEntryRename(journalEntry)} // Funkce pro přejmenování záznamu
        />
      ))}
    </div>
  );
};

// Definice typů props pro JournalEntryList pomocí prop-types
JournalEntryList.propTypes = {
  journal: PropTypes.object, // Objekt deníku (lze vylepšit, pokud je známá struktura)
  journalDetail: PropTypes.func.isRequired, // Funkce pro aktualizaci detailů deníku
  journalId: PropTypes.string.isRequired, // Očekává se, že journalId bude string a je povinný
};

export default JournalEntryList; // Export komponenty pro použití v dalších částech aplikace
