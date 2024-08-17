import { useCallback, useEffect, useState } from "react";
import Calls from "../utils/api";
import JournalItem from "../components/JournalItem";
import DataLoader from "./DataLoader";

// Komponenta JournalList je zodpovědná za zobrazení seznamu deníků
const JournalList = () => {
  // Stavy komponenty pro ukládání seznamu deníků, informace o načítání a chybových hlášeních
  const [journals, setJournals] = useState([]); // 🗂️ Ukládá seznam deníků
  const [loading, setLoading] = useState(true); // ⏳ Indikuje, zda se data načítají
  const [error, setError] = useState(null); // ⚠️ Ukládá chybová hlášení, pokud nastanou

  // Funkce pro načtení seznamu deníků z API
  const journalList = useCallback(async () => {
    try {
      setLoading(true); // Nastaví stav načítání na true
      const data = await Calls.journalList(); // Zavolá API a načte seznam deníků
      setJournals(data); // Uloží načtená data do stavu journals
    } catch (err) {
      setError(err.message); // Uloží chybovou zprávu, pokud dojde k chybě při načítání
    } finally {
      setLoading(false); // Nastaví stav načítání na false
    }
  }, []); // Závislosti prázdné, funkce se memorizuje a nebude se měnit při každém renderu

  // Funkce pro smazání deníku
  const handleDelete = (id, name) => async () => {
    // Zobrazí potvrzovací dialog pro smazání deníku
    if (window.confirm(`Opravdu chceš smazat tento deník? ${name}?`)) {
      try {
        await Calls.journalDelete(id); // Zavolá API pro smazání deníku
        journalList(); // Aktualizuje seznam deníků po úspěšném smazání
      } catch (error) {
        console.error("Error deleting journal:", error); // Logování chyby do konzole
        setError(error.message); // Uložení chybové zprávy do stavu
      }
    }
  };

  // Funkce pro přejmenování deníku
  const handleRename = (id) => async () => {
    // Zobrazí prompt pro zadání nového jména deníku
    const newName = window.prompt("Napiš nový jméno deníku: ");
    if (newName) {
      try {
        await Calls.journalUpdate({
          id: id, // ID deníku, který se má přejmenovat
          newName: newName, // Nové jméno deníku
        });
        journalList(); // Aktualizuje seznam deníků po úspěšném přejmenování
      } catch (error) {
        console.error("Error renaming journal:", error); // Logování chyby do konzole
        setError(error.message); // Uložení chybové zprávy do stavu
      }
    }
  };

  // Použití efektu pro načtení seznamu deníků při inicializaci komponenty
  useEffect(() => {
    journalList(); // Zavolá funkci pro načtení seznamu deníků
  }, [journalList]); // Efekt závisí na funkci journalList

  // Funkce pro vytvoření nového deníku
  const handleCreateNewJournal = async () => {
    // Zobrazí prompt pro zadání jména nového deníku
    const journalName = window.prompt("Enter the name for the new journal:");
    if (journalName) {
      try {
        await Calls.journalCreate({ name: journalName }); // Zavolá API pro vytvoření nového deníku
        journalList(); // Aktualizuje seznam deníků po úspěšném vytvoření
      } catch (error) {
        console.error("Error creating new journal:", error); // Logování chyby do konzole
        setError(error.message); // Uložení chybové zprávy do stavu
      }
    }
  };

  // Ověří, zda je seznam deníků platný a je ve formě pole
  if (!Array.isArray(journals)) return null;

  return (
    // Komponenta DataLoader zajišťuje načítání dat a zobrazení chybových hlášení
    <DataLoader
      url="http://localhost:8000/journals"
      loading={loading}
      error={error}
    >
      {/* Kontejner pro zobrazení seznamu deníků jako mřížky */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {/* Tlačítko pro vytvoření nového deníku */}
        <div
          onClick={handleCreateNewJournal} // Kliknutí vyvolá vytvoření nového deníku
          className="tile add-tile-base"
          >
            <div className="mb-3 flex items-center justify-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <span className="text-3xl">+</span>
              </div>
            </div>
          </div>
        {/* Mapování deníků na komponenty JournalItem */}
        {journals.map((journal) => (
          <JournalItem
            key={journal.id} // Unikátní klíč pro každý deník
            journal={journal} // Předání dat deníku do komponenty JournalItem
            onDelete={handleDelete(journal.id)} // Funkce pro smazání deníku
            onRename={handleRename(journal.id)} // Funkce pro přejmenování deníku
          />
        ))}
      </div>
    </DataLoader>
  );
};

export default JournalList;
