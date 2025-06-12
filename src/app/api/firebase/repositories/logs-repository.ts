import { database } from '../firebase'

interface Message {
  message: string
}

export async function addLog(data: Message) {
  await database.collection('logs').add(data);
}