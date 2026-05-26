import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return new NextResponse("", { status: 400 });
    }

    try {
        const res = await fetch(url);

        const svg = await res.text();

        return new NextResponse(svg, {
            headers: {
                "Content-Type": "image/svg+xml",
            },
        });
    } catch {
        return new NextResponse("", { status: 500 });
    }
}