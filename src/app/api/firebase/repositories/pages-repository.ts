import database from '../database'

export interface Page {
    //id: string
    email: string
}

export async function addPage(data: Page) {
  const docRef = await database.collection('pages').add(data);
}

export async function getPages() : Promise<Page[]> {
    const snapshot = await database.collection('pages').get()

    const pages: Page[] = [];

    snapshot.forEach(doc => {
        const page = doc.data() as Page
        pages.push(page)
    })

    return pages
}