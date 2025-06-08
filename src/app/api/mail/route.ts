import { NextRequest } from "next/server"
import { sendMail } from "./sendMail"

export async function GET(req: NextRequest) {
    const to = req.nextUrl.searchParams.get('mail')

    if (to) {
        sendMail({ to })
    } else {
        return Response.json({ message: 'mail is required' }, { status: 401 })
    }

    return Response.json({ })
}