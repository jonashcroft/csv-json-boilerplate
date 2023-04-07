### CSV ➡️ JSON ➡️ CSV

This is a Node.js script that will allow you to parse a CSV File with Javascript, modify its contents, and output a new CSV file.

This script will create a readable stream to your CSV file, parse the data into a JSON object and allow you to use modern Javascript functions on it before it outputting everything into a new CSV file.

This script was born out of the need to modify chunks of data within a very large CSV file, and whilst I know nothing about CSVs, I do know Javascript! So I wanted to share this boilerplate for anybody else in my position.

> Note: Both csv-parser and csv-writer requite Node v8.16.0 or above. I have been using this on both Node 13.x and 14.x


## Install

Using npm:

```
npm install
```
Using yarn:

```
yarn install
```

## Usage:

1. Add the CSV file that you'd like to modify in the `input` folder.
2. Modify the `config` object with the name of your input file.
3. Add your own ES6 functions within `initFunctions()`
4. Navigate to the repo directory in your terminal and run `node index.js`

## Documentation

This script wouldn't be possible without these two excellent modules, both of which have pretty extensive documentation should you want to extend this script:

https://github.com/mafintosh/csv-parser
https://github.com/ryu1kn/csv-writer
