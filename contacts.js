const fs = require("fs").promises
const path = require("path")

const contactsPath = path.join(__dirname, "/db/contacts.json")

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8")
  const result = JSON.parse(data)
  return result
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const result = contacts.find((item) => item.id === contactId)
  return result
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const result = contacts.filter((item) => item.id !== contactId)

  await fs.writeFile(contactsPath, JSON.stringify(result))
  return result
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newId = contacts[contacts.length - 1].id + 1

  const newContacts = [...contacts, { id: newId, name, email, phone }]
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))

  return newContacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
