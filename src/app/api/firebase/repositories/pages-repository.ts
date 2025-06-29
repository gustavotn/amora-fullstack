import { Timestamp } from 'firebase-admin/firestore'
import { database } from '../firebase'

interface Page {
    id: string
    email: string
    title: string
    message: string
    musicUrl?: string
    coupleImage1Url: string
    coupleImage2Url: string
    coupleImage3Url: string
    coupleImage4Url: string
    coupleImage5Url: string
    startedAt: Timestamp
    planId: '1' | '2'
    paid: boolean
}

export async function addPage(data: Page) {
    const ref = await database.collection('pages').add(data);
    const doc = await ref.get()
    return doc.data()?.id
}

export async function changeToPaid(pageId: string) {
    const doc = await getPage(pageId)
    await doc.ref.update({ paid: true });
}

export async function getPage(pageId: string) {
    console.log('pageId', pageId)
    var snapshot = await database.collection('pages').where('id', '==', pageId).get()

    if (snapshot.docs.length === 0) {
        throw new Error('Page not found')
    }

    return snapshot.docs[0]
}