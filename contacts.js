const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const readContent = async () => {
    const content = await fs.readFile(contactsPath, 'utf-8');
    const result = JSON.parse(content);
    return result;
}

const writeContent = async (arr) => {
    const content = await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));
    return content;
}

async function listContacts() {
    try {
        return await readContent();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await readContent();
        const contact = contacts.find(item => item.id === contactId);
        return contact;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function removeContact(contactId) {
  try {
      const contacts = await readContent();
      const deletedContact = contacts.find(item => item.id === contactId);
      
      if (!deletedContact) {
          console.log('Contact Not Found');
          return;
      }
    //   else {
    //       const updatedContacts = contacts.filter(item => item.id !== contactId);
    //       await writeContent(updatedContacts);
    //       console.log('Contact deleted', deletedContact);
    //       return deletedContact;
    //   }
      const updatedContacts = contacts.filter(item => item.id !== contactId);
          await writeContent(updatedContacts);
          console.log('Contact deleted', deletedContact);
          return deletedContact;
      
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

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

module.exports = { listContacts, getContactById, removeContact, addContact }
