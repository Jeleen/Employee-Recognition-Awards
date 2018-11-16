

//return a nomalized path
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');

//necessary libary
const latex = require('../node_modules/node-latex/');


function createSealPDF(){
const fs = require('fs');
	console.log("INSIDE SEAL")
	//create readstream
	const input = fs.createReadStream(absolutePath+"award/data/seal/seal.tex");
	//label for pdf
	//create writestream
	const output = fs.createWriteStream(absolutePath+"award/data/seal/seal.pdf")
	//source: node-latex samples
	const options = {
		inputs: resolve(join(__dirname, 'data'))}
	 latex(input, options).pipe(output)

//		input.destroy();
////pipe.close();
};


module.exports = createSealPDF;
