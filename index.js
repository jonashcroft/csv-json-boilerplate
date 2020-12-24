/**
 * Node Script: CSV to JSON and back.
 * ------------------------------------------------------------------------------
 * A boilerplate for parsing and modifying CSV data.
 *
 * - Parses a CSV file that you input
 * - Modifies the CSV to a JSON object
 * - You run ES6 functions to modify data
 * - Output modified object to a new CSV file
 *
 * Modify to suit your needs.
 */

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser');
const fs = require('fs');

const inputCsvJson = [];
let modifiedCsvJson = [];

/**
 * Global config.
 */
const config = {
  inputFile: './input/input-file.csv',
  outputFile: './output/output-file-to-be-created.csv',
};

/**
 * CSV configuration - more found in csvWriter docs.
 *
 * id: Title of the column from the input CSV
 * title: title of column in output, where input data will be mapped to.
 *
 * Each header ID needs to match the CSV header title text and can be reordered.
 */
const csvWriter = createCsvWriter({
  path: config.outputFile,
  header: [
    {
      id: 'Year',
      title: 'Year'
    },
    {
      id: 'Artist',
      title: 'Artist'
    },
    {
      id: 'Album',
      title: 'Album Name'
    },
    {
      id: 'Label',
      title: 'Label'
    },
    {
      id: 'Certified Units',
      title: 'Certified Units'
    },
    {
      id: 'Certification',
      title: 'Certification'
    },
  ],
  alwaysQuote: true,
});

/**
 * Initialise script.
 */
function init() {
  console.log('Initiating...');
  console.log(`Preparing to parse CSV file... ${config.inputFile}`);

  fs.createReadStream(config.inputFile)
    .pipe(csv())
    .on('data', (data) => inputCsvJson.push(data))
    .on('end', () => {
      modifiedCsvJson = inputCsvJson

      console.log('...Done');

      initFunctions();
    });
}

/**
 * Execute functions once data is available.
 */
function initFunctions() {
  console.log('Initiating script functionality...');

  modifyCertifiedUnits();
  filterAlbumYears();

  /**
   * Once everything is finished, write to file.
   */
  writeDataToFile();
}

/**
 * Function that will remove items that don't match our desired years.
 */
function filterAlbumYears() {
  console.log('Removing items released in 2015');

  modifiedCsvJson = modifiedCsvJson.filter((item) => {
    return item['Year'] === '2015' ? null : item
  });

  console.log('...Done');
}

/**
 * Removes the parenthesis from the 'Certified Units' field.
 */
function modifyCertifiedUnits() {
  console.log('Removing parenthesis from Units Sold...')

  modifiedCsvJson = modifiedCsvJson.map((item) => {
    const returnedItem = item
    const itemKey = 'Certified Units'

    returnedItem[itemKey] = item[itemKey].replace(/[{()}]/g, '');

    return returnedItem
  })

  console.log('...Done');
}


/**
 * Write all modified data to its own CSV file.
 */
function writeDataToFile() {
  console.log(`Writing data to a file...`);

  csvWriter.writeRecords(modifiedCsvJson)
    .then(() => {
      console.log('The CSV file was written successfully!')

      console.log('...Finished!');
    });
}

init();
