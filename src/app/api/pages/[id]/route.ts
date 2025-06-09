import { NextRequest, NextResponse } from "next/server";
import { getPage } from "../../firebase/repositories/pages-repository";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const page = (await getPage(id)).data()

        console.log(page["paid"])

        if (!page["paid"]) {
            return NextResponse.json({ message: 'Payment not found' }, { status: 401 })
        }

        return NextResponse.json({ 
            ...page ,
            startedAt: page["startedAt"].toDate()
        })
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}