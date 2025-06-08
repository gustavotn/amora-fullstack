import database from '../database'

interface Message {
  message: string
  error: boolean
}

export async function addLog(data: Message) {
  await database.collection('logs').add(data);
}