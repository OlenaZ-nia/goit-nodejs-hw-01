const { readContent, writeContent } = require('./content');

async function removeContact(contactId) {
  try {
      const contacts = await readContent();
      const deletedContact = contacts.find(item => item.id === contactId);
      
      if (!deletedContact) {
          console.log('Contact Not Found');
          return;
      }
      const updatedContacts = contacts.filter(item => item.id !== contactId);
          await writeContent(updatedContacts);
          console.log('Contact deleted', deletedContact);
          return deletedContact;
      
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = removeContact;