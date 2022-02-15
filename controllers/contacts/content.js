const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '../../db/contacts.json');

const readContent = async () => {
    const content = await fs.readFile(contactsPath, 'utf-8');
    const result = JSON.parse(content);
    return result;
}

const writeContent = async (arr) => {
    const content = await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));
    return content;
}

module.exports = { readContent, writeContent };