const fs = require('fs');
const request = require('request');
const readline = require('readline');
const { exit } = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const obtainInfo = () => {
  rl.question('Please input a url: ', (urlInput) => {
    let url = urlInput;
    rl.question('Please input a file path: ', (pathInput) => {
      let path = pathInput;
      if (fs.existsSync(path)) {
        rl.question('The file entered already exsists, do you want to overwrite this file? (press y followed by enter, or press any key to exit):  ', (boolean) => {
          boolean.toLowerCase() === 'y' ? writeFile(url,path) : process.exit();
        });
      } else {
        console.log('The local file path you gave was invalid :/ please rerun the app and try again.');
        process.exit();
      }
    });
  });
};

const writeFile = (url, path) => {
  request(url, (error, response, body) => {
    if (error) {
      console.log("The url info you entered was invalid :( please rerun the app and try again.");
      process.exit();
    }
    if (response.statusCode === 200) {
      fs.writeFile(path, body, (error) => {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
        process.exit();
      });
    } else {
      console.log(`error: ${response.statusCode}`);
      process.exit();
    }
  });
};

obtainInfo();