/*
In this example I had to install a non-native library for making http 
requests. This requires the additional step of instatlling the library 
using `npm install <library>`. There are also flags that can be used 
to modify the installation, but in general, `npm` tries to be smart and
installs the package(s) in the directory from which you are running the
command.
*/
const request = require('request');
const fs = require('fs');

/*
This function just wraps and invokes the api call. In this case I didn't
mess around with storing the data returned from the API call in a local
variable - but I still included the writeFile to show that the data can
be persisted after the function runs. There are plenty of callbacks.
*/
function hitTheApi() {
  request('https://swapi.co/api/people/2/', { json: true }, (err, res, body) => {
    if (err) { return console.log('Error: ', err); }
    fs.writeFile('my_data.txt', JSON.stringify(body), (err) => {
      if (err) { throw err; }
      console.log('Status: ', res.statusCode)
      console.log('Write operation succesful.')
    })
  })
}

// Gotta invoke!
hitTheApi();
