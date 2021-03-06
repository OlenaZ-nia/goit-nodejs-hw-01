const { Command } = require('commander');
const {listContacts, getContactById, removeContact, addContact } = require('./controllers/contacts/index');


const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      if (contactById) {
        console.log('contactById: ', contactById);
        return;
      }
      console.log('Not Found');
      break;

    case 'add':
      const contact = await addContact(name, email, phone);
      contact ? console.log(`Added new contact ${name}:`, contact) : null;
      break;

    case 'remove':
      await removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

(async ()=> {await invokeAction(argv)})();