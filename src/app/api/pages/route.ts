import { NextRequest, NextResponse } from "next/server"
import { addPage } from "../firebase/repositories/pages-repository"
import { nanoid } from "nanoid"
import { Timestamp } from "firebase-admin/firestore"
import { bucket } from "../firebase/firebase"

export interface PageRequest {
    email: string
    title: string
    message: string
    musicUrl?: string
    coupleImage1: string
    coupleImage2: string
    coupleImage3: string
    coupleImage4: string
    coupleImage5: string
    startedAt: string
    planId: '1' | '2'
}

function parseDateBr(dateStr: string): Date {
  // Espera formato dd/mm/aaaa
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

async function uploadImage(folder: string, image: string): Promise<string> {
    if (!image) return ''
    // Se a base64 vier com prefixo (data:image/png;base64,...), remove:
    const matches = image.match(/^data:(.+);base64,(.+)$/);
    const base64 = matches ? matches[2] : image;
    const contentType = matches ? matches[1] : "image/png";

    const buffer = Buffer.from(base64, "base64");
    const fileName = `amora-uploads/${folder}/${Date.now()}.png`;
    const file = bucket.file(fileName);

    await file.save(buffer, {
      metadata: { contentType },
    });

    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
}

export async function POST(req: NextRequest) {
    const body: PageRequest = await req.json()

    if (!body.email) {
        return NextResponse.json({ message: 'email is required' }, { status: 400 })
    }

    if (!body.title) {
        return NextResponse.json({ message: 'title is required' }, { status: 400 })
    }

    if (body.planId === '1') {
        body.musicUrl = ''
    }

    const formattedTitle = body.title.replace(/\s+/g, '-');

    const id = formattedTitle + nanoid(4)

    const page = {
        email: body.email,
        title: body.title,
        message: body.message,
        musicUrl: body.musicUrl,
        planId: body.planId,
        coupleImage1Url: await uploadImage(id, body.coupleImage1),
        coupleImage2Url: body.planId === '2' ? await uploadImage(id, body.coupleImage2) : '',
        coupleImage3Url: body.planId === '2' ? await uploadImage(id, body.coupleImage3) : '',
        coupleImage4Url: body.planId === '2' ? await uploadImage(id, body.coupleImage4) : '',
        coupleImage5Url: body.planId === '2' ? await uploadImage(id, body.coupleImage5) : '',
        startedAt: Timestamp.fromDate(parseDateBr(body.startedAt)),
        id,
        paid: false
    }

    console.log(page)

    const pageId = await addPage(page)

    console.log('Page created with ID:', pageId)

    return Response.json({ pageId }, { status: 201 })
}