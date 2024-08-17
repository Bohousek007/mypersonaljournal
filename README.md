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

![screencapture-uuapp-plus4u-net-uu-dockit-maing02-4e68298f1658473e9bf5692272883290-document-sheet-2024-08-17-13_17_25](https://github.com/user-attachments/assets/c8c7debc-0452-472b-9d16-0374b91bfb88)


Popisy jednotlivých kódu, co dělá co?

DataLoader.jsx
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
