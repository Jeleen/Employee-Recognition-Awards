const createCsvWriter = require('../node_modules/csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './poop.csv',
    header: [
        {id: 'recipient_name', title: 'NAME'},
        {id: 'recipient_email', title: 'LANGUAGE'}
    ]
});
 
//const records = [
  //  {name: 'Bob',  lang: 'French, English'},
    //{name: 'Mary', lang: 'English'}
//];
 const records=[
{ recipient_name: 'MotherFucker',
  recipient_email: 'fuckyou@aol.com' }];


csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
 
