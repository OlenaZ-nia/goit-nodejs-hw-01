const { randomUUID } = require('crypto');
const { readContent, writeContent } = require('./content');

async function addContact(name, email, phone) {
    try {
        const contacts = await readContent();
        const includeName = contacts.find(item => item.name === name);
        if (includeName !== undefined) {
            console.log(`${name} is already in contacts`);
            return;
        }
        const newContact = { id: randomUUID(), name, email, phone };
        contacts.push(newContact);
        await writeContent(contacts);
        return newContact;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = addContact;