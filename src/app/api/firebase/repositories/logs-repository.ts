import database from '../database'

interface Message {
  message: string
}

export async function addLog(data: Message) {
  await database.collection('logs').add(data);
}