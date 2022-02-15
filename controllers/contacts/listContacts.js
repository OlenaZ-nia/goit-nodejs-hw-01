const { readContent } = require('./content');

async function listContacts() {
    try {
        return await readContent();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = listContacts;