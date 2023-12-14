const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


const db = new sqlite3.Database('mydatabase.db');
db.run('CREATE TABLE IF NOT EXISTS submissions (name TEXT, email TEXT)');


app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    
    db.run('INSERT INTO submissions (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('Form submitted successfully!');
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
