import { NextRequest, NextResponse } from "next/server"
import { addPage, changeToPaid } from "../firebase/repositories/pages-repository"
import { nanoid } from "nanoid"
import { Timestamp } from "firebase-admin/firestore"

export interface PageRequest {
    email: string
    title: string
    message: string
    musicUrl?: string
    startedAt: string
    planId: '1' | '2'
}

export async function POST(req: NextRequest) {
    const body: PageRequest = await req.json()

    if (!body.email) {
        return NextResponse.json({ message: 'email is required' }, { status: 400 })
    }

    if (!body.title) {
        return NextResponse.json({ message: 'title is required' }, { status: 400 })
    }

    const id = body.title + nanoid(4)

    const pageId = await addPage({
        ...body,
        startedAt: Timestamp.fromDate(new Date(body.startedAt)),
        id,
        paid: false
    })

    return Response.json({ pageId }, { status: 201 })
}