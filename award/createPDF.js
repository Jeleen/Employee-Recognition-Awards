//return a nomalized path
const path = require('path');
const { join, resolve } =path
const absolutePath = path.join(__dirname,'../');
//necessary libary
const latex = require('../node_modules/node-latex/');
const createMail = require('../award/createMail.js');

/*
* createPDF(id) takes award Id, to make a <award ID>.PDF
*/
function createPDF(id){
	const fs = require('fs');
	const input = fs.createReadStream(absolutePath+"award/award.tex");
	var AwardPath = "award/" +id+".pdf"
	console.log(AwardPath);
	const output = fs.createWriteStream(absolutePath+AwardPath)
	const options = {
		inputs: resolve(join(__dirname, 'data'))}
	latex(input, options).pipe(output);
	createMail(id);
};


module.exports = createPDF;
