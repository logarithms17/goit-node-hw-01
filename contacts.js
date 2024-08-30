import fs from "fs/promises"
import { nanoid } from "nanoid"
import path from "path"
import { fileURLToPath } from 'url';

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json")
console.log(contactsPath)

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        return contacts
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts()
        const result = contacts.find((contact) => contact.id === contactId)
        return result
    } catch (error) {
        console.log(error)
    }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts()
        const index = contacts.findIndex((contact) => contact.id === contactId)
        if (index === -1) {
            return null
        }
        const [result] = contacts.splice(index, 1)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return result
    } catch (error) {
        console.log(error)
    }
}

const addContact = async ({name, email, phone}) => {
    try {
        const contacts = await listContacts()
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        }
        contacts.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return newContact
    } catch (error) {
        console.log(error)
    }
}

export { listContacts, getContactById, removeContact, addContact }