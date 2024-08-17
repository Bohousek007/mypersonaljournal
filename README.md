My fullstack project, using MERN techstack. My Personal Journal is about keeping and creating new journals and entries.

npm install
npm start - client and server starts concurrently..


<h2>mongodb database</h2>

![image](https://github.com/user-attachments/assets/2c3f8b99-1f7c-47af-8f30-dc50ad015ccf)


<h2>Frontend</h2>

![screencapture-uuapp-plus4u-net-uu-dockit-maing02-4e68298f1658473e9bf5692272883290-document-sheet-2024-08-17-13_11_47](https://github.com/user-attachments/assets/f2e31a28-059c-4f31-9a20-7abca6d6ab9e)


<h2>Business Requests</h2>

![screencapture-uuapp-plus4u-net-uu-dockit-maing02-4e68298f1658473e9bf5692272883290-document-sheet-2024-08-17-13_13_53](https://github.com/user-attachments/assets/793bb69b-4c8c-4c1f-9748-347e92dd939d)

<h2>Business Model</h2>

![screencapture-uuapp-plus4u-net-uu-dockit-maing02-4e68298f1658473e9bf5692272883290-document-sheet-2024-08-17-13_15_05](https://github.com/user-attachments/assets/c4a155a2-6a48-401c-af33-7a74cdd377f1)


<h2>Backend</h2>

ještě přiložím.....

Popisy jednotlivých kódu, co dělá co?

<h2>DataLoader.jsx</h2>
**K čemu slouží DataLoader?**
Komponenta `DataLoader` je komponenta vyššího řádu (HOC), která pomáhá načítat data z adresy URL a spravovat stav načítání a ošetřování chyb.

Zde je rozpis toho, co dělá:
1. **Správa stavu načítání**: Používá Hook `useState` ke správě tří stavů:
    - `Načítání`: logická hodnota udávající, zda jsou data načítána (zpočátku nastavena na `true`).
    - `error`: chybové hlášení (zpočátku nastaveno na `null`).
    - `data`: načtená data (zpočátku nastaveno na `null`).
2. **Načítání dat**: Používá Hook `useEffect` k načtení dat ze zadané `url` pomocí `axios.get`. Po načtení dat nastaví `loading` na `false` a `data` na načtená data. Pokud dojde k chybě, nastaví `error` na chybové hlášení a `loading` na `false`.
3. **Podmíněné vykreslování**: Na základě stavu načítání a chyby podmíněně vykreslí jednu ze tří možných komponent:
    - Pokud je `loading` `true`, vykreslí zprávu "Loading...".
    - Pokud `error` není `null`, vykreslí chybovou zprávu s podrobnostmi o chybě.
    - Pokud `data` není `null`, vykreslí komponentu `children` a předá načtená `data` jako rekvizitu.

Komponenta `DataLoader` je určena k použití jako obal kolem jiných komponent, které potřebují načíst data z adresy URL. Pomocí této komponenty můžete snadno spravovat stav načítání a zpracování chyb pro potřeby načítání dat.

<h2>FlashMessage.jsx</h2>
Komponenta `FlashMessage` v Reactu slouží k zobrazení krátkých zpráv nebo upozornění uživatelům. Může být použita například pro zobrazení chybových hlášení, úspěšných akcí nebo jiných důležitých informací.

Kód definuje komponentu, která přijímá dva parametry: `theme` a `text`. Parametr `theme` určuje styl zprávy (např. “success”, “error”, “warning”), zatímco `text` obsahuje samotný text zprávy. Komponenta pak vrací `div` element s třídou založenou na hodnotě `theme` a zobrazuje text zprávy uvnitř tohoto `div` elementu.)

<h2>JournalEntryItem.jsx</h2>
Komponenta `JournalEntryItem` slouží k zobrazení jednotlivého záznamu v deníku. Je navržena tak, aby poskytovala uživatelské rozhraní pro zobrazení názvu záznamu a umožnila uživatelům jeho úpravy, včetně přejmenování a mazání.

### Hlavní funkce komponenty

1. **Zobrazení názvu záznamu:**
    
    - Komponenta zobrazuje název záznamu ve výrazném nadpisu. Tato část je vizuálně zvýrazněna, aby byla snadno čitelná.
2. **Funkce přejmenování a mazání:**
    
    - Komponenta obsahuje dva tlačítka pro provedení akcí na záznamu:
        - **`RenameButton`**: Umožňuje uživatelům přejmenovat záznam. Po kliknutí se volá funkce `onRename`, která byla předána jako prop.
        - **`DeleteButton`**: Umožňuje uživatelům smazat záznam. Po kliknutí se volá funkce `onDelete`, která byla předána jako prop.

### Shrnutí

Komponenta `JournalEntryItem` je základní stavební kámen pro zobrazení a správu jednotlivých záznamů deníku. Poskytuje čisté a funkční uživatelské rozhraní, které zahrnuje zobrazení názvu záznamu a ovládací prvky pro jeho úpravy. Je navržena tak, aby byla snadno použitelná a vizuálně přitažlivá, s důrazem na uživatelskou interakci.

<h2>JournalEntryList.jsx</h2>
Komponenta `JournalEntryList` slouží k zobrazení a správě jednotlivých záznamů v deníku. Poskytuje uživatelské rozhraní pro přidávání, mazání a přejmenování záznamů v rámci vybraného deníku.

### Hlavní funkce komponenty

1. **Zobrazení seznamu záznamů:**
    
    - Komponenta zobrazuje seznam záznamů ve formě mřížky, což umožňuje snadnou orientaci a přístupnost.
    - Pro každý záznam je vytvořena komponenta `JournalEntryItem`, která se stará o zobrazení jednotlivých detailů záznamu.
2. **Přidání nového záznamu:**
    
    - Uživatelé mohou kliknout na tlačítko "+" pro přidání nového záznamu do deníku.
    - Zobrazí se dialogové okno, ve kterém uživatel zadá text nového záznamu.
    - Po potvrzení se nový záznam uloží na server a seznam záznamů se aktualizuje.
3. **Mazání existujícího záznamu:**
    
    - Každý záznam lze smazat pomocí odpovídajícího tlačítka.
    - Před smazáním se zobrazí potvrzovací dialog, který chrání před neúmyslným smazáním.
4. **Přejmenování záznamu:**
    
    - Uživatelé mohou přejmenovat záznamy kliknutím na odpovídající možnost.
    - Po zadání nového názvu se seznam záznamů aktualizuje, aby zobrazoval provedené změny.
5. **Chybové hlášení a stav načítání:**
    
    - Komponenta zpracovává chybové stavy a zobrazuje odpovídající hlášení, pokud dojde k chybě při komunikaci se serverem.
    - Indikátor načítání ukazuje, že se data načítají, čímž zlepšuje uživatelskou zkušenost.

### Shrnutí

Komponenta `JournalEntryList` poskytuje uživatelsky přívětivé rozhraní pro správu záznamů v deníku, zahrnující funkce pro přidávání, mazání a přejmenování záznamů. Komponenta je navržena tak, aby byla interaktivní a snadno použitelná, s důrazem na správu stavu a zpracování chyb, což jsou klíčové aspekty pro robustní a spolehlivé aplikace.

<h2>JournalItem.jsx</h2>
Komponenta `JournalItem` je odpovědná za reprezentaci jednotlivého deníku v uživatelském rozhraní. Používá komponentu `Tile`, aby zobrazila informace o deníku a poskytla uživatelské akce pro jeho přejmenování a smazání.

### Hlavní funkce komponenty

1. **Zobrazení deníku:**
    
    - Komponenta přijímá data o deníku jako `props` a zobrazuje je pomocí komponenty `Tile`.
    - Každý deník obsahuje informace jako `id` a `name`, které jsou zobrazovány v uživatelském rozhraní.
2. **Interakce uživatele:**
    
    - Komponenta umožňuje uživatelům přejmenovat nebo smazat deník pomocí funkcí `onRename` a `onDelete`, které jsou také předávány jako `props`.
    - Tyto funkce jsou vyvolány uživatelskými akcemi, jako je kliknutí na příslušná tlačítka v komponentě `Tile`.
3. **Typová kontrola `props`:**
    
    - Komponenta využívá knihovnu `prop-types` k definování typů `props`, které přijímá, což pomáhá zajistit, že komponenta dostává správná data a funkce.

### Shrnutí

Komponenta `JournalItem` je malou, ale důležitou částí aplikace, která zajišťuje zobrazení jednotlivých deníků a poskytuje uživatelům prostředky pro jejich správu. Díky použití `prop-types` zajišťuje, že všechny předávané údaje jsou ve správném formátu, což pomáhá předcházet chybám během vývoje i v běžném provozu.

<h2>JournaList.jsx</h2>
Komponenta `JournalList` slouží jako uživatelské rozhraní pro správu seznamu deníků v aplikaci. Jejím cílem je umožnit uživatelům efektivně manipulovat s jejich deníky, tedy vytvářet nové deníky, prohlížet existující, přejmenovávat je a případně je mazat.

### Hlavní funkce komponenty

1. **Načítání a zobrazení seznamu deníků:**
    
    - Komponenta používá API k načtení aktuálního seznamu deníků ze serveru při prvním načtení komponenty a kdykoli se seznam deníků změní.
    - Zobrazuje deníky ve formě mřížky, což umožňuje snadný přístup a přehlednost.
2. **Přidání nového deníku:**
    
    - Uživatelé mohou kliknout na tlačítko "+" pro přidání nového deníku. Zobrazí se dialogové okno pro zadání názvu nového deníku.
    - Po potvrzení se nový deník uloží na server a seznam deníků se aktualizuje.
3. **Mazání existujícího deníku:**
    
    - Uživatelé mohou smazat deník pomocí kliknutí na odpovídající tlačítko v každé položce deníku.
    - Před smazáním se zobrazí potvrzovací dialog, aby se zabránilo neúmyslnému smazání.
4. **Přejmenování deníku:**
    
    - Každý deník lze přejmenovat. Při kliknutí na odpovídající možnost se zobrazí dialog pro zadání nového názvu.
    - Po úspěšném přejmenování se seznam deníků aktualizuje, aby odrážel změny.
5. **Chybové hlášení a stav načítání:**
    
    - Komponenta zobrazuje chybová hlášení v případě, že dojde k chybě při komunikaci se serverem.
    - Indikátor načítání ukazuje, že se data načítají, což zlepšuje uživatelskou zkušenost tím, že uživatelé vědí, že se něco děje na pozadí.

### Shrnutí

Komponenta `JournalList` poskytuje základní funkce pro správu deníků, jako je zobrazení, vytváření, mazání a přejmenování. Používá interaktivní uživatelské rozhraní s dialogovými okny pro uživatelské vstupy, čímž zajišťuje intuitivní a efektivní používání. Kromě toho obsahuje i mechanismy pro zpracování chyb a zobrazování stavu načítání, což jsou klíčové aspekty pro robustní uživatelské rozhraní.

Kód:
```js
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

    <DataLoader url="http://localhost:8000/journals" loading={loading} error={error}>

      {/* Kontejner pro zobrazení seznamu deníků jako mřížky */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">

        {/* Tlačítko pro vytvoření nového deníku */}

        <div

          onClick={handleCreateNewJournal} // Kliknutí vyvolá vytvoření nového deníku

          className="flex items-center justify-center h-48 w-full bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"

        >

          <span className="text-4xl text-gray-500">+</span> {/* Ikona plus */}

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
```
