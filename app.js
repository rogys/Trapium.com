const express = require('express');
const app = express();
const data = require('./user_modules/mysql.js');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public' + '/index.html');
});
app.listen(3000, (error) => {
    if (error) {
        console.log('Error running the server');
    };
    console.log('Server is running on port 3000');
});
app.get('/api/index', (req, res) => {
    data.online.query('SELECT * FROM news', (error, results) => {
        if (error) {
            console.log('Error fetching the data');
        };
        res.json(results);
    });
});
data.online.connect((error) => {
    if (error) {
        console.log('Error connecting to the database');
    };
    console.log('Connected to the database');
});