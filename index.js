import {
    listContacts,
    getContactById,
    removeContact,
    addContact
} from "./contacts.js"

import { Command } from "commander"

const program = new Command()

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone")

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts()
            console.table(contacts)
            break

        case "get":
            const contact = await getContactById(id)
            if (!contact) {
                console.log(`Contact with id ${id} not found`)
                break
            }
            console.table(contact)
            break

        case "add":
            const newContact = await addContact({ name, email, phone })
            console.table(newContact)
            break

        case "remove":
            const deletedContact = await removeContact(id)
            if (!deletedContact) {
                console.log(`Contact with id ${id} not found`)
                break
            }
            console.table(deletedContact)
            break

        default:
            console.warn("\x1B[31m Unknown action type!")
    }
}

invokeAction(argv)

// node index.js --action list
// this would list all the contacts in the console

// node index.js --action get --id XtJvryZWBKkm7ENs0kpXC
// this would  get a specific contact and print it in the console

// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
// this would add a new contact to the contacts.json

// node index.js --action remove --id qdggE76Jtbfd9eWJHrssH
// this would remove a contact from the contacts.json