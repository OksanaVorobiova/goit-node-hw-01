const contactsActions = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsActions.listContacts();
      console.table(contacts);
      return contacts;

    case "get":
      const contact = await contactsActions.getContactById(id);
      console.log(contact);
      return contact;

    case "add":
      const newContact = await contactsActions.addContact(name, email, phone);
      console.log(newContact);
      return newContact;

    case "remove":
      const contactToRemove = await contactsActions.removeContact(id);
      console.log(contactToRemove);
      return contactToRemove;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
