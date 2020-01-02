/* 
This is how to import libraries using nodejs. This module format or 
approach comes from commonjs and is SIMILAR in concept to React but
as you note the syntax is a bit different. At the end of the day, it
attaches the libraries to the desired scope so that they can be used.
Both libraries in this example are actually built into Node but they 
have to be exposed to be usable. This means is that you don't 
have to run `npm install <library>` to install them.
*/
const https = require('https');
const fs = require('fs');

/*
In order to persist the data in some meaningful way, I had to wrap the 
async functionality in a function that accepts a callback. This 
pattern is common in nodejs (and asynchronous programming in general).
This function contains a series of callbacks, and this library doesn't 
make things easier to parse but I at least got it doing what I wanted. 
I'm going to write this another way using a little bit more modern library.
*/
function hitTheApi(callback) {
  https.get('https://swapi.co/api/people/1/', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      /* This callback function is what ensures that execution halts 
      until the async functionality actually finishes running. */
      callback(data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

/*
This function gets passed to the `hitTheApi` function as the callback,
so the additional functionality is written here. I tried to keep the 
function above limited in what it does - just hit the API, and then pass 
the data to a function that can process it.
*/
function logTheData(someData) {
  console.log('SOME DATA: ', someData)
  fs.writeFile('SWAPI_DATA.txt', someData, (err) => {
    if (err) throw err;
    console.log('The file has been saved!')
  })
}

// Invoking the function
hitTheApi(logTheData);