const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser() {
  rl.question('Enter a command (add/update/delete/display/exit): ', (command) => {
    if (command.toLowerCase() === 'exit') {
      console.log('Exiting the application.');
      rl.close();
    } else if (command.toLowerCase() === 'add') {
      promptAddData();
    } else if (command.toLowerCase() === 'update') {
      promptUpdateData();
    } else if (command.toLowerCase() === 'delete') {
      promptDeleteData();
    } else if (command.toLowerCase() === 'display') {
      displayData();
      promptUser();
    } else {
      console.log('Invalid command.');
      promptUser();
    }
  });
}


function promptAddData() {
  rl.question('Enter data to add: ', (data) => {
    addData(data);
    promptUser();
  });
}



function addData(data) {
  const existingData = readData();
  const newData = [...existingData, data];
  writeData(newData);
  console.log('Data added.');
}


function promptUpdateData() {
  rl.question('Enter the index of the data to update: ', (index) => {
    rl.question('Enter the new data: ', (data) => {
      updateData(index, data);
      promptUser();
    });
  });
}


function updateData(index, data) {
  const existingData = readData();
  if (index >= 0 && index < existingData.length) {
    existingData[index] = data;
    writeData(existingData);
    console.log('Data updated.');
  } else {
    console.log('Invalid index.');
  }
}


function promptDeleteData() {
  rl.question('Enter the index of the data to delete: ', (index) => {
    deleteData(index);
    promptUser();
  });
}


function deleteData(index) {
  const existingData = readData();
  if (index >= 0 && index < existingData.length) {
    existingData.splice(index, 1);
    writeData(existingData);
    console.log('Data deleted.');
  } else {
    console.log('Invalid index.');
  }
}


function displayData() {
  const existingData = readData();
  console.log('All data:');
  existingData.forEach((data, index) => {
    console.log(`[${index}]: ${data}`);
  });
}


function readData() {
  try {
    const fileContent = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}


function writeData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync('data.json', jsonData, 'utf8');
}

promptUser();