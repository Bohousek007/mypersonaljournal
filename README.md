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

<h1>Client</h1>
<h3>Component - DataLoader.jsx</h3>
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

<h3>Component - FlashMessage.jsx</h3>
Komponenta `FlashMessage` v Reactu slouží k zobrazení krátkých zpráv nebo upozornění uživatelům. Může být použita například pro zobrazení chybových hlášení, úspěšných akcí nebo jiných důležitých informací.

Kód definuje komponentu, která přijímá dva parametry: `theme` a `text`. Parametr `theme` určuje styl zprávy (např. “success”, “error”, “warning”), zatímco `text` obsahuje samotný text zprávy. Komponenta pak vrací `div` element s třídou založenou na hodnotě `theme` a zobrazuje text zprávy uvnitř tohoto `div` elementu.)

<h3>Component - JournalEntryItem.jsx</h3>
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

<h3>Component - JournalEntryList.jsx</h3>
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

<h3>Component - JournalItem.jsx</h3>
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

<h3>Component - JournaList.jsx</h3>
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

<h3>Component - Tile.jsx</h3>
Tile je komponenta, která upravuje styl dlaždic u jednotlivých deníků a záznamů.

<h3>Component - RenameButton.jsx</h3>
Tlačítko na přejmenování jednotlivých záznamů a deníků..
<h2>DeleteButton.jsx</h2>
Tlačítko na mazání záznamů a deníků...

<h1>Contexts</h1>
<h2>session.jsx</h2>
Tento kód v React aplikaci implementuje kontextovou logiku pro správu a sdílení stavu relace (session) v celé aplikaci.

<h1>Routes</h1>
<h3>Route - HomePage.jsx</h3>
Tento kód zobrazuje hlavní stránku, tedy homepage, kde je uživatel CTA, uživatel je vyzýván k tomu podívat se na své vytvořené deníky.
<h2>JournalDetail.jsx</h2>
Uživatel klikne na deník a zobrazí se mu JournalDetail, tedy záznamy v deníku.
<h2>JournalsPage.jsx</h2>
Stránka na které se zobrazí všechny vytvořené deníky uživatelem.
<h2>LoginPage.jsx</h2>
Stránka, kde se uživatel přihlásí ke svému účtu
<h2>RegistrationPage.jsx</h2>
Stránka, kde se uživatel zaregistruje a vytvoří si svůj vlastní účet

<h3>Stylizace</h3>
App.css
index.css

<h3>App.jsx</h3>
Soubor `App.jsx` slouží jako hlavní součást vaší webové aplikace, kde definujete strukturu rozložení, navigaci, směrování a podmíněné vykreslování na základě uživatelských sezení. Zde je podrobný rozbor jednotlivých částí souboru `App.jsx`

<h3>main.jsx</h3>
Soubor `main.jsx` je vstupní bod pro aplikaci React, který zodpovídá za spuštění aplikace a její renderování na stránce. Zajišťuje, že aplikace je připojena k DOM (Document Object Model) a že se správně zobrazí v prohlížeči.

