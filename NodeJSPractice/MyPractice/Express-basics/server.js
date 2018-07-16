var express = require('express');
var app =  express();
var hbs = require('hbs');
var fs = require('fs');


app.set('view engine', 'hbs')

hbs.registerPartials(__dirname+ '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('changeToUpperCase', (text) => {
   return text.toUpperCase();
 })

// logging in to console - creating express middle-ware

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        console.log('unable to print log');
    })
    next();
})

app.use((req, res, next) => {
    res.render('maintain.hbs');
})
 
//this shoudl come after basic middleware
app.use(express.static(__dirname+ '/public'))

app.get('/', (req, res)=> {
    // res.send({
    //     name: "Aatish sharma",
    //     company: {
    //       name:  "Mindtree",
    //       address: "Global village"
    //     }
    // })
    res.render('home.hbs', {
        name: 'Aatish Sharma',
        welcomeMsg: 'Welcome To home page'
    })
});

app.get('/about', (req, res) => {
 // res.send('<h1>About Page</h1>');
    res.render('about.hbs', {
        pageTilte: 'About HBS',
       
    })
})

app.get('/bad', (req, res) => {
    res.send({errorMessage: 'Error occured'})
})

app.listen(3000);
