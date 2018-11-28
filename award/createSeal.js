//return a nomalized path
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');
//necessary libary
const latex = require('../node_modules/node-latex/');

/* CreateSeal generates the background seal used in the final pdf award
*  
*/
function createSealPDF(){
	const fs = require('fs');
	const input = fs.createReadStream(absolutePath+"award/data/seal/seal.tex");
	const output = fs.createWriteStream(absolutePath+"award/data/seal/seal.pdf")
	//source: node-latex samples
	const options = {
		inputs: resolve(join(__dirname, 'data'))}
	 	latex(input, options).pipe(output)

};


module.exports = createSealPDF;
