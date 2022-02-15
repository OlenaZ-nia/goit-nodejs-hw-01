const { readContent } = require('./content');

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

module.exports = getContactById;