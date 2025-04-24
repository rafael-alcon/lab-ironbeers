const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('images', express.static(path.join(__dirname, '/public/images')))

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req,res)=>{
 
  fetch("https://ih-beers-api2.herokuapp.com/beers")
  .then(response => response.json())
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error));
  
})

app.get('/random-beer', (req,res)=>{
  fetch("https://ih-beers-api2.herokuapp.com/beers")
  .then(response1 => response1.json())
  .then(response =(response1) =>{
    const claves = Object.keys(response1);
    const claveAleatoria = claves[Math.floor(Math.random() * claves.length)];
    return response1[claveAleatoria];
  })
  .then(response => res.render('random-beer',{response}))
 // .then(response => res.send({response}))
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
