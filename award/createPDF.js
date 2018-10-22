


//require node-latex
//const latex = require('../Employee-Recognition-Awards/node_modules/node-latex/');
const latex = require('../node_modules/node-latex/');
const fs = require('fs');

//node module with working with directors
 const { join, resolve } = require('path')

const input = fs.createReadStream("award.tex");
const output = fs.createWriteStream('output.pdf')
const options = {
	inputs: resolve(join(__dirname, 'data'))}
latex(input, options).pipe(output);

//const pdf = latex(input)
//console.log("PDF CREATED!!");
//pdf.pipe(output)
//pdf.on('error', err => console.error(err))
