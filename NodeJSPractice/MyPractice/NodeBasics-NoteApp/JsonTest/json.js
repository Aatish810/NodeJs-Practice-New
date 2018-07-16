const fs = require('fs');

var person = {
    title: "Aatish Sharma",
    designation: "Senior Engineer"
}

person = JSON.stringify(person);

fs.writeFileSync('notes.json', person);


const personDataString = fs.readFileSync('notes.json');

const personData = JSON.parse(personDataString);

console.log(typeof personData);
console.log(personData.title);
