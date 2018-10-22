var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('create_award');


//testing
//const input = fs.createReadStream('input.tex')
//const output = fs.createWriteStream('output.pdf')
//const options = {
//	inputs: resolve(join(__dirname, './award'))}
//latex(input, options).pipe(output);

//const pdf = latex(input)
//console.log("PDF CREATED!!");
//pdf.pipe(output)
//pdf.on('error', err => console.error(err))



});

module.exports = router;
