'use strict'
const express = require('express');
const path = require(`path`);
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname, '/views/main.html'));
});


const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});
