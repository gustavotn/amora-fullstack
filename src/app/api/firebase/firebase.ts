import admin from 'firebase-admin'

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        storageBucket: 'amora-d6439.firebasestorage.app'
    })
}

const database = admin.firestore()

const bucket = admin.storage().bucket()

export { database, bucket }
