const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const corsSetup = require('./cors');
const config = require('./config');
// const corsSetup = express();
// app.use(express.json());
// require("./cors")(app);
// app.use(expressSession({
//     secret: "a/#$sd#0$",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: process.env.NODE_ENV === "production",
//         httpOnly: true
//     }
// }));


// Připojení k MongoDB
mongoose.connect(config.mongoUri, {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Connection error', err);
});
  

// Vytvoření Express aplikace
const app = express();
app.use(bodyParser.json());
corsSetup(app);

// Import routerů
const journalRouter = require('./controller/journalController');
const journalEntryRouter = require('./controller/journalEntryController');

// Použití routerů
app.use('/journals', journalRouter);
app.use('/journalEntry', journalEntryRouter);

// Handler pro kořenovou cestu
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Přidání middleware pro GET požadavky na /favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});  



// Spuštění serveru
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
