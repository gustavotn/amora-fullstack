import { NextRequest, NextResponse } from "next/server";
import { getPage } from "../../firebase/repositories/pages-repository";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const page = (await getPage(id)).data();

        if (!page["paid"]) {
            return NextResponse.json({ message: 'Payment not found' }, { status: 401 });
        }

        return NextResponse.json({ 
            ...page,
            coupleImage1Url: page["coupleImage1Url"],
            coupleImage2Url: page["coupleImage2Url"],
            coupleImage3Url: page["coupleImage3Url"],
            coupleImage4Url: page["coupleImage4Url"],
            coupleImage5Url: page["coupleImage5Url"],
            startedAt: page["startedAt"]?.toDate
                ? page["startedAt"].toDate().toISOString()
                : null
        });
    }
    catch (error) {
        console.log("Error fetching page:", error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}