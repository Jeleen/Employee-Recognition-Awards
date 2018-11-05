
//return a nomalized path
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');

//necessary libary
const latex = require('../node_modules/node-latex/');

/*
* createPDF(id) takes award Id, to make a <award ID>.PDF
*/
function createPDF(id){
	//point to node-latex

	//require file stream
	const fs = require('fs');

	//node module with working with directors


	const input = fs.createReadStream(absolutePath+"award/award.tex");
	var AwardPath = "award/" +id+".pdf"
	console.log(AwardPath);
	const output = fs.createWriteStream(absolutePath+AwardPath)
	const options = {
		inputs: resolve(join(__dirname, 'data'))}
	latex(input, options).pipe(output);

	//const pdf = latex(input)
	console.log("PDF CREATED!!");
	//pdf.pipe(output)
	//pdf.on('error', err => console.error(err))
};

module.exports = createPDF;
