import database from '../database'

interface Message {
  from?: string
  to?: string
  text?: string
}

export async function addMessage(data: Message) {
  await database.collection('messages').add(data);
}