import database from '../database'

interface Message {
  message: any
  error: any
}

export async function addLog(data: Message) {
  await database.collection('logs').add(data);
}